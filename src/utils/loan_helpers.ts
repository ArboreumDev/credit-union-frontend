import { PortfolioUpdate } from "../../src/utils/types"
import { Transactions_Insert_Input } from "../../src/gql/sdk"

function toFloat8(x: number) {
  return parseFloat(x.toFixed(8))
}

/**
 * 0 < returned value < 1, part and total must have the same unit
 * for now this is returning default math operation, but maybe in the future we need to
 * make sure all our operations arrive at the same result so it's a good idea to always do them
 * in the same place
 * @param {} part
 * @param {*} total
 */
export const decimalFraction = (part: number, total: number): number => {
  return part / total
}

/**
 * computes part/total of amount and casts result to float8 precision
 * @param { part
 * @param {*} total
 * @param {*} amount
 */
export const proportion = (
  part: number,
  total: number,
  amount: number
): number => {
  return decimalFraction(part, total) * amount
}

/**
 * returns how much much a lender will contribute to a specific loan, based on his cash-balance
 * the result is cast to float8 to be compatible with out database
 * @param {} lenderBalance
 * @param {*} corpusCash
 * @param {*} loanAmount
 */
export const lenderBalanceToShareInLoan = (
  lenderBalance: number,
  corpusCash: number,
  loanAmount: number
): number => {
  return toFloat8(proportion(lenderBalance, corpusCash, loanAmount))
}

export const createStartLoanInputVariables = (
  request_id: string,
  amount: number,
  interest: number
) => {
  const owedAmount = proportion(100 + interest, 100, amount)
  const receivable = {
    loan_id: request_id,
    amount_total: owedAmount,
    amount_remain: owedAmount,
  }
  const payable = {
    loan_id: request_id,
    amount_total: owedAmount,
    amount_remain: owedAmount,
    amount_paid: 0,
    pay_priority: 1,
  }
  return {
    request_id,
    payable,
    receivable,
  }
}

/**
 * generates a mutation that will
 * - increase the users balance by amount and
 * - decrease share in corpus by same amount and
 * - create an entry in the transaction table
 * NOTE: essentially this is a workaround for the fact that one can not do updates to multiple rows
 * in a single transaction if I want to select the rows via arguments
 * @param {} userInputList [{userId, balanceUpdate, corpusShareUpdate, alias}]
 * @param loan_id if given, all tx
 */
export const generateUpdatesAsSingleTransaction = (
  userInputList: Array<PortfolioUpdate>,
  loan_id: string,
  tx_type: string,
  tx_description: string
): string => {
  let query = "mutation updateUserBalances {"
  userInputList.forEach((user) => {
    query =
      query +
      generate_balance_update_for_user(
        user.userId,
        user.balanceDelta,
        user.shareDelta,
        user.alias,
        loan_id,
        tx_type,
        tx_description
      )
  })
  query = query + "}"
  return query
}

/**
 * generate a mutation that updates the users balance and creates an entry in the tx-table with the respective amount and the given type of transaction
 * NOTE: with transactions loan_id can be null (e.g. when the user makes a deposit or withdrawal)
 */
const generate_balance_update_for_user = (
  userId: string,
  balanceUpdate: number,
  corpusShareUpdate: number,
  alias: string,
  loan_id: string,
  tx_type: string,
  tx_description: string
) => {
  return (
    `
    ` +
    alias +
    `: update_user_by_pk (
      pk_columns: {id: "` +
    userId +
    `"}
      _inc: {balance: ` +
    balanceUpdate +
    ", corpus_share: " +
    corpusShareUpdate +
    `}
      ) {
          balance
          corpus_share
        },
    ` +
    alias +
    `Tx: insert_transactions_one (object: 
      {
        user_id: "` +
    userId +
    `",` +
    (loan_id ? ` loan_id: "` + loan_id + `",` : "") +
    `
        amount:` +
    balanceUpdate +
    `, 
        type: "` +
    tx_type +
    `",
        description: "` +
    tx_description +
    `",
        status: "confirmed"
       }) { 
         tx_nonce 
      },`
  )
}
