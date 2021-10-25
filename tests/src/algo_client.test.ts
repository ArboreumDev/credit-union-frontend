// import { BORROWER1, LENDER1 } from "../../fixtures/basic_network"
import { sdk, algoClient, dbClient } from "../src/common/utils"
import { BORROWER1, LENDER1 } from "../fixtures/basic_network"
import {
  DEFAULT_APR,
  DEFAULT_LOAN_TENOR,
  DEFAULT_PENALTY_APR,
  COMPOUNDING_FREQ,
} from "lib/constant"
import {requestToTokenMetadataParams} from "lib/loan_helpers"
import { uuidv4 } from "lib/helpers"
// import { createFundedLoan } from "../../src/common/test_helpers"
// import { loanToTerms } from "lib/loan_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
//   await sdk.CreateUser({ user: LENDER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Tokenize Loan", () => {
  const lenderDeposit = 2000
  const loanAmount = 1000
  let loanId: string

  test("Loan can be tokenized", async () =>{
    const purpose = "go see the movies"
    const res = await dbClient.createLoanRequest(
      BORROWER1.id,
      loanAmount,
      purpose
    )
    const {loanRequest} = await sdk.GetLoanRequest({requestId: res.loanRequest.request_id})
    const newLoanId = uuidv4()
    const terms = {
      apr: DEFAULT_APR,
      principal: loanRequest.amount,
      tenorInDays: DEFAULT_LOAN_TENOR,
      startDate: Math.floor( Date.now() / 1000),
      compoundingFrequency: "daily",
    }

    const loanParams = requestToTokenMetadataParams(newLoanId, loanRequest, terms)
    const {assetId, txId} = await algoClient.tokenizeLoan(loanParams)
    expect(assetId).toBeTruthy
    expect(txId).toBeTruthy
  }, 10000 )
})
