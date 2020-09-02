import { initializeGQL } from "./graphql_client"
import {
  PortfolioUpdate,
  LoanRequestStatus,
  UserType,
  User,
} from "../../src/utils/types"
import {
  lenderBalanceToShareInLoan,
  createStartLoanInputVariables,
  proportion,
  generateUpdateAsSingleTransaction,
  transformRequestToDashboardFormat,
} from "../../src/utils/loan_helpers"
import { DEFAULT_LOAN_TENOR } from "../../src/utils/constant.js"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { GraphQLClient } from "graphql-request"

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
      console.log("ERROR: Offer is outdated: Not enough balance in corpus")
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

  getOptimizerInput = async (requestId: string) => {
    const { loans, corpus, corpusInvestment } = await this.sdk.GetCorpusData({
      statusList: [LoanRequestStatus.live],
    })
    const totalCorpusShares = corpus.aggregate.sum.corpus_share
    const totalCorpusCash = corpus.aggregate.sum.balance || 0
    const totalCorpusInvestmentValue =
      corpusInvestment.aggregate.sum.amount_total || 0
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })

    // get the total value of guarantee that the supporters have in the form of portfolioshares
    // "if you have two supporters one with a 40/60 split
    // and antoerh with 20/80
    // then you just take 60%*pledgeAmountA+20%pledgeAmountB"
    const supporterShareValues = []
    loanRequest.supporters.forEach((s) => {
      // console.log('22', s.user.corpus_share, totalCorpusShares, totalCorpusInvestmentValue)
      const shareValue = proportion(
        s.user.corpus_share,
        totalCorpusShares,
        totalCorpusInvestmentValue
      )
      const totalValue = shareValue + s.user.balance
      const shareRatio = shareValue / totalValue
      supporterShareValues.push(shareRatio * s.pledge_amount)
      // console.log('value', shareValue)
      // console.log('user', s.supporter_id,)
      // console.log('pledges total:', s.pledge_amount, 'has cash', s.user.balance, 'has shares:', s.user.corpus_share , '/', totalCorpusShares)
      // console.log('total corpus value', totalCorpusInvestmentValue)
      // console.log('portfolio split:', shareRatio )
      // console.log('intermediateValues:', shareRatio, shareValue, totalValue, s.pledge_amount)
    })
    const supporterCorpusShare = supporterShareValues.reduce((a, b) => a + b)

    return {
      corpus: loans.map((x) => {
        const terms = x.risk_calc_result.latestOffer
        return {
          id: x.request_id,
          amountInPortfolio: proportion(terms.corpusShare, 1, terms.amount),
          amountOwnedBySupporters: proportion(
            1 - terms.corpusShare,
            1,
            terms.amount
          ),
          apr: terms.interest,
          tenor: terms.tenor,
          kumaraA: terms.kumaraA,
          kumaraB: terms.kumaraB,
          timeRemaining: 5, // TODO
        }
      }),
      corpusCash: totalCorpusCash,
      loanRequest: {
        loan_request_id: loanRequest.request_id,
        amount: loanRequest.risk_calc_result.latestOffer.amount,
        tenor: loanRequest.risk_calc_result.latestOffer.tenor,
        kumaraA: loanRequest.risk_calc_result.latestOffer.kumaraA,
        kumaraB: loanRequest.risk_calc_result.latestOffer.kumaraB,
      },
      supporterCorpusShare,
      novation: false,
    }
  }
}
