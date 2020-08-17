import { initializeGQL } from "./GQLClient"
import request, { GraphQLClient } from "graphql-request"
import Accounts from "../queries/accounts"
import Loans from "../queries/loans"
import { getNodesFromEdgeList } from "../db/network_helpers"
import { User, LoanRequestStatus } from "../types"
import { mockedLoanOffer } from "../../tests/mock/swarmai"
import { getAllUsers } from "../../tests/fixtures/fixture_helpers"
import { transform_to_start_loan_input } from "./loan_helpers"
import Network from '../queries/network'
import { EdgeStatus } from '../types'
// import borrower from "../../components/dashboard/borrower"
// import { setupMaster } from "cluster"
// import lender from "../../components/dashboard/lender"


/**
 * A class to be used in the frontend to send queries to the DB. As a general rule
 * only "pre-cooked" functions should be used to do any needed input formatting,
 * processing or checking for consistency should be done inside
 * the pre-cooked functions. The executeGQL should only be used to test things during development
 */
export class DbClient {
  _fetcher: GraphQLClient
  constructor(fetcher: GraphQLClient) {
    this._fetcher = fetcher
  } // TODO: Make _fetcher private

  static fromEnv() {
    return new DbClient(initializeGQL())
  }

  executeGQL = async (query: string, variables = {}) =>
    this._fetcher.request(query, variables)

  // ================ Accounts ================

  getUser = async (props: { email: string }) =>
    this._fetcher.request(Accounts.GET_USER_BY_EMAIL, props)

  createUser = async (props: User) => {
    const data = await this._fetcher.request(Accounts.CREATE_USER_MUTATION, {'user': props})
    return data.insert_user_one
  }

  getAllUsers = async () =>
    this._fetcher.request(`query MyQuery {
    user {
      id
      email
      name
    }
  }`)


  getLoanHistory = async (borrower_id: string) => {
    // TODO
  }

