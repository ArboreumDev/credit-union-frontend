import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import { createFundedLoan } from "../../src/common/test_helpers"
import { loanToTerms } from "lib/loan_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Update Loans", () => {
  const lenderDeposit = 2000
  const loanAmount = 1000
  let loanId: string

  beforeEach(async () => {
    const res = await createFundedLoan(
      BORROWER1.id,
      dbClient,
      LENDER1.id,
      lenderDeposit,
      loanAmount,
      "repay tests"
    )
    loanId = res.loanId
  })

  afterEach(async () => {
    await sdk.ResetLoans()
    await sdk.ResetRepayments()
  })
  test("interest increases after compounding period passes", async () => {
    const { loan } = await sdk.GetLoan({ loanId })
    const loanBefore = await dbClient.swarmAIClient.getLoanState(
      loanToTerms(loan),
      []
    )
    // create a utc timezone datetime 31 days in the future
    const date = new Date()
    date.setDate(date.getDate() + loan.compounding_frequency + 1)

    const loanAfter = await dbClient.swarmAIClient.getLoanState(
      loanToTerms(loan),
      [],
      date.toISOString()
    )
    expect(loanAfter.interest_accrued).toBeGreaterThan(
      loanBefore.interest_accrued
    )
  })
})
