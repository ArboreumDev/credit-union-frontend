import { Loan_Request_State_Enum, Loan_State_Enum } from "../../../src/gql/sdk"
import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import { createLoanRequest, optInTestAccount } from "../../src/common/test_helpers"
import { uuidv4 } from "lib/helpers"
import AlgoClient from "gql/algo_client"


const ALGORAND_BLOCK_TIMEOUT  = 12000

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
  let borrowerAlgoAddress: string

  beforeEach(async () => {
    requestId = await createLoanRequest(BORROWER1.id, dbClient, loanAmount)
    const { user } = await sdk.GetAccountDetails({ id: LENDER1.id })
    await dbClient.circleClient.fundFromMasterWallet(
      user.account_details.circle.walletId,
      lenderDeposit,
      uuidv4()
    )
    const res = await optInTestAccount(dbClient, BORROWER1.email)
    borrowerAlgoAddress = res.user.account_details.algorand.address
  }, ALGORAND_BLOCK_TIMEOUT * 2)

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
    expect(newLoan.asset_id).toBeTruthy

    expect(amountsLent.returning[0].lender_id).toBe(LENDER1.id)
    expect(amountsLent.returning[0].amount_lent).toBe(loanAmount)

    const balanceAfter = await dbClient.getCircleBalance(LENDER1.id)
    expect(balanceAfter).toBe(balanceBefore - loanAmount)
   
    
    // verify it has been written to the local state of the user
    const res = await dbClient.algoClient.getLocalState(borrowerAlgoAddress)
    expect(res.state.credit).toBeTruthy

    const state = JSON.parse(res.state.credit)
    expect(state.loanState).toBe('live')
    expect(state.activeLoan).toBe(newLoan.asset_id)
    
  }, ALGORAND_BLOCK_TIMEOUT * 2)
  test.todo("borrower creates a loan request after a completed loan")
  test.todo("borrower creates a loan request after a withdrawn loan-request")
})

describe("Loan Request Creation fails, if...", () => {
  test.todo("...creator is incorrect user type")
  test.todo("...borrower already has an active loan")
  test.todo("...borrower already has an active request")
})