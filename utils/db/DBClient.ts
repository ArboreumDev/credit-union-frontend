import { initializeGQL } from "./GQLClient"
import { GraphQLClient } from "graphql-request"
import Accounts from "../queries/accounts"
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

  createUser = async (props: User) =>
    this._fetcher.request(Accounts.CREATE_USER_MUTATION, props)

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
  calculateLoanRequestOffer = async (
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
          risk_calc_result: { offers: [] },
        },
      }
    )

    let request = initiateLoanRequestResult.insert_loan_requests_one
    const ai_input = await this.fetchDataForLoanRequestCalculation(
      borrower_id,
      amount
    )

    // TODO put msg to bucket that will trigger ai to calculate the loan risk and what the potential lenders would contribute

    // Once done, the AI will then call back into into our api and eventually trigger a function that for simplicity will
    // now be mocked up like this:
    const mockedAiResult = mockedLoanOffer(ai_input.potential_lenders, amount)
    // console.log('prep', ai_input, 'mocked', mockedAiResult)
    const ai_result = await storeAiResultToDB(
      this._fetcher,
      request.request_id,
      { latestOffer: mockedAiResult }
    )
    return {
      request: ai_result.update_loan_requests_by_pk,
      testing: {
        pre_ai: request,
        post_ai: ai_result.update_loan_requests_by_pk,
        ai_input,
      },
    }
  }

  /**
   * Borrowers can request their trustors (network neighbours) to support them (or not) on a loan-to-loan basis. Therefore
   * We assume the guarantors will be ok with it. If not they can reject the request.
   */
  addGuarantor = async (
    guarantor_id: string,
    request_id: string,
    amount: number,
    status = "unknown"
  ) => {
    const variables = {
      guarantors: [
        {
          request_id,
          guarantor_id,
          amount,
          status,
          invest_in_corpus: true,
        },
      ],
    }
    const addGuarantorResult = this._fetcher.request(
      ADD_GUARANTORS_TO_LOAN_REQUEST,
      variables
    )
    // what to do with the result
    return addGuarantorResult
  }

  /**
   * Guarantors are to be asked to support a loan on case by case basis, this is how we record what they say
   * @param status should be confirmed, rejected (theoretically possible: unknown)
   */
  recordGuarantorParticipation = async (
    guarantor_id: string,
    request_id: string,
    status: string,
    amount: number
  ) => {
    // it is assumed the guarantor exists and the loan request too
    const variables = { guarantor_id, request_id, status, amount }
    const updateResult = this._fetcher.request(UPDATE_GUARANTOR, variables)
    return updateResult
  }

  /**
   * After seeing an offer, the borrower can accept it (or change it by adding guarantors, or adjusting the amount)
   * Calling this function gets offer from loan_request.risk_calc_result and translates it to payables, receivables, encumbrances,...
   * Also, advances loan_request status to 'live'
   */
  acceptLoanOffer = async (
    borrower_id,
    request_id,
    offer_key = "latestOffer"
  ) => {
    const offer_params = await this._fetcher.request(GET_LOAN_OFFER, {
      request_id,
    })
    console.log("offer parameters fetched", offer_params)
    console.log(
      "next step: create START_LOAN mutation variabels from above offer params"
    )
    // const amount = offer_params.amount

    // TODO create lenders, lender_receivables, payables as described by the example object below:
    // let lenders = offer_params.risk_calc_result.latestOffer.lenders.map(x => { ...x, loan_id: request_id})
    // console.log('lenders', lenders)
    // let lender_receivables = {} // process args to be looking right

    // const variables = {
    //   request_id,
    //   payable: {
    //     "loan_id": request_id,
    //     "amount_total": amount,
    //     "amount_remain": amount,
    //     "pay_priority": 0 // TODO when was this different to zero?
    //   },
    //   lenders: [
    //     {
    //       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
    //       "lender_id": "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
    //       "lender_amount": 7,
    //       "percentage": 50
    //     },
    //         {
    //       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
    //       "lender_id": "943452f9-93bd-404b-807d-f9e6618df78a",
    //       "lender_amount": 7,
    //       "percentage": 50
    //     }
    //   ],
    //   "lender_receivables": [
    //     {
    //       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
    //       "receiver_id": "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
    //       "amount_total": 7,
    //       "amount_remain": 7
    //     },
    //     {
    //       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
    //       "receiver_id": "943452f9-93bd-404b-807d-f9e6618df78a",
    //       "amount_total": 7,
    //       "amount_remain": 7
    //     }
    //   ]
    // }
    // // const startLoanResult = this.client.executeGQL(START_LOAN, variables)
    // return startLoanResult
  }

  // ================= HELPERS =======================

  /**
   * creates the message that will be sent to the swarmAI module the loan offer based on the borrowers risk
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
      potential_lenders,
      guarantors,
    }
    return mockReturn
  }
}
