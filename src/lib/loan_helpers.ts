import { PortfolioUpdate, SupporterStatus } from "./types"
import {
  GetLoansByBorrowerAndStatusDocument,
  GetLoansByBorrowerAndStatusQuery,
  Sdk,
} from "../gql/sdk"
import { LoanRequestStatus } from "./types"
import DbClient from "gql/db_client"

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
  totalOwedAmount: number
) => {
  const receivable = {
    loan_id: request_id,
    amount_total: totalOwedAmount,
    amount_remain: totalOwedAmount,
  }
  const payable = {
    loan_id: request_id,
    amount_total: totalOwedAmount,
    amount_remain: totalOwedAmount,
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
 * generates a mutation that will increase the users balance by amount and decrease share in corpus by same amount
 * NOTE: essentially this is a workaround for the fact that one can not do updates to multiple rows
 * in a single transaction if I want to select the rows via arguments
 * @param {} userInputList [{userId, balanceUpdate, corpusShareUpdate, alias}]
 */
export const generateUpdateAsSingleTransaction = (
  userInputList: Array<PortfolioUpdate>
): string => {
  let query = "mutation updateUserBalances {"
  let i = 0
  userInputList.forEach((user) => {
    i++
    query =
      query +
      generateUserBalanceUpdate(
        user.userId,
        user.balanceDelta,
        user.shareDelta,
        "user" + i.toString()
      )
  })
  query = query + "}"
  return query
}

const generateUserBalanceUpdate = (
  userId: string,
  balanceUpdate: number,
  corpusShareUpdate: number,
  alias: string
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
        },`
  )
}
