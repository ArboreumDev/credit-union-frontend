import { GraphQLClient } from "graphql-request"
import { getSdk, Sdk } from "../../src/gql/sdk"
import {
  DEFAULT_LOAN_TENOR,
  DEFAULT_RECOMMENDATION_RISK_PARAMS,
  DEFAULT_RISK_FREE_INTEREST_RATE,
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
  LogEvent,
  OptimizerContext,
  PortfolioUpdate,
  RiskInput,
  SupporterInfo,
  SupporterStatus,
  SwarmAiRequestMessage,
} from "../lib/types"
import { initializeGQL } from "./graphql_client"

// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export class DbClient {
  /**
   *
   * @param client graphql client to run self-constructed graphql-requests in string format
   */
  public sdk: Sdk
  public client: GraphQLClient

  constructor(_client?: GraphQLClient) {
    this.client = _client || initializeGQL()
    this.sdk = getSdk(this.client)
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
    const data = await this.sdk.CreateLoanRequest({
      request: {
        borrower_id,
        amount,
        purpose,
        risk_calc_result: {},
      },
    })
    return {
      request: data.insert_loan_requests_one,
    }
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

  /**
   * for a given request, create an offer by calling the swarmai-optimizer
   * @param request_id
   */
  calculateLoanRequestOffer = async (requestId: string) => {
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })

    // TODO put msg to bucket that will trigger ai to calculate the loan risk and what the potential lenders would contribute
    // const ai_input = await this.fetchDataForLoanRequestCalculation(req.borrower_id,  req.amount)
    // Once done, the AI will then call back into into our api and write to the DB

    // for simplicity will this is now be mocked up like this:
    const mockedAiResult = {
      amount: loanRequest.amount,
      tenor: DEFAULT_LOAN_TENOR,
      interest: 0.1,
      corpusShare: 0.8,
      kumaraA: 20,
      kumaraB: 10,
      idealloanSchedule: {
        // if accepted this would be the schedule:
        // matrix + 2 vectors created by running swarmai.loan.getLoanSchedule()
        // used to create payment plan
      },
    }
    const aiResult = await this.storeNewOfferOnLoanRequest(requestId, {
      latestOffer: mockedAiResult,
    })
    return { updatedRequest: aiResult }
  }

  /**
   * When the ai is done, this function should be called to save stuff into the DB
   * Currently, stores best offer-params in loan_requests.risk_calc_result
   * and updates status of loan_request to 'awaiting_borrower_confirmation`
   * @param {} graphqlClient
   * @param {} newOffer should be an object {interest_rate: int, lenders: [{lender_id, lender_amount, interest_rate}]} <the latter is lender_insert_input
   */
  storeNewOfferOnLoanRequest = async (requestId: string, newOffer: any) => {
    const res = await this.sdk.UpdateLoanRequestWithOffer({
      requestId,
      newOffer,
    })
    return res.update_loan_requests_by_pk
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
    // get offer and unpack it
    const data = await this.sdk.GetLoanOffer({ request_id })
    const offer_params = data.loan_requests_by_pk
    const { amount, interest } = offer_params.risk_calc_result.latestOffer
    const { lenders, corpusCash } = await this.sdk.GetLenderAllocationInput()
    const totalCorpusCash = corpusCash.aggregate.sum.balance

    // verify the corpus still has capacity to fulfill the loan offer
    if (totalCorpusCash >= amount) {
      // compute loan-allocation based on lender cash-balances
      const portfolioUpdates: Array<PortfolioUpdate> = []
      lenders.forEach((lender) => {
        const shareInLoan = lenderBalanceToShareInLoan(
          lender.balance,
          totalCorpusCash,
          amount
        )
        portfolioUpdates.push({
          userId: lender.id,
          balanceDelta: -shareInLoan,
          shareDelta: shareInLoan,
          alias: "user" + lender.user_number.toString(),
        } as PortfolioUpdate)
      })
      // TODO transform PortfolioUpdates into transactions and store them on loan-request entry under the offer-key

      // find out whether transactions have gone through, then execute portfolioUpdates
      await this.updatePortfolios(portfolioUpdates)

      // -> create payables receivables based on loan offer parameters
      const variables = createStartLoanInputVariables(
        request_id,
        amount,
        interest
      )
      const startedLoan = await this.sdk.StartLoan(variables)
      return {
        startedLoan,
      }
    } else {
      console.error("ERROR: Offer is outdated: Not enough balance in corpus")
    }
  }

  updatePortfolios = async (updates: Array<PortfolioUpdate>) => {
    const dryRunFailures = await this.dryRunPortfolioUpdates(updates)
    if (dryRunFailures.length == 0) {
      const updateMutation = generateUpdateAsSingleTransaction(updates)
      const data = await this.client.request(updateMutation)
      return data
    } else {
      return {
        ERROR: {
          description: "One update could not be run",
          data: dryRunFailures,
        },
      }
    }
  }

  /**
   * Checks whether the net result of set of updates can be applied in one transaction
   * - that no balance will be negative
   * - that all given userIds are in the database (TODO)
   * @param updates
   */
  dryRunPortfolioUpdates = async (updates: Array<PortfolioUpdate>) => {
    const failures = []
    const { user } = await this.sdk.GetAllUsers()
    user.forEach((user) => {
      const userUpdates = updates.filter((u) => u.userId == user.id)
      if (userUpdates.length) {
        const totalCashUpdate =
          userUpdates.map((u) => u.balanceDelta).reduce((a, b) => a + b) || 0
        if (user.balance + totalCashUpdate < 0) {
          failures.push({ userId: user.id, updates: userUpdates })
        }
      }
    })
    return failures
  }

  /**
   * get all the data that is needed to run the optimizer and format it into the message
   * it expects
   * @param requestId
   */
  getOptimizerInput = async (requestId: string) => {
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })

    // ============ optimizer context =============================
    const { loans, corpus, corpusInvestment } = await this.sdk.GetCorpusData({
      statusList: [LoanRequestStatus.live],
    })
    const totalCorpusShares = corpus.aggregate.sum.corpus_share
    const totalCorpusCash = corpus.aggregate.sum.balance || 0
    const totalCorpusInvestmentValue =
      corpusInvestment.aggregate.sum.amount_total || 0

    // Now get the total monetary-value of guarantee that the supporters have in the form of portfolioshares
    //      "if you have two supporters one with a 40/60 split
    //        and another with 20/80 then you just take 60%*pledgeAmountA+20%pledgeAmountB"
    const confirmedSupporters = loanRequest.supporters.filter(
      (x) => x.status == SupporterStatus.confirmed
    )
    const supporterShareValues = []
    confirmedSupporters.forEach((s) => {
      const shareValue = proportion(
        s.user.corpus_share,
        totalCorpusShares,
        totalCorpusInvestmentValue
      )
      const totalValue = shareValue + s.user.balance
      const shareRatio = shareValue / totalValue
      supporterShareValues.push(shareRatio * s.pledge_amount)
    })
    // sum up all shares
    const supporterCorpusShare = supporterShareValues.length
      ? supporterShareValues.reduce((a, b) => a + b)
      : 0

    // use all existing loans in the portfolio to create a list of LiveLoanInfo-objects,
    const liveLoanInfo = loans.map((x) => {
      const terms = x.risk_calc_result.latestOffer
      return {
        loan_id: x.request_id,
        amount_owned_portfolio: proportion(terms.corpusShare, 1, terms.amount),
        amount_owned_supporters: proportion(
          1 - terms.corpusShare,
          1,
          terms.amount
        ),
        interest: terms.interest,
        tenor: terms.tenor,
        kumr_params: [terms.kumaraA, terms.kumaraB],
        time_remaining: 5, // TODO
        loan_schedule: "TODO",
      } as LiveLoanInfo
    })
    const riskInfo = await this.getRiskInput(requestId)
    // create a big SwarmAiRequestMessage-Object
    return {
      loan_request_info: {
        request_id: requestId,
        tenor: DEFAULT_LOAN_TENOR,
        amount: loanRequest.amount,
        borrower_info: riskInfo.borrowerInfo,
        supporters: riskInfo.supporterInfo,
      },
      optimizer_context: {
        risk_free_interest_rate: DEFAULT_RISK_FREE_INTEREST_RATE,
        supporter_corpus_share: supporterCorpusShare || 0,
        loans_in_corpus: liveLoanInfo,
        corpus_cash: totalCorpusCash,
        novation: false,
      } as OptimizerContext,
      risk_assessment_context: {
        central_risk_info: DEFAULT_RECOMMENDATION_RISK_PARAMS,
      } as RiskInput,
    } as SwarmAiRequestMessage
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
      credit_score: loanRequest.user.demographic_info.credit_score,
      education_years: loanRequest.user.demographic_info.education_years,
      income: loanRequest.user.demographic_info.income,
    } as BorrowerInfo
    return {
      supporterInfo,
      borrowerInfo,
    }
  }

  logEvent = async (event?: LogEvent, headers?: any, userId?: string) => {
    const res = await this.sdk.InsertEvent({
      event: {
        headers: headers,
        event: event,
        user_id: userId,
      },
    })
    return res.insert_events_one
  }
}
