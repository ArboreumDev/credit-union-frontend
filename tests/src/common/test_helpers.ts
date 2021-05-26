import lender from "components/dashboard/lender"
import DbClient from "gql/db_client"
import { SupporterStatus } from "../../../src/lib/types"

export const getUserPortfolio = (userList) => {
  const ret = {}
  userList.forEach((user) => {
    ret[user.id] = { cash: user.balance }
  })
  return ret
}

export const createLoanRequest = async (
  borrowerId: string,
  dbClient: DbClient,
  amount = 1000,
  purpose = "test case"
) => {
  const { loanRequest } = await dbClient.createLoanRequest(
    borrowerId,
    amount,
    purpose
  )
  return loanRequest.request_id
}

export const createFundedLoan = async (
  borrowerId: string,
  dbClient: DbClient,
  lenderId: string,
  doLenderDeposit: number,
  amount = 1000,
  purpose = "test case"
) => {
  const requestId = await createLoanRequest(
    borrowerId,
    dbClient,
    amount,
    purpose
  )
  if (Math.abs(doLenderDeposit))
    await dbClient.sdk.ChangeUserCashBalance({
      userId: lenderId,
      delta: doLenderDeposit,
    })
  const { newLoan } = await dbClient.fundLoanRequest(requestId, lenderId)
  return newLoan.loan_id
}
