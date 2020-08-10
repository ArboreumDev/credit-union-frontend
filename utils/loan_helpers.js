import {UPDATE_LOAN_REQUEST_WITH_OFFER} from "./queries"
// const getDashboardInfo = async () => {
// }


// const demandFunctionToLoanParticipantInfo = async () => {
// }

 /**
  * When the ai is done, this function should be called to save stuff into the DB
  * Currently, stores best offer-params in loan_requests.risk_calc_result
  * and updates status of loan_request to 'awaiting_borrower_confirmation`
  * @param {} graphqlClient 
  * @param {} bestOffer {interest_rate: int, lenders: [{lender_id, lender_amount, interest_rate}]} <the latter is lender_insert_input
  * @param {*} otherParams whatever things we need to store too (demand functions, risk result,...)
  */
export const storeAiResultToDB = async (graphqlClient, request_id, bestOffer, otherParams = null) => {
    const variables = {
        request_id,
        new_offer: bestOffer
    }
    const res = graphqlClient.request(UPDATE_LOAN_REQUEST_WITH_OFFER, variables)
    return res
}
