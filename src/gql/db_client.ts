import { initializeGQL } from "./graphql_client"
import {
  PortfolioUpdate,
  LoanRequestStatus,
  TransactionStatus,
} from "../../src/utils/types"
import {
  lenderBalanceToShareInLoan,
  createStartLoanInputVariables,
  proportion,
  generateUpdatesAsSingleTransaction,
} from "../../src/utils/loan_helpers"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { GraphQLClient } from "graphql-request"
// import { getNodesFromEdgeList } from "../../src/utils/network_helpers"

// const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";
const API_URL = "http://localhost:8080/v1/graphql"
const ADMIN_SECRET = "myadminsecretkey"
// const ADMIN_SECRET = "nhvmvvsrsiyfypsejugcnprtqxqgfbqe"

/**
 * A class to be used in the frontend to send queries to the DB. As a general rule
 * only "pre-cooked" functions should be used to do any needed input formatting,
 * processing or checking for consistency should be done inside
 * the pre-cooked functions. The executeGQL should only be used to test things during development
 */
export class DbClient {
  // to run queries from *.graphql-files with codegen
  _sdk: Sdk
  // to run self-constructed graphql-requests in string format
  _fetcher: GraphQLClient

  constructor(admin_secret: string, gql_url: string) {
    this._fetcher = initializeGQL(admin_secret, gql_url)
    this._sdk = getSdk(this._fetcher)
  }

  getProfileInfo = async (user_id: string) => {
    // check user_type, then return borrower or dashboardInfo plus loan-history
  }

  /**
   * return {status: null} if the borrower has neither a request, nor an accepted loan
   * {status: 'initiated',...} if the user has requested an offer, but the AI is still processing
   * {status: 'awaiting_borrower_confirmation',...} if there is an offer and the user needs to accept/reject
   * {status: 'live', ... } if there is an active loan request (that requires payback)
   * @param borrower_id
   */
  getBorrowerDashboardInfo = async (borrower_id) => {
    const data = await this._sdk.GetLoansByBorrowerAndStatus({
      borrower_id,
      statusList: [
        LoanRequestStatus.live,
        LoanRequestStatus.awaiting_borrower_confirmation,
        LoanRequestStatus.initiated,
      ],
    })
    const { transactions } = await this._sdk.GetTransactionHistory({
      userId: borrower_id,
    })

    if (data == undefined) return { status: null, transactions }

    const active_request = data.loan_requests[0]
    if (active_request.status === LoanRequestStatus.live) {
      return {
        transactions,
        loanId: active_request.request_id,
        status: active_request.status,
        loanAmount: active_request.amount,
        outstanding: {
          principal: "TODO how do we calculate that?",
          interest: "TODO how do we calculate that?",
          total: active_request.payables[0].amount_remain,
        },
        amountRepaid: active_request.payables[0].amount_paid,
        nextPayment: {
          nextDate:
            "TODO end of current month if lastPayment was last month, else end of next month that it bigger than due date",
          nextAmount: "TODO remainAmount / # of remaining payments",
        },
        lastPaid: active_request.payables[0].last_paid || "no payment yet",
      }
    } else if (
      active_request.status === LoanRequestStatus.awaiting_borrower_confirmation
    ) {
      const offer = active_request.risk_calc_result.latestOffer
      return {
        transactions,
        loanId: active_request.request_id,
        status: active_request.status,
        desired_principal: active_request.amount,
        offerParams: {
          raw: active_request.risk_calc_result.latestOffer,
          offered_principal: offer.amount,
          interest: offer.interest,
          totalAmount: offer.amount + offer.interest,
          monthly: "TODO",
          dueDate: "TDODO always in 6 months?",
        },
      }
    }
  }

