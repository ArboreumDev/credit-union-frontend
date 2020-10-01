import { GraphQLClient } from "graphql-request"
import { fetchJSON } from "lib/api"
import { getSdk, Sdk } from "../../src/gql/sdk"
import {
  DEFAULT_RECOMMENDATION_RISK_PARAMS,
  LogEventTypes as LogEventType,
  MIN_SUPPORT_RATIO,
  SWARMAI_URL,
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
} from "../lib/types"
import { initializeGQL } from "./graphql_client"
import SwarmAI from "./swarmai_client"

// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export default class DbClient {
  private static instance: DbClient

  public sdk: Sdk
  public client: GraphQLClient

  constructor(_client?: GraphQLClient) {
    if (DbClient.instance) {
      return DbClient.instance
    }
    this.client = _client || initializeGQL()
    this.sdk = getSdk(this.client)
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
    const { request } = await this.sdk.CreateLoanRequest({
      request: {
        borrower_id,
        amount,
        purpose,
        risk_calc_result: {},
      },
    })
    // potentially do other stuff here (notify us...)
    return { request }
  }
  addSupporter = async (requestId: string, email: string, amount: number) => {
    const user = await this.getUserByEmail(email)
    const data = await this.sdk.AddSupporter({
      supporter: {
        request_id: requestId,
        supporter_id: user.id,
        pledge_amount: amount,
      },
    })
    return data
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
      const aiResponse = await this.calculateLoanRequestOffer(requestId)
      const payload = {
        requestId,
        newOffer: { latestOffer: aiResponse },
      }

      return this.sdk.UpdateLoanRequestWithOffer(payload)
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
    const riskInfo = await this.getRiskInput(requestId)
    return await SwarmAI.calculateLoanOffer({
      requestId: loanRequest.request_id,
      loanAmount: loanRequest.amount,
      supporters: riskInfo.supporterInfo,
      borrowerInfo: riskInfo.borrowerInfo,
    })
  }

  /**
   * After seeing an offer, the borrower can accept it (or change it by adding guarantors, or adjusting the amount)
   * Calling this function takes offer from loan_request.risk_calc_result and translates it to payables, receivables, encumbrances,...
   * Also, advances loan_request status to 'live'
   * It creates a batch of transactions to be fulfilled TODO
   * It updates the balances of the lenders
   * @param offer_key which of the possible different offers on the request should be executed
   */
  acceptLoanOffer = async (request_id: string, offer_key = "latestOffer") => {
    // query swarmai to get convert loan-terms to aset-updates for everyone involved
    const data = await this.sdk.GetLoanOffer({ request_id })
    const offer_params = data.loan_requests_by_pk
    const systemState = (await this.getSystemSummary()) as Scenario
    const latestOffer = offer_params.risk_calc_result.latestOffer

    const result = await SwarmAI.acceptLoan(systemState, latestOffer)

    await this.updatePortfolios(result.updates)

    // -> create payables receivables based on loan offer parameters
    const variables = createStartLoanInputVariables(
      request_id,
      offer_params.risk_calc_result.latestOffer.loan_schedule.borrower_view
        .total_payments.remain
    )
    return this.sdk.StartLoan(variables)
  }

  updatePortfolios = async (updates: Array<PortfolioUpdate>) => {
    const updateMutation = generateUpdateAsSingleTransaction(updates)
    const data = await this.client.request(updateMutation)
    return data
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

  /**
   * summaries the portfolios of all users
   * and TODO loan rquests
   * and TODO all loans in the system
   */
  getSystemSummary = async () => {
    const data = await this.sdk.GetAllUsers()
    const users = data.user.map((u) => {
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
      } as UserInfo
    })
    const userDict = {}
    users.forEach((user) => {
      userDict[user.id] = user
    })

    return {
      users: userDict,
      loans: [],
      loan_requests: [],
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
      demographic_info: {
        credit_score: loanRequest.user.demographic_info.creditScore,
        education_years: loanRequest.user.demographic_info.yearsOfEducation,
        income: loanRequest.user.demographic_info.income,
      } as DemographicInfo,
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
