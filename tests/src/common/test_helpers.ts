import lender from "components/dashboard/lender"
import DbClient from "gql/db_client"
import { uuidv4 } from "lib/helpers"

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
  if (Math.abs(doLenderDeposit)) {
    const { user } = await dbClient.sdk.GetAccountDetails({ id: lenderId })
    await dbClient.circleClient.fundFromMasterWallet(
      user.account_details.circle.walletId,
      amount,
      uuidv4()
    )
  }
  const { newLoan } = await dbClient.fundLoanRequest(requestId, lenderId)
  return { loanId: newLoan.loan_id, walletId: newLoan.wallet_id }
}

/**
 * as we can not use the algoSigner extension during the tests, we call the backend to create an address and 
 * complete for it the steps the user would do manually:
 * - creating an account
 * - funding it with microAlgos
 * - opting it in to our credit profile app
 * @param dbClient 
 * @param userEmail 
 * @returns 
 */
export const optInTestAccount = async (dbClient: DbClient, userEmail: string) => {
  const user = await dbClient.getUserByEmail(userEmail)

  const {address} = await dbClient.algoClient.optInSampleBorrower()
  console.log('created, funded & opted in new algorand address:', address)

  return await dbClient.sdk.UpdateAccountDetails({
    userId: user.id,
    accountDetails: {
      ...user.account_details,
      algorand: {
        address: address
      }
    }
  })
}
