import { Loan_State_Enum } from "../../../src/gql/sdk"
import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import { createFundedLoan } from "../../src/common/test_helpers"
import { uuidv4, sleep } from "lib/helpers"

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

  test("Repay an existing loan ", async () => {
    // preconditions
    const updateBefore = await sdk.GetUpdates()
    const balanceBefore = await dbClient.circleClient.getBalance(
      LENDER1.account_details.circle.walletId
    )
    const { loan } = await sdk.GetLoan({ loanId })
    expect(loan.repayments.length).toBe(0)

    // make a repayment into the loan-wallet from master wallet
    const data = await dbClient.circleClient.fundFromMasterWallet(
      loan.wallet_id,
      loanAmount,
      uuidv4()
    )
    await sleep(3000)
    expect((await dbClient.circleClient.getTransferById(data.id)).status).toBe(
      "complete"
    )

    // trigger it to be processed
    await dbClient.processRepayments()

    // verify
    const after = await sdk.GetLoan({ loanId })
    expect(after.loan.state).toBe(Loan_State_Enum.Repaid)
    expect(after.loan.principal_remaining).toBe(0)

    expect(after.loan.repayments.length).toBe(1)
    expect(after.loan.repayments[0].repaid_principal).toBe(loanAmount)

    const balanceAfter = await dbClient.circleClient.getBalance(
      LENDER1.account_details.circle.walletId
    )
    expect(balanceAfter).toBe(balanceBefore + loanAmount)

    const updateAfter = await sdk.GetUpdates()
    expect(updateBefore.updates.length).toBe(updateAfter.updates.length - 1)
  }, 9000)

  test.todo("borrower creates a loan request after a completed loan")
  test.todo("borrower creates a loan request after a withdrawn loan-request")
})

describe("Loan Request Creation fails, if...", () => {
  test.todo("...creator is incorrect user type")
  test.todo("...borrower already has an active loan")
  test.todo("...borrower already has an active request")
})
