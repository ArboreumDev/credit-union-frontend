import { MIN_SUPPORT_RATIO } from "lib/constant"
import { LoanRequestStatus } from "lib/types"
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
    const res = await dbClient.calculateLoanRequestOffer(requestId)
    expect(res.loan_request_info.request_id).toBe(requestId)
    expect(res).toHaveProperty("corpus_share")
    expect(res.corpus_share).toBe(1)
    expect(res).toHaveProperty("loan_info.borrower_apr")
  })

  test("Any pledge that brings support above 20%, triggers a loan offer and advances the loan state", async () => {
    await addAndConfirmSupporter(
      sdk,
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
    const loanOffer = loanRequest.risk_calc_result.latestOffer
    expect(loanOffer.loan_info.amount).toBe(amount)
    expect(loanOffer.corpus_share).toBe(1 - MIN_SUPPORT_RATIO)
    expect(loanOffer.loan_info.supporter_share).toBe(MIN_SUPPORT_RATIO)
  })
})