  getBorrowerDashboardInfo = async (borrower_id) => {
    const data = await this._fetcher.request(
      Accounts.GET_LOANS_BY_BORROWER_AND_STATUS, 
      {borrower_id, statusList: [LoanRequestStatus.live]}
    )
    if (data == undefined) return {}

    const active_request = data.loan_requests.filter(x => x.status == LoanRequestStatus.live)[0]
    return {
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
        nextDate: "TODO end of current month if lastPayment was last month, else end of next month that it bigger than due date",
        nextAmount: "TODO remainAmount / # of remaining payments"
      },
      lastPaid: active_request.payables[0].lastPaid
    }
  }

  getLenderDashboadInfo = async (lender_id: string) => {
    const data = await this._fetcher.request(Accounts.GET_LENDER_DASHBOARD_INFO, {user_id: lender_id})
    let lenderInfo = data["user_by_pk"]
    
    return { 
      // money the user brought
      invested: lenderInfo.loan_participants_aggregate.aggregate.sum.lender_amount,
      idle: lenderInfo.balance,
      encumbered: lenderInfo.encumbrances_aggregate.aggregate.sum.amount_remain || 0,
      // interest that is earned from the money brought
      interest: {
        expected: lenderInfo.receivables_aggregate.aggregate.sum.amount_total || 0,
        received: lenderInfo.receivables_aggregate.aggregate.sum.amount_received || 0,
        outstanding: lenderInfo.receivables_aggregate.aggregate.sum.amount_remain || 0,
      },
      guarantor_requests: [
        {
          borrower_info: {email: "a@b.com", name: "ashish"},
          purpose: "education",
          amount: 200
        },
        {
          borrower_info: {email: "g@mail.com", name: "gaurav"},
          purpose: "business",
          amount: 500
        }
      ]
    }
  }

  // ================ Loans ================
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
    amount,
    purpose: string,
    msg: any = "TODO"
  ) => {
    const data = await this._fetcher.request(
      Loans.INITIATE_LOAN_REQUEST,
      {
        request_object: {
          borrower_id,
          amount,
          purpose,
          risk_calc_result: {},
        },
      }
    )
    return {
      request: data.insert_loan_requests_one
    }
  }

  /**
   * for a given request, create an offer
   * @param request_id 
   */
  calculateLoanRequestOffer = async (
    request_id: string
  ) => {
    const data = await this._fetcher.request(Loans.GET_REQUEST_BY_ID, {request_id})
    const req = data.loan_requests_by_pk
    const ai_input = await this.fetchDataForLoanRequestCalculation(req.borrower_id,  req.amount)
    
    // TODO put msg to bucket that will trigger ai to calculate the loan risk and what the potential lenders would contribute
    
    // Once done, the AI will then call back into into our api and eventually trigger a function that for simplicity will
    // now be mocked up like this:
    const mockedAiResult = mockedLoanOffer(ai_input.potential_lenders, req.amount)
    const ai_result = await this.storeAiResultToDB(
      request_id,
      { latestOffer: mockedAiResult }
    )
    return {
      request: ai_result.update_loan_requests_by_pk,
      testing: {
        pre_ai: req,
        post_ai: ai_result.update_loan_requests_by_pk,
        ai_input,
      },
    }
  }

  /**
   * After seeing an offer, the borrower can accept it (or change it by adding guarantors, or adjusting the amount)
   * Calling this function gets offer from loan_request.risk_calc_result and translates it to payables, receivables, encumbrances,...
   * Also, advances loan_request status to 'live'
   */
  acceptLoanOffer = async (
    request_id: string,
    offer_key: string  = "latestOffer"
  ) => {
    const data = await this._fetcher.request(Loans.GET_LOAN_OFFER, {
      request_id,
    })
    const offer_params = data.loan_requests_by_pk
    const variables = transform_to_start_loan_input(request_id, offer_params)
    const started_loan = await this._fetcher.request(Loans.START_LOAN, variables)
    return started_loan
  }

  // ================= HELPERS =======================

  /**
   * creates the message that will be sent to the swarmAI module the loan offer based on the borrowers risk
   * NOTE: this is still under WIP. as of now it only provides enough to serve the mockAI
   * @param borrower_id
   * @param amount
   */
  fetchDataForLoanRequestCalculation = async (
    borrower_id: string,
    amount: number
  ) => {
    // get latest Info on borrower
    // network-risk-param info:
    // potential_lenders: everyone except borrower themselves
    // const network = await getNetwork(this.fetcher , EdgeStatus.active)
    // let potential_lenders = network.nodes
    // delete potential_lenders[borrower_id]
    const all_users = await getAllUsers(this._fetcher)
    const potential_lenders = all_users
      .filter((x) => x.id !== borrower_id)
      .map((x) => x.id)

    // TODO fetch all guarantors
    const guarantors = {}

    // TODO fetch risk model input: For all potential lenders:
    //    get latest repayments
    //    get portfolio-size
    //    get recommendation risks VERIFY with GAURAV that we eeven need that for CORPUS

    // TODO get network parameters
    const mockReturn = {
      // network,
      amount,
      potential_lenders,
      guarantors,
    }
    return mockReturn
  }
  
  /**
   * When the ai is done, this function should be called to save stuff into the DB
   * Currently, stores best offer-params in loan_requests.risk_calc_result
   * and updates status of loan_request to 'awaiting_borrower_confirmation`
   * @param {} graphqlClient
   * @param {} bestOffer {interest_rate: int, lenders: [{lender_id, lender_amount, interest_rate}]} <the latter is lender_insert_input
   * @param {*} otherParams whatever things we need to store too (demand functions, risk result,...)
   */
  storeAiResultToDB = async (request_id, bestOffer, otherParams = null) => {
    const variables = {
      request_id,
      new_offer: bestOffer
    }
    const res = this._fetcher.request(Loans.UPDATE_LOAN_REQUEST_WITH_OFFER, variables)
    return res
  }
  
  /**
   * get the network and edges of a given edge_status
   * @param {} gqlclient
   * @param {*} status
   * @returns {} an object {nodes: [user_number1, ...], edges: [[from, to, credit], ...]}
   */
  getNetwork = async (status: EdgeStatus = EdgeStatus.active) => {
    const data = await this._fetcher.request(Network.GET_EDGES_BY_STATUS, { status: status })
    const edges = data.edges.map(x => [x.from_user.user_number, x.to_user.user_number, x.trust_amount])
    const nodes = getNodesFromEdgeList(edges)
    return { nodes, edges }
  }
}
