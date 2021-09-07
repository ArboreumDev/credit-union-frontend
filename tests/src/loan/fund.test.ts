import { Loan_Request_State_Enum, Loan_State_Enum } from "../../../src/gql/sdk"
import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import { createLoanRequest } from "../../src/common/test_helpers"
import { uuidv4 } from "lib/helpers"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Fund Loan Success Flows", () => {
  const lenderDeposit = 11
  const loanAmount = 10
  let requestId: string

  beforeEach(async () => {
    requestId = await createLoanRequest(BORROWER1.id, dbClient, loanAmount)
    const { user } = await sdk.GetAccountDetails({ id: LENDER1.id })
    await dbClient.circleClient.fundFromMasterWallet(
      user.account_details.circle.walletId,
      lenderDeposit,
      uuidv4()
    )
  })

  afterEach(async () => {
    await sdk.ResetLoans()
    await sdk.ResetRequests()
  })

  test("Fund an existing loan request", async () => {
    const balanceBefore = await dbClient.getCircleBalance(LENDER1.id)
    const {
      newLoan,
      amountsLent,
      loanRequest,
    } = await dbClient.fundLoanRequest(requestId, LENDER1.id)

    expect(loanRequest.state).toBe(Loan_Request_State_Enum.Fulfilled)

    expect(newLoan.principal).toBe(loanAmount)
    expect(newLoan.state).toBe(Loan_State_Enum.Live)
    expect(newLoan.principal_remaining).toBe(loanAmount)

    expect(amountsLent.returning[0].lender_id).toBe(LENDER1.id)
    expect(amountsLent.returning[0].amount_lent).toBe(loanAmount)

    const balanceAfter = await dbClient.getCircleBalance(LENDER1.id)
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
