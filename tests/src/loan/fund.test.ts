import {
  Loan_Request_State_Enum,
  Loan_State_Enum,
  FundLoanRequestMutation,
} from "../../../src/gql/sdk"
import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import DbClient from "gql/db_client"
import borrower from "components/dashboard/borrower"

const createLoanRequest = async (
  borrowerId: string,
  _dbClient: DbClient = dbClient,
  amount = 1000,
  purpose = "test case"
) => {
  const { loanRequest } = await _dbClient.createLoanRequest(
    borrowerId,
    amount,
    purpose
  )
  return loanRequest.request_id
}

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Fund Loan Success Flows", () => {
  const lenderDeposit = 2000
  const loanAmount = 1000
  let requestId: string

  beforeEach(async () => {
    requestId = await createLoanRequest(BORROWER1.id, dbClient, loanAmount)
    await sdk.ChangeUserCashBalance({
      userId: LENDER1.id,
      delta: lenderDeposit,
    })
  })

  afterEach(async () => {
    //   await sdk.ResetLoans()
    await sdk.ResetRequests()
  })

  test("Fund an existing loan request", async () => {
    const balanceBefore = (await dbClient.getUserByEmail(LENDER1.email)).balance
    const {
      newLoan,
      amountsLent,
      loanRequest,
    } = await dbClient.fundLoanRequest(requestId, LENDER1.id)

    expect(loanRequest.state).toBe(Loan_Request_State_Enum.Fulfilled)
    expect(newLoan.principal).toBe(loanAmount)
    expect(newLoan.principal_remaining).toBe(loanAmount)
    expect(amountsLent.returning[0].lender_id).toBe(LENDER1.id)
    expect(amountsLent.returning[0].amount_lent).toBe(loanAmount)

    //TODO
    const balanceAfter = (await dbClient.getUserByEmail(LENDER1.email)).balance
    expect(balanceAfter).toBe(balanceBefore - loanAmount)
  })
  test.todo("borrower creates a loan request after a completed loan")
  test.todo("borrower creates a loan request after a withdrawn loan-request")
})

describe("Loan Request Creation fails, if...", () => {
  test.todo("...creator is incorrect user type")
  test.todo("...borrower already has an active loan")
  test.todo("...borrower already has an active request")
})
