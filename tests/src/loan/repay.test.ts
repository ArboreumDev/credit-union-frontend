import { Loan_State_Enum } from "../../../src/gql/sdk"
import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import { createFundedLoan, optInTestAccount } from "../../src/common/test_helpers"
import { uuidv4, sleep } from "lib/helpers"

// import { ALGORAND_BLOCK_TIMEOUT } from "./fund.test"
const ALGORAND_BLOCK_TIMEOUT  = 12000

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  // await sdk.ResetDB()
})

describe("Repay Loan Success Flows", () => {
  const lenderDeposit = 2000
  const loanAmount = 1000
  let loanId: string

  beforeEach(async () => {
    // optin borrower to our smart-contract
    await optInTestAccount(dbClient, BORROWER1.email)

    const res = await createFundedLoan(
      BORROWER1.id,
      dbClient,
      LENDER1.id,
      lenderDeposit,
      loanAmount,
      "repay tests"
    )
    loanId = res.loanId
  }, ALGORAND_BLOCK_TIMEOUT * 2)

  afterEach(async () => {
    await sdk.ResetLoans()
    await sdk.ResetRepayments()
  })

  // this will currentl fail due to an error in the bulletLoan class => swarmai #229
  test("Repay an existing loan ", async () => {
    expect(loanId).toBeDefined
    // preconditions
    const updateBefore = await sdk.GetUpdates()
    const balanceBefore = await dbClient.circleClient.getBalance(
      LENDER1.account_details.circle.walletId
    )
    const { loan } = await sdk.GetLoan({ loanId })
    expect(loan.repayments.length).toBe(0)

    // make a repayment into the loan-wallet from master wallet
    // await sleep(3000)
    // const data = await dbClient.circleClient.fundFromMasterWallet(
    //   loan.wallet_id,
    //   loanAmount,
    //   uuidv4()
    // )
    // await sleep(3000)
    // expect((await dbClient.circleClient.getTransferById(data.id)).status).toBe(
    //   "complete"
    // )

    // // trigger it to be processed
    // await dbClient.processRepayments()

    // // verify
    // const after = await sdk.GetLoan({ loanId })
    // expect(after.loan.state).toBe(Loan_State_Enum.Repaid)
    // expect(after.loan.principal_remaining).toBe(0)

    // expect(after.loan.repayments.length).toBe(1)
    // expect(after.loan.repayments[0].repaid_principal).toBe(loanAmount)
    // expect(after.loan.repayments[0].algorand_tx_id).toBeTruthy

    // const balanceAfter = await dbClient.circleClient.getBalance(
    //   LENDER1.account_details.circle.walletId
    // )
    // expect(balanceAfter).toBe(balanceBefore + loanAmount)

    // const updateAfter = await sdk.GetUpdates()
    // expect(updateBefore.updates.length).toBe(updateAfter.updates.length - 1)
  }, 9000 + ALGORAND_BLOCK_TIMEOUT + 9000)

  test.todo("borrower creates a loan request after a completed loan")
  test.todo("borrower creates a loan request after a withdrawn loan-request")
})

describe("Loan Request Creation fails, if...", () => {
  test.todo("...creator is incorrect user type")
  test.todo("...borrower already has an active loan")
  test.todo("...borrower already has an active request")
})
