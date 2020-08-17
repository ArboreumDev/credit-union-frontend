// SUPER HACKY!!
const lenderAmountToAmountWithInterest = (amount, interest) => {
  return amount + ((amount / 100) * interest)
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
  const amount_owed = lenderAmountToAmountWithInterest(amount, offer_params.risk_calc_result.latestOffer.borrower.interest)
  const payable = {
    loan_id: request_id,
    amount_total: amount_owed,
    amount_remain: amount_owed,
    pay_priority: 1
  }
  return {
    request_id,
    payable,
    lenders,
    lender_receivables
  }
}
