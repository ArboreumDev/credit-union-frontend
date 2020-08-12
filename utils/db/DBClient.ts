import { initializeGQL } from "./GQLClient"
import request, { GraphQLClient } from "graphql-request"
import Accounts from "../queries/accounts"
import Loans from "../queries/loans"
import { User } from "../types"
import {
  INITIATE_LOAN_REQUEST,
  ADD_GUARANTORS_TO_LOAN_REQUEST,
  UPDATE_GUARANTOR,
  GET_LOAN_OFFER,
  RESET_DB,
} from "./queries"
import { storeAiResultToDB } from "./loan_helpers"
import { mockedLoanOffer } from "../../tests/mock/swarmai"
import { getAllUsers } from "../../tests/fixtures/fixture_helpers"
import { transform_to_start_loan_input } from "./loan_helpers"
import borrower from "../../components/dashboard/borrower"
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

  getUserPortfolio = async () => {
    // TODO
    // let data = await this.client.request(GET_USERS)
    // return data.user
  }

  getProfileInfo = async () => {
    // TODO
  }

  // ================ Loans ================
  /**
   * called with borrower Id to create loan-request also create entries for guarantor requests
   * (mark those confirmed for now, later this would then require an extra step)
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
    // NOTE: this assumes that the borrower has no other active request
    // create loan_request in initial state
    const initiateLoanRequestResult = await this._fetcher.request(
      INITIATE_LOAN_REQUEST,
      {
        request_object: {
          borrower_id,
          amount,
          purpose,
          risk_calc_result: {},
        },
      }
    )
  
    let request = initiateLoanRequestResult.insert_loan_requests_one
    return {
      request
    }
    // TODO create guarantor entries with cofirmed-status
  }

  /**
   * for a given request, create an offer (using params + guarantors)
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
    const ai_result = await storeAiResultToDB(
      this._fetcher,
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
    const started_loan = await this._fetcher.request(Loans.START_LOAN, variables )
    return started_loan
  }

  // ================= HELPERS =======================

  /**
   * TODO creates the message that will be sent to the swarmAI module the loan offer based on the borrowers risk
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
}


  // /**
  //  * Borrowers can request their trustors (network neighbours) to support them (or not) on a loan-to-loan basis. Therefore
  //  * We assume the guarantors will be ok with it. If not they can reject the request.
  //  */
  // addGuarantor = async (
  //   guarantor_id: string,
  //   request_id: string,
  //   amount: number,
  //   status = "unknown"
  // ) => {
  //   const variables = {
  //     guarantors: [
  //       {
  //         request_id,
  //         guarantor_id,
  //         amount,
  //         status,
  //         invest_in_corpus: true,
  //       },
  //     ],
  //   }
  //   const addGuarantorResult = this._fetcher.request(
  //     ADD_GUARANTORS_TO_LOAN_REQUEST,
  //     variables
  //   )
  //   // what to do with the result
  //   return addGuarantorResult
  // }

  // /**
  //  * Guarantors are to be asked to support a loan on case by case basis, this is how we record what they say
  //  * @param status should be confirmed, rejected (theoretically possible: unknown)
  //  */
  // recordGuarantorParticipation = async (
  //   guarantor_id: string,
  //   request_id: string,
  //   status: string,
  //   amount: number
  // ) => {
  //   // it is assumed the guarantor exists and the loan request too
  //   const variables = { guarantor_id, request_id, status, amount }
  //   const updateResult = this._fetcher.request(UPDATE_GUARANTOR, variables)
  //   return updateResult
  // }