import { Loan_Request_State_Enum, Loan_State_Enum } from "../../../src/gql/sdk"
import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import DbClient from "gql/db_client"
import borrower from "components/dashboard/borrower"
import { createFundedLoan } from "../../src/common/test_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Repay Loan Success Flows", () => {
  const lenderDeposit = 2000
  const loanAmount = 1000
  let loanId: string

  beforeEach(async () => {
    loanId = await createFundedLoan(
      BORROWER1.id,
      dbClient,
      LENDER1.id,
      lenderDeposit,
      loanAmount,
      "repay tests"
    )
  })

  afterEach(async () => {
    await sdk.ResetLoans()
    await sdk.ResetRepayments()
  })

  test("Repay an existing loan ", async () => {
    const balanceBefore = (await dbClient.getUserByEmail(LENDER1.email)).balance
    const { loan, repayment, updateLogEntry } = await dbClient.makeRepayment(
      loanId,
      loanAmount
    )

    expect(loan.state).toBe(Loan_State_Enum.Repaid)
    expect(loan.principal_remaining).toBe(0)

    expect(repayment.repayment_id).toBeTruthy
    expect(repayment.loan_id).toBe(loanId)
    expect(repayment.repaid_principal).toBe(loanAmount)

    const balanceAfter = (await dbClient.getUserByEmail(LENDER1.email)).balance
    expect(balanceAfter).toBe(balanceBefore + loanAmount)
  })
  test.todo("borrower creates a loan request after a completed loan")
  test.todo("borrower creates a loan request after a withdrawn loan-request")
})

describe("Loan Request Creation fails, if...", () => {
  test.todo("...creator is incorrect user type")
  test.todo("...borrower already has an active loan")
  test.todo("...borrower already has an active request")
})
