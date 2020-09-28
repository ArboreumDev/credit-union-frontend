import { GraphQLClient } from "graphql-request"
import { getSdk, Sdk } from "../../src/gql/sdk"
import {
  DEFAULT_LOAN_TENOR,
  DEV_URL,
  MIN_SUPPORT_RATIO,
  DEFAULT_RECOMMENDATION_RISK_PARAMS,
  DEFAULT_RISK_FREE_INTEREST_RATE,
  LogEventTypes as LogEventType,
} from "../lib/constant"
import {
  createStartLoanInputVariables,
  generateUpdateAsSingleTransaction,
  lenderBalanceToShareInLoan,
  proportion,
} from "../lib/loan_helpers"
import {
  BorrowerInfo,
  LiveLoanInfo,
  LoanRequestStatus,
  OptimizerContext,
  PortfolioUpdate,
  RiskInput,
  SupporterInfo,
  SupporterStatus,
  SwarmAiRequestMessage,
  SwarmAiResponse,
  UserInfo,
  LoanRequestInfo,
  DemographicInfo,
  Scenario,
} from "../lib/types"
import { initializeGQL } from "./graphql_client"
import { sampleAiInput } from "../../tests/fixtures/swarmai_fixtures"

// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export class DbClient {
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

  addSupporters = async (
    requestId: string,
    supporterIds: [string],
    amounts: [number]
  ) => {
    const supporters = []
    for (let i = 0; i < supporterIds.length; i++) {
      supporters.push({
        request_id: requestId,
        supporter_id: supporterIds[i],
        pledge_amount: amounts[i],
      })
    }
    const data = await this.sdk.AddSupporters({ supporters })
    return data
  }

  updateSupporter = async (
    request_id: string,
    supporter_id: string,
    status: SupporterStatus,
    pledge_amount: number
  ) => {
    const { supporter } = await this.sdk.UpdateSupporter({
      request_id,
      supporter_id,
      status,
      pledge_amount,
    })
    // verify if min support is reached
    const totalSupport = supporter.supported_request.supporters
      .filter((x) => x.status == SupporterStatus.confirmed)
      .map((x) => x.pledge_amount)
      .reduce((a, b) => a + b)
    if (
      totalSupport >=
      supporter.supported_request.amount * MIN_SUPPORT_RATIO
    ) {
      await this.calculateLoanRequestOffer(request_id)
    }

    return supporter
  }

  callSwarmAI = async (url: string, payload: any) => {
    // const data = { request_msg: sampleAiInput }
    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
    const res = await (await fetch(url, params)).json()
    return res
  }

  /**
   * for a given request, create an offer by calling the swarmai-optimizer, and store the result
   * on the loan-request-table under the key 'latestOffer'
   * and updates status of loan_request to 'awaiting_borrower_confirmation`
   * @param request_id
   */
  calculateLoanRequestOffer = async (requestId: string) => {
    const url = DEV_URL + "/loan/request"
    const payload = { request_msg: await this.getSwarmAiInput(requestId) }
    const aiResponse = (await this.callSwarmAI(url, payload)) as SwarmAiResponse

    return this.sdk.UpdateLoanRequestWithOffer({
      requestId,
      newOffer: { latestOffer: aiResponse },
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
    const payload = {
      system_state: systemState,
      aiResponse: offer_params.risk_calc_result.latestOffer,
    }
    const result = await this.callSwarmAI(DEV_URL + "/loan/accept", payload)

    await this.updatePortfolios(result.updates)

    // -> create payables receivables based on loan offer parameters
    const variables = createStartLoanInputVariables(
      request_id,
      offer_params.risk_calc_result.latestOffer.loan_schedule.borrower_view
        .total_payments.remain
    )
    return this.sdk.StartLoan(variables)
    // const startedLoan = await this.sdk.StartLoan(variables)
    // return {
    //   startedLoan,
    // }
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
   * get all the data that is needed to run the optimizer and format it into the message
   * it expects
   * @param requestId
   */
  getSwarmAiInput = async (requestId: string) => {
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })

    // ============ optimizer context =============================
    // not needed while we use backup model
    // const { loans, corpus, corpusInvestment } = await this.sdk.GetCorpusData({
    //   statusList: [LoanRequestStatus.live],
    // })
    // const totalCorpusShares = corpus.aggregate.sum.corpus_share
    // const totalCorpusCash = corpus.aggregate.sum.balance || 0
    // const totalCorpusInvestmentValue =
    //   corpusInvestment.aggregate.sum.amount_total || 0

    // // Now get the total monetary-value of guarantee that the supporters have in the form of portfolioshares
    // //      "if you have two supporters one with a 40/60 split
    // //        and another with 20/80 then you just take 60%*pledgeAmountA+20%pledgeAmountB"
    // const confirmedSupporters = loanRequest.supporters.filter(
    //   (x) => x.status == SupporterStatus.confirmed
    // )
    // const supporterShareValues = []
    // confirmedSupporters.forEach((s) => {
    //   const shareValue = proportion(
    //     s.user.corpus_share,
    //     totalCorpusShares,
    //     totalCorpusInvestmentValue
    //   )
    //   const totalValue = shareValue + s.user.balance
    //   const shareRatio = shareValue / totalValue
    //   supporterShareValues.push(shareRatio * s.pledge_amount)
    // })
    // // sum up all shares
    // const supporterCorpusShare = supporterShareValues.length
    //   ? supporterShareValues.reduce((a, b) => a + b)
    //   : 0

    // use all existing loans in the portfolio to create a list of LiveLoanInfo-objects,
    // const liveLoanInfo = loans.map((x) => {
    //   const terms = x.risk_calc_result.latestOffer
    //   return {
    //     loan_id: x.request_id,
    //     amount_owned_portfolio: proportion(terms.corpusShare, 1, terms.amount),
    //     amount_owned_supporters: proportion(
    //       1 - terms.corpusShare,
    //       1,
    //       terms.amount
    //     ),
    //     interest: terms.interest,
    //     tenor: terms.tenor,
    //     kumr_params: [terms.kumaraA, terms.kumaraB],
    //     time_remaining: 5, // TODO
    //     loan_schedule: "TODO",
    //   } as LiveLoanInfo
    // })

    // ============ risk context =============================
    const riskInfo = await this.getRiskInput(requestId)
    // create a big SwarmAiRequestMessage-Object
    return {
      loan_request_info: {
        borrower_info: riskInfo.borrowerInfo,
        request_id: requestId,
        tenor: DEFAULT_LOAN_TENOR,
        borrower_collateral: 0,
        amount: loanRequest.amount,
        supporters: riskInfo.supporterInfo,
      } as LoanRequestInfo,
      // optimizer_context: {
      // risk_free_apr: DEFAULT_RISK_FREE_INTEREST_RATE,
      // supporter_corpus_share: supporterCorpusShare || 0,
      // loans_in_corpus: liveLoanInfo,
      // corpus_cash: totalCorpusCash,
      // supporter_cash: totalCorpusCash,
      // novation: false,
      // } as OptimizerContext,
      // risk_assessment_context: {
      // central_risk_info: DEFAULT_RECOMMENDATION_RISK_PARAMS,
      // } as RiskInput,
    } as SwarmAiRequestMessage
  }

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
    const { recommendation_risk } = await this.sdk.GetCorpusRecommendationRisks(
      {
        userIds: confirmedSupporters.map((x) => x.user.id),
      }
    )
    // create SupporterInfo-objects
    // TODO account for supporter status
    const supporterInfo = confirmedSupporters.map((supporter) => {
      const supporterRecRisk = recommendation_risk.filter(
        (x) => x.recommender_id == supporter.user.id
      )[0].risk_params
      return {
        supporter_id: supporter.user.id,
        trust_amount: supporter.pledge_amount,
        recommendation_risk: supporterRecRisk,
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
