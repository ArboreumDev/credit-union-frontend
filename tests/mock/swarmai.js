
/**
 * dummy function to create what the optimizer would return
 * whatever amounts each lender will contribute.
 * Therefore the loan is split equally amongst all lenders
 * every lender takes 1 percent interest, for now nominated as '1'
 * @param {} potential_lenders list of lender_id's
 * @param {} amount total amount to be loaned
 */
export const mockedLoanOffer = (potential_lenders, amount) => {
  const lender_amount = Math.floor(amount / potential_lenders.length)
  const leftAmount = amount
  const lenders = []
  for (var i = 0; i < potential_lenders.length; i++) {
    const lender = {
      lender_id: potential_lenders[i],
      lender_amount: lender_amount,
      percentage: Math.floor((lender_amount * 100) / amount),
      lender_interest_rate: 10
    }
    lenders.push(lender)
  }
  // let lenders = potential_lenders.map(x => {
  // return {lender_id: x, amount: lender_amount, interest_rate: 1 }
  // })
  const mockResult = {
    borrower: { amount: amount, interest: 2 },
    lenders
  }
  return mockResult
}
