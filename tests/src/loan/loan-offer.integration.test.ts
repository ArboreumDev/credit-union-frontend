import { MIN_SUPPORT_RATIO } from "lib/constant"
import {
  LoanRequestStatus,
  LoanInfo,
  LoanOffer,
  SystemUpdate,
  LoanRequestInfo,
} from "lib/types"
import { BORROWER1, SUPPORTER2 } from "../../fixtures/basic_network"
import { addAndConfirmSupporter } from "../common/test_helpers"
import { dbClient, sdk } from "../common/utils"

const amount = 100
const purpose = "go see the movies"
let requestId: string

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: SUPPORTER2 })

  const { request } = await dbClient.createLoanRequest(
    BORROWER1.id,
    amount,
    purpose
  )
  requestId = request.request_id
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Loan Request Flow", () => {
  test("the swarmai module can respond to loan requests", async () => {
    const res: SystemUpdate = await dbClient.calculateLoanRequestOffer(
      requestId
    )
    const loan = res.loans.loan_offers[requestId]
    expect(loan.request_id).toBe(requestId)
    expect(loan.terms).toHaveProperty("corpus_share")
    expect(loan.terms.corpus_share).toBe(1)
    expect(loan).toHaveProperty("terms.borrower_apr")
  })

  test("a calculated offer is saved with the original request", async () => {
    const { request } = await dbClient.calculateAndUpdateLoanOffer(requestId)
    const loan_offer = request.risk_calc_result["latestOffer"] as LoanOffer
    const request_data = request.risk_calc_result[
      "requestData"
    ] as LoanRequestInfo
    expect(loan_offer.request_id).toBe(requestId)
    expect(loan_offer.terms).toHaveProperty("borrower_apr")
    expect(request_data.request_id).toBe(requestId)
  })

  test("Any pledge that brings support above 20%, triggers a loan offer and advances the loan state", async () => {
    await addAndConfirmSupporter(
      dbClient,
      requestId,
      SUPPORTER2.id,
      amount * MIN_SUPPORT_RATIO
    )
    const { loanRequest } = await sdk.GetLoanRequest({
      requestId: requestId,
    })

    // The AI has collected the input and stores possible terms of the loan in the db
    expect(loanRequest.status).toBe(
      LoanRequestStatus.awaiting_borrower_confirmation
    )

    // verify how the output of the optimizer is stored in DB:
    expect(loanRequest.risk_calc_result).toHaveProperty("latestOffer")
    const loanOffer = loanRequest.risk_calc_result.latestOffer as LoanOffer
    expect(loanOffer.terms.amount).toBe(amount)
    expect(loanOffer.terms.corpus_share).toBe(1 - MIN_SUPPORT_RATIO)
    expect(loanOffer.terms.supporter_share).toBe(MIN_SUPPORT_RATIO)
  })
})
