import { initializeGQL } from "./graphql_client"
import { EDGE_STATUS, LoanRequestStatus } from "../../src/utils/types"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { getNodesFromEdgeList } from "../../src/utils/network_helpers"


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
  sdk: Sdk;

  constructor(admin_secret: string, gql_url: string) {
    let client = initializeGQL(admin_secret, gql_url)
    this.sdk = getSdk(client)
  }

  getUserPortfolio = async () => {
    // TODO
    // let data = await this.client.request(GET_USERS)
    // return data.user
  }
  
  getProfileInfo = async () => {
    // TODO
  }

  /**
   * return {status: null} if the borrower has neither a request, nor an accepted loan
   * {status: 'initiated',...} if the user has requested an offer, but the AI is still processing
   * {status: 'awaiting_borrower_confirmation',...} if there is an offer and the user needs to accept/reject
   * {status: 'live', ... } if there is an active loan request (that requires payback)
   * @param borrower_id 
   */
  getBorrowerDashboardInfo = async (borrower_id) => {
    const data = await this.sdk.GetLoansByBorrowerAndStatus(
      {borrower_id, statusList: [LoanRequestStatus.live, LoanRequestStatus.awaiting_borrower_confirmation, LoanRequestStatus.initiated]}
    )
    if (data == undefined) return {status: null}

    const active_request = data.loan_requests[0]
    if (active_request.status === LoanRequestStatus.live) {
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
    } else if (active_request.status === LoanRequestStatus.awaiting_borrower_confirmation) {
      const offer = active_request.risk_calc_result.latestOffer
      return {
        loanId: active_request.request_id,
        status: active_request.status,
        desired_principal: active_request.amount,
        offerParams: {
          raw: active_request.risk_calc_result.latestOffer,
          offered_principal: offer.amount,
          interest: offer.interest,
          totalAmount: offer.amount + offer.interest,
          monthly: "TODO",
          dueDate: "TDODO always in 6 months?"
      }
    }
  }
}


  /**
   * get the network and edges of a given edge_status in network-X format
  * @param {} gqlclient
  * @param {*} status
  * @returns {} an object {nodes: [user_number1, ...], edges: [[from, to, credit], ...]}
  */
  getNetwork = async (status: EDGE_STATUS = EDGE_STATUS.active) => {
    const data = await this.sdk.GetEdgesByStatus({status})
    const edges = data.edges.map(x => [x.from_user.user_number, x.to_user.user_number, x.trust_amount])
    const nodes = getNodesFromEdgeList(edges)
    return { nodes, edges }
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
    purpose: string,
  ) => {
    const data = await this.sdk.CreateLoanRequest(
      {
        request: {
          borrower_id,
          amount,
          purpose,
          risk_calc_result: {}
        }
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
  calculateLoanRequestOffer = async ( requestId: string) => {
    const data = await this.sdk.GetLoanRequest({requestId})
    const request = data.loan_requests_by_pk

    // TODO put msg to bucket that will trigger ai to calculate the loan risk and what the potential lenders would contribute
    // const ai_input = await this.fetchDataForLoanRequestCalculation(req.borrower_id,  req.amount)
    // Once done, the AI will then call back into into our api and eventually trigger a function that for simplicity will
    // now be mocked up like this:
    const mockedAiResult = {amount: request.amount, interest: 10}
    const aiResult = await this.storeAiResult( requestId, { latestOffer: mockedAiResult })
    return { updatedRequest: aiResult }
  }

  /**
   * When the ai is done, this function should be called to save stuff into the DB
   * Currently, stores best offer-params in loan_requests.risk_calc_result
   * and updates status of loan_request to 'awaiting_borrower_confirmation`
   * @param {} graphqlClient
   * @param {} newOffer should be an object {interest_rate: int, lenders: [{lender_id, lender_amount, interest_rate}]} <the latter is lender_insert_input
   */
  storeAiResult = async (requestId: string, newOffer: any) => {
    const res = await this.sdk.UpdateLoanRequestWithOffer({requestId, newOffer})
    return res.update_loan_requests_by_pk
  }
}