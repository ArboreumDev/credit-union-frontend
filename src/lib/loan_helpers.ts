import { LoanTerms, PortfolioUpdate, LoanState } from "./types"
import {
  Loan_State_Enum,
  Update_Log_Insert_Input,
  Update_Type_Enum,
} from "../gql/sdk"
import { unixTimestampToDateString } from "lib/helpers"

function toFloat8(x: number) {
  return parseFloat(x.toFixed(8))
}

export const loanAndNewStateToUpdate = (
  loan,
  latestLoanState,
  type: Update_Type_Enum,
  newLoanState,
  repaymentId = ""
) => {
  const update = {
    type,
    loan_id: loan.loan_id,
  } as Update_Log_Insert_Input
  // replace only those that have changed
  if (repaymentId) update.repayment_id = repaymentId
  if (loan.principal_remaining !== latestLoanState.principal_remaining)
    update.new_principal_remain = latestLoanState.principal_remaining
  if (loan.principal_overdue !== latestLoanState.principal_overdue)
    update.new_principal_overdue = latestLoanState.principal_overdue
  if (loan.interest_accrued !== latestLoanState.interest_accrued)
    update.new_interest_accrued = latestLoanState.interest_accrued
  if (loan.interest_paid !== latestLoanState.interest_paid)
    update.new_interest_paid = latestLoanState.interest_paid
  if (loan.next_payment_amount !== latestLoanState.next_payment_amount)
    update.new_next_payment_amount = latestLoanState.next_payment_amount
  if (loan.next_payment_due_date !== latestLoanState.next_payment_due_date)
    update.new_next_payment_due_date = latestLoanState.next_payment_due_date
  if (loan.penalty_accrued !== latestLoanState.penalty_accrued)
    update.new_penalty_accrued = latestLoanState.penalty_accrued
  if (loan.state !== newLoanState) update.new_state = newLoanState
  return update
}

export const loanToTerms = (loan) => {
  return {
    apr: loan.apr,
    penalty_apr: loan.penalty_apr,
    principal: loan.principal,
    tenor: loan.tenor,
    compounding_frequency: loan.compounding_frequency,
    start_date: Math.round(new Date(loan.created_at).getTime() / 1000),
  } as LoanTerms
}

export const loanStateToUpdateInput = (l: LoanState) => {
  return {
    new_principal_remain: l.principal_remaining,
    new_principal_overdue: l.principal_overdue,
    new_interest_accrued: l.interest_accrued,
    new_interest_paid: l.interest_paid,
    new_next_payment_amount: l.next_payment_amount,
    new_next_payment_due_date: l.next_payment_due_date,
  }
}

export const loanStateToLoanInput = (l: LoanState) => {
  return {
    newPrincipalRemaining: l.principal_remaining,
    newPrincipalOverdue: l.principal_overdue,
    newInterestAccrued: l.interest_accrued,
    newInterestPaid: l.interest_paid,
    newNextPaymentAmount: l.next_payment_amount,
    newNextPaymentDueDate: l.next_payment_due_date,
  }
}

export const getTotalPaid = (principal, loan) => {
  return principal - loan.principal_remaining + loan.interest_paid
}

export const getTotalOutstanding = (loan) => {
  return (
    loan.principal_remaining + loan.interest_accrued + loan.principal_overdue
  )
}

export const getLoanState = (loan) => {
  const newLoanState =
    loan.principal_remaining - getTotalOutstanding(loan) > 0
      ? Loan_State_Enum.Live
      : Loan_State_Enum.Repaid
  return newLoanState
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
