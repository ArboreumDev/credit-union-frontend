function toFloat8(x: number) {
    return parseFloat(x.toFixed(8));
  }
  
  /**
   * 0 < returned value < 1, part and total must have the same unit
   * for now this is returning default math operation, but maybe in the future we need to 
   * make sure all our operations arrive at the same result so it's a good idea to always do them 
   * in the same place
   * @param {} part 
   * @param {*} total 
   */
  export const decimalFraction = (part:number, total: number): number => {
    return part / total
  }
  
  /**
   * computes part/total of amount and casts result to float8 precision
   * @param { part 
   * @param {*} total 
   * @param {*} amount 
   */
  export const proportion = (part: number, total: number, amount: number): number => {
    return decimalFraction(part, total) * amount
  }
  
  /**
   * returns how much much a lender will contribute to a specific loan, based on his cash-balance
   * the result is cast to float8 to be compatible with out database
   * @param {} lenderBalance 
   * @param {*} corpusCash 
   * @param {*} loanAmount 
   */
  export const lenderBalanceToShareInLoan = (lenderBalance: number, corpusCash: number, loanAmount: number): number => {
    return toFloat8(proportion(lenderBalance, corpusCash, loanAmount))
  }

export const createStartLoanInputVariables = (request_id: string, amount: number, interest: number) => {
    var owedAmount = proportion(100 + interest, 100,  amount)
    const receivable = {
        loan_id: request_id,
        amount_total: owedAmount,
        amount_remain: owedAmount
      }
    const payable = {
      loan_id: request_id,
      amount_total: owedAmount,
      amount_remain: owedAmount,
      amount_paid: 0,
      pay_priority: 1
    }
    return {
      request_id,
      payable,
      receivable
    }
  }