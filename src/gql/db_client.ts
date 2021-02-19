import { GraphQLClient } from "graphql-request"
import { getSdk, Sdk } from "../../src/gql/sdk"

import {
  DEFAULT_RECOMMENDATION_RISK_PARAMS,
  LogEventTypes as LogEventType,
  MIN_SUPPORT_RATIO,
} from "../lib/constant"
import {
  createStartLoanInputVariables,
  generateUpdateAsSingleTransaction,
} from "../lib/loan_helpers"
import {
  BorrowerInfo,
  DemographicInfo,
  PortfolioUpdate,
  Scenario,
  SupporterInfo,
  SupporterStatus,
  UserInfo,
  LoanRequestInfo,
  LoanInfo,
  LoanOffer,
  LoanRequestStatus,
  SystemUpdate,
  UserType,
  LoanState,
} from "../lib/types"
import DecentroClient from "./wallet/decentro_client"
import { initializeGQL } from "./graphql_client"
import SwarmAIClient from "./swarmai_client"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export default class DbClient {
  private static instance: DbClient

  public sdk: Sdk
  public gqlClient: GraphQLClient
  public swarmAIClient: SwarmAIClient
  public decentroClient: DecentroClient

  constructor(_client?: GraphQLClient, _swarmai_client?: SwarmAIClient) {
    if (DbClient.instance) {
      return DbClient.instance
    }
    this.gqlClient = _client || initializeGQL()
    this.swarmAIClient =
      _swarmai_client ||
      new SwarmAIClient(process.env.SWARMAI_URL || "http://localhost:3001")
    this.sdk = getSdk(this.gqlClient)
    DbClient.instance = this
  }

  getUserByEmail = async (email: string) => {
    const data = await this.sdk.GetUserByEmail({ email })
    const user = data.user[0]
    return user
  }

  /**
   * called with borrower Id to create loan-request also create entries for guarantor requests
   * (mark those confirmed for now, later this would then require an extra step)
   * NOTE: this assumes that the borrower has no other active request
   * @param borrower_id go
   * @param amount
   * @param purpose
   * @param msg
   */
  createLoanRequest = async (
    borrower_id: string,
    amount: number,
    purpose: string
  ) => {
    const { loanRequest } = await this.sdk.CreateLoanRequest({
      request: {
        borrower_id,
        amount,
        purpose,
        loan: {},
      },
    })
    // potentially do other stuff here (notify us...)
    return { loanRequest }
  }
  addSupporter = async (
    requestId: string,
    email: string,
    amount: number,
    name: string,
    info?: any
  ) => {
    const user = await this.getUserByEmail(email)
    let userId

    if (!user) {
      const u = await this.sdk.CreateUser({
        user: {
          email,
          user_type: UserType.Lender,
          onboarded: false,
          name,
        },
      })
      userId = u.insert_user_one.id
    } else userId = user.id

    const data = await this.sdk.AddSupporter({
      supporter: {
        request_id: requestId,
        supporter_id: userId,
        pledge_amount: amount,
        info: info,
      },
    })
    return data
  }

  calculateAndUpdateLoanOffer = async (requestId: string) => {
    // this was not returning the loan and somehow the error was returned from swarmAI was not being
    // logged
    const { loans, accounts } = await this.calculateLoanRequestOffer(requestId)
    const payload = {
      requestId,
      newData: {
        latestOffer: loans.loan_offers[requestId],
        requestData: loans.loan_requests[requestId],
      },
    }
    // console.log('loanoffer udpated', requestId)
    return this.sdk.UpdateLoanRequestWithOffer(payload)
  }

  updateSupporter = async (
    requestId: string,
    supporter_id: string,
    status: SupporterStatus,
    pledge_amount: number
  ) => {
    const { supporter } = await this.sdk.UpdateSupporter({
      request_id: requestId,
      supporter_id,
      status,
      pledge_amount,
    })
    // verify if min support is reached
    const totalSupport = supporter.supported_request.supporters
      .filter((x) => x.status == SupporterStatus.confirmed)
      .map((x) => x.pledge_amount)
      .reduce((a, b) => a + b, 0)
    if (
      totalSupport >=
      supporter.supported_request.amount * MIN_SUPPORT_RATIO
    ) {
      return this.calculateAndUpdateLoanOffer(requestId)
    }

    return supporter
  }

  /**
   * for a given request, create an offer by calling the swarmai-optimizer, and store the result
   * on the loan-request-table under the key 'latestOffer'
   * and updates status of loan_request to 'awaiting_borrower_confirmation`
   * @param request_id
   */
  calculateLoanRequestOffer = async (requestId: string) => {
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })
    // TODO refactor this be named more appropriately
    const riskInfo = await this.getRiskInput(requestId)
    return await this.swarmAIClient.calculateLoanOffer({
      requestId: loanRequest.request_id,
      loanAmount: loanRequest.amount,
      supporters: riskInfo.supporterInfo,
      borrowerInfo: riskInfo.borrowerInfo,
    })
  }

  /**
   * After seeing an offer, the borrower can accept it
   *  - advances loan_request status to 'live'
   *  - It updates the balances & shares of the lenders, supporters & the borrower
   *  - saves the loan & its state
   *  - It creates a batch of transactions to be fulfilled TODO
   * @param offer_key which of the possible different offers on the request should be executed
   */
  acceptLoanOffer = async (request_id: string, offer_key = "latestOffer") => {
    const { loanRequest } = await this.sdk.GetLoanOffer({ request_id })
    const systemState = (await this.getSystemSummary()) as Scenario
    const latestOffer = loanRequest.risk_calc_result.latestOffer as LoanOffer

    const updated = (await this.swarmAIClient.acceptLoan(
      systemState,
      latestOffer
    )) as SystemUpdate
    const realizedLoan: LoanInfo = updated.loans.loans[request_id]

    // change balances & TODO corpus_shares
    await this.updatePortfolios(updated.accounts.updates)

    // store newly returned LoanInfo on loan-request.loan
    await this.sdk.UpdateLoanRequestWithLoanData({
      requestId: request_id,
      loanData: realizedLoan,
      status: LoanRequestStatus.active,
    })

    // register lenders with their spent amount in loan_participants
    const variables = createStartLoanInputVariables(
      request_id,
      realizedLoan,
      updated.accounts.updates
    )
    return this.sdk.StartLoan(variables)
  }

  make_repayment = async (loan_id: string, amount: number) => {
    const systemState = (await this.getSystemSummary()) as Scenario
    const { loans, accounts } = (await this.swarmAIClient.make_repayment(
      systemState,
      loan_id,
      amount
    )) as SystemUpdate
    await this.updatePortfolios(accounts.updates)
    // update loan-accounts
    await this.sdk.UpdateLoanBalance({
      requestId: loan_id,
      delta: accounts.escrow_deltas[loan_id],
    })
    const loan: LoanInfo = loans.loans[loan_id]
    let newStatus = LoanRequestStatus.active
    const noOutstandingDebt =
      loan.schedule.borrower_view.total_payments.remain <= 1 &&
      loan.schedule.borrower_view.corpus_principal.remain <= 1 &&
      loan.schedule.borrower_view.supporter_principal.remain <= 1 &&
      loan.schedule.borrower_view.supporter_interest.remain <= 1 &&
      loan.schedule.borrower_view.corpus_interest.remain <= 1
    if (noOutstandingDebt) {
      newStatus = LoanRequestStatus.settled
    } else if (loan.state.repayments.length >= loan.terms.tenor) {
      newStatus = LoanRequestStatus.defaulted
    }
    const { loanRequest } = await this.sdk.UpdateLoanRequestWithLoanData({
      requestId: loan_id,
      loanData: loan,
      status: newStatus,
    })

    // TODO show transactions in transaction table
    return loanRequest
  }

  updatePortfolios = async (updates: Array<PortfolioUpdate>) => {
    await this.updateAllRoIs(updates)
    const updateMutation = generateUpdateAsSingleTransaction(updates)
    const data = await this.gqlClient.request(updateMutation)
    return data
  }

  updateAllRoIs = async (updates: Array<PortfolioUpdate>) => {
    await Promise.all(
      updates.map(async (update) => {
        await this.sdk.UpdateUserRoi({
          userId: update.userId,
          newRoi: update.newRoI,
        })
      })
    )
  }

  /**
   * Checks whether the net result of set of updates can be applied in one transaction
   * - that no balance will be negative
   * - that all given userIds are in the database (TODO)
   * @param updates
   */
  // dryRunPortfolioUpdates = async (updates: Array<PortfolioUpdate>) => {
  //   const failures = []
  //   const { user } = await this.sdk.GetAllUsers()
  //   user.forEach((user) => {
  //     const userUpdates = updates.filter((u) => u.userId == user.id)
  //     if (userUpdates.length) {
  //       const totalCashUpdate =
  //         userUpdates.map((u) => u.balanceDelta).reduce((a, b) => a + b) || 0
  //       if (user.balance + totalCashUpdate < 0) {
  //         failures.push({ userId: user.id, updates: userUpdates })
  //       }
  //     }
  //   })
  //   return failures
  // }

  get allUsers() {
    return (async () => {
      const { user: allUsers } = await this.sdk.GetAllUsers()
      return allUsers
    })()
  }

  /**
   * summaries the portfolios of all users
   * and TODO loan rquests
   * and TODO all loans in the system
   */
  getSystemSummary = async () => {
    const allUsers = await this.allUsers
    const users = allUsers.map((u) => {
      return {
        id: u.id,
        balance: u.balance,
        name: u.name,
        email: u.email,
        user_type: u.user_type,
        demographic_info: u.demographic_info,
        corpus_share: u.corpus_share,
        encumbered_cash: 0, // TODO
        encumbered_portfolio: 0, // TODO
        roi: u.roi,
      } as UserInfo
    })
    const userDict = {}
    users.forEach((user) => {
      userDict[user.id] = user
    })
    // get loan-requests
    const { loanRequests } = await this.sdk.GetLoanRequests()
    // get info on live loans from the object saved on the loan request
    const loan_requests = {}
    const loans = {}
    const loan_offers = {}
    loanRequests.forEach((lr) => {
      // exclude loan-requests where the borrower is still collecting supporters
      switch (lr.status) {
        case LoanRequestStatus.active:
          // should be registered in loans
          loans[lr.request_id] = lr.loan as LoanInfo
          break
        case LoanRequestStatus.awaiting_borrower_confirmation:
          // should be registered in loan_offers
          loan_offers[lr.request_id] = lr.risk_calc_result[
            "latestOffer"
          ] as LoanInfo
          // we could also still keep them as loan-requests, but that doesnt really make sense
          loan_requests[lr.request_id] = lr.risk_calc_result[
            "requestData"
          ] as LoanRequestInfo
          break
        case LoanRequestStatus.settled:
          loans[lr.request_id] = lr.loan as LoanInfo
          break
        case LoanRequestStatus.defaulted:
          loans[lr.request_id] = lr.loan as LoanInfo
          break
        case LoanRequestStatus.initiated:
          // borrower is yet collecting information
          break
        default:
          throw "unprocessed request status"
      }
    })

    return {
      users: userDict,
      loans,
      loan_requests,
      loan_offers,
    } as Scenario
  }

  /**
   * collects basic info on the loan request, the borrower and the supporters
   * supporters are combined into a list of SupporterInfoObjects
   * @param requestId
   */
  getRiskInput = async (requestId: string) => {
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })
    const confirmedSupporters = loanRequest.supporters.filter(
      (x) => x.status == SupporterStatus.confirmed
    )
    // NONBACKUP-MODEL code: TODO when create a user, set their recommendation risk to a default value
    // const { recommendation_risk } = await this.sdk.GetCorpusRecommendationRisks(
    //   {
    //     userIds: confirmedSupporters.map((x) => x.user.id),
    //   }
    // )
    // create SupporterInfo-objects
    const supporterInfo = confirmedSupporters.map((supporter) => {
      // const supporterRecRisk = recommendation_risk.filter(
      // (x) => x.recommender_id == supporter.user.id
      // )[0].risk_params || DEFAULT_RECOMMENDATION_RISK_PARAMS
      return {
        supporter_id: supporter.user.id,
        trust_amount: supporter.pledge_amount,
        recommendation_risk: DEFAULT_RECOMMENDATION_RISK_PARAMS,
      } as SupporterInfo
    })
    // create the borrowerInfo-object
    const borrowerInfo = {
      borrower_id: loanRequest.borrower_id,
      demographic_info: loanRequest.user.demographic_info as DemographicInfo,
    } as BorrowerInfo
    return {
      supporterInfo,
      borrowerInfo,
    }
  }

  logEvent = async (
    eventType: LogEventType,
    eventData?: any,
    headers?: any,
    userId?: string
  ) => {
    const event = {
      headers: headers,
      data: eventData,
      user_id: userId,
      event_type: eventType,
    }
    const res = await this.sdk.InsertEvent({ event })
    return res.insert_events_one
  }
}
