import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import {
  createFundedLoan,
  createLoanRequest,
} from "../../src/common/test_helpers"
import { Loan_Request_State_Enum } from "gql/sdk"
import { uuidv4 } from "lib/helpers"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Update Requests", () => {
  let requestId
  beforeEach(async () => {
    requestId = await createLoanRequest(
      BORROWER1.id,
      dbClient,
      loanAmount,
      "Food"
    )
  })
  afterEach(async () => {
    await sdk.ResetRequests()
    await sdk.ResetLoans()
  })
  const loanAmount = 1000

  test("Processing Open Requests starts new loans", async () => {
    const loansBefore = await sdk.GetLiveLoans()
    const requestBefore = await sdk.GetLoanRequest({ requestId })
    expect(requestBefore.loanRequest.state).toBe(Loan_Request_State_Enum.Active)

    // fund the lender from the master wallet
    // await sdk.ChangeUserCashBalance({
    //   userId: LENDER1.id,
    //   delta: loanAmount,
    // })
    const { user } = await dbClient.sdk.GetAccountDetails({ id: LENDER1.id })
    await dbClient.circleClient.fundFromMasterWallet(
      user.account_details.circle.walletId,
      loanAmount,
      uuidv4()
    )

    await sdk.ApproveBorrower({
      creditLine: { borrower_id: BORROWER1.id, investor_id: LENDER1.id },
    })
    await dbClient.processOpenRequests()

    const loansAfter = await sdk.GetLiveLoans()
    expect(loansAfter.loans.length).toBe(loansBefore.loans.length + 1)
    expect(loansAfter.loans[0].borrowerInfo.id).toBe(BORROWER1.id)

    const requestAfter = await sdk.GetLoanRequest({ requestId })
    expect(requestAfter.loanRequest.state).toBe(
      Loan_Request_State_Enum.Fulfilled
    )
  })
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

  test("CompoundUpdate registers", async () => {
    const before = await sdk.GetUpdates()
    await dbClient.doCompoundingUpdates()
    const after = await sdk.GetUpdates()
    expect(before.updates.length).toBe(after.updates.length - 1)
  })
})
