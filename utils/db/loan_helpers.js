import Loans from '../queries/loans'

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
  const res = graphqlClient.request(Loans.UPDATE_LOAN_REQUEST_WITH_OFFER, variables)
  return res
}

// SUPER HACKY!!
const lenderAmountToAmountWithInterest = (amount, interest) => {
  return amount + Math.ceil(amount / interest)
}

export const transform_to_start_loan_input = (request_id, offer_params) => {
  const amount = offer_params.amount
  const lenders = offer_params.risk_calc_result.latestOffer.lenders.map(x => {
    return {
      loan_id: request_id,
      lender_id: x.lender_id,
      lender_amount: x.lender_amount,
      percentage: x.percentage
    }
  })

  const lender_receivables = offer_params.risk_calc_result.latestOffer.lenders.map(x => {
    var owedAmount = lenderAmountToAmountWithInterest(x.lender_amount, x.lender_interest_rate)
    return {
      loan_id: request_id,
      receiver_id: x.lender_id,
      amount_total: owedAmount,
      amount_remain: owedAmount
    }
  })
  const payable = {
    loan_id: request_id,
    amount_total: amount,
    amount_remain: amount,
    pay_priority: 1
  }
  return {
    request_id,
    payable,
    lenders,
    lender_receivables
  }
}