  getLenderDashboadInfo = async (lender_id: string) => {
    const {
      lender,
      corpusInvestment,
      corpusShares,
    } = await this._sdk.GetLenderDashboardInfo({ user_id: lender_id })
    const totalCorpusShares = corpusShares.aggregate.sum.corpus_share
    return {
      // money the user brought
      invested: lender.corpus_share,
      idle: lender.balance,
      encumbered: "TODO", //lenderInfo.encumbrances_aggregate.aggregate.sum.amount_remain || 0,
      // interest that is earned from the money brought
      interest: {
        expected:
          proportion(
            lender.corpus_share,
            totalCorpusShares,
            corpusInvestment.aggregate.sum.amount_total
          ) || 0,
        received:
          proportion(
            lender.corpus_share,
            totalCorpusShares,
            corpusInvestment.aggregate.sum.amount_received
          ) || 0,
        outstanding:
          proportion(
            lender.corpus_share,
            totalCorpusShares,
            corpusInvestment.aggregate.sum.amount_remain
          ) || 0,
      },
      transactions: lender.transactions,
      guarantor_requests: [
        {
          borrower_info: { email: "example1@b.com", name: "ashish" },
          purpose: "education",
          amount: 200,
        },
        {
          borrower_info: { email: "example2@mail.com", name: "gaurav" },
          purpose: "business",
          amount: 500,
        },
      ],
    }
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
    const data = await this._sdk.CreateLoanRequest({
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

  /**
   * for a given request, create an offer by calling the swarmai-optimizer
   * @param request_id
   */
  calculateLoanRequestOffer = async (requestId: string) => {
    const data = await this._sdk.GetLoanRequest({ requestId })
    const request = data.loan_requests_by_pk

    // TODO put msg to bucket that will trigger ai to calculate the loan risk and what the potential lenders would contribute
    // const ai_input = await this.fetchDataForLoanRequestCalculation(req.borrower_id,  req.amount)
    // Once done, the AI will then call back into into our api and write to the DB

    // for simplicity will this is now be mocked up like this:
    const mockedAiResult = { amount: request.amount, interest: 10 }
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
    const res = await this._sdk.UpdateLoanRequestWithOffer({
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
  acceptLoanOffer = async (
    request_id: string,
    offer_key = "latestOffer"
  ) => {
    // get offer and unpack it
    const data = await this._sdk.GetLoanOffer({ request_id })
    const offer_params = data.loan_requests_by_pk
    const { amount, interest } = offer_params.risk_calc_result.latestOffer
    const { lenders, corpusCash } = await this._sdk.GetLenderAllocationInput()
    const totalCorpusCash = corpusCash.aggregate.sum.balance

    // verify the corpus still has capacity to fulfill the loan offer
    if (totalCorpusCash >= amount) {
      // compute loan-allocation based on lender cash-balances
      const portfolioUpdates: Array<PortfolioUpdate> = []
      const transactions = []
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

        // Note this is the most reduced format I would expect
        transactions.push({ userId: lender.id, delta: -shareInLoan })
      })

      // find out whether transactions have gone through, then execute portfolioUpdates
      // TODO call to FP API to confirm that all tx can go through
      const mockedCallToFPResult = (transactions) => true
      if (mockedCallToFPResult) {
        // update balances and create txHistory
        const res = await this.updatePortfolios(
          portfolioUpdates,
          request_id,
          "lend"
        )
        if (!res.ERROR) {
          // -> create payables receivables based on loan offer parameters
          const variables = createStartLoanInputVariables(
            request_id,
            amount,
            interest
          )
          const startedLoan = await this._sdk.StartLoan(variables)
          return { startedLoan }
        } else {
          return {
            ERROR: {
              description: "Updates couldnt not be done, despite FP-okay",
              data: [res.ERROR, mockedCallToFPResult],
            },
          }
        }
      } else {
        return {
          ERROR: { description: "Invalid Updates", data: mockedCallToFPResult },
        }
      }
    } else {
      return {
        ERROR: {
          description: "Offer is outdated: Not enough balance in corpus",
          data: {},
        },
      }
    }
  }

  /**
   * updates many portfolios (cash & corpusShare) and creates corresponding entries in the transaction-table
   * all such entries will have the same type and description and if given, relate to the same loan-id
   * @param updates
   * @param loan_id
   * @param tx_type
   * @param tx_description
   */
  updatePortfolios = async (
    updates: Array<PortfolioUpdate>,
    loan_id = "",
    tx_type = "",
    tx_description = ""
  ) => {
    const dryRunFailures = await this.dryRunPortfolioUpdates(updates)
    if (dryRunFailures.length === 0) {
      const updateMutation = generateUpdatesAsSingleTransaction(
        updates,
        loan_id,
        tx_type,
        tx_description
      )
      const data = await this._fetcher.request(updateMutation)
      return data
    } else {
      return {
        ERROR: {
          description: "Dryrun failed",
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
    const { user } = await this._sdk.GetAllUsers()
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
   * change a users balance and create an entry with status confirmed in the tx-table in the process
   * NOTE: in the future we might want to do other kinds of updates
   * @param userId
   * @param delta
   * @param type must be "deposit" or "withdraw",
   */
  instantBalanceUpdateWithTransaction = async (
    userId: string,
    delta: number,
    type: string,
    data: any = {},
    description = ""
  ) => {
    if (type === "deposit" || type === "withdraw") {
      const {
        transaction,
        user,
      } = await this._sdk.UpdateBalanceWithTransaction({
        userId,
        delta: type === "deposit" ? delta : -delta,
        tx: {
          user_id: userId,
          type: type,
          description,
          data,
          total_amount: delta >= 0 ? delta : -delta,
          status: TransactionStatus.confirmed,
        },
      })
      return { user, transaction }
    } else {
      return { ERROR: "unknown type of update" }
    }
  }
}
