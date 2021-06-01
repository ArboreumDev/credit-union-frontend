import { LoanInfo, PortfolioUpdate } from "./types"
import { Sdk, Loan_Request_State_Enum } from "../gql/sdk"
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

// export const createStartLoanInputVariables = (
//   request_id: string,
//   realizedLoan: LoanInfo,
//   updates: PortfolioUpdate[]
// ) => {
//   // input to loan_participants: lenders only
//   const supporter_ids = realizedLoan.terms.supporters.map((x) => x.supporter_id)
//   const lenders = []
//   updates.forEach((update: PortfolioUpdate) => {
//     if (
//       update.userId !== realizedLoan.terms.borrower_info.borrower_id &&
//       !supporter_ids.includes(update.userId) &&
//       Math.abs(update.balanceDelta) !== 0
//     ) {
//       lenders.push({
//         lender_amount: -update.balanceDelta,
//         lender_id: update.userId,
//         loan_id: realizedLoan.request_id,
//       } //as Loan_Participants_Insert_Input)
//     }
//   })

//   return {
//     request_id,
//     lenders,
//   }
// }

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
