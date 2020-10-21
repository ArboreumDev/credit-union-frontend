import { MIN_SUPPORT_RATIO } from "lib/constant"
import { LoanRequestStatus } from "lib/types"
import { BORROWER1, SUPPORTER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"
import { addAndConfirmSupporter } from "../common/test_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Loan Request Flow", () => {
  const amount = 100
  let requestId: string

  test("New loan request", async () => {
    const purpose = "go see the movies"
    const { request } = await dbClient.createLoanRequest(
      BORROWER1.id,
      amount,
      purpose
    )
    // const request = data.update_loan_requests_by_pk
    requestId = request.request_id
    expect(request.amount).toBe(amount)
    expect(request.purpose).toBe(purpose)
    expect(request.status).toBe(LoanRequestStatus.initiated)
    expect(request.risk_calc_result.latestOffer).toBeUndefined
  })

  test("When a supporter confirms and the total support amount is below 20%, no loan offer is made", async () => {
    await sdk.CreateUser({ user: SUPPORTER1 })
    await addAndConfirmSupporter(
      sdk,
      dbClient,
      requestId,
      SUPPORTER1.id,
      (amount * MIN_SUPPORT_RATIO) / 2
    )
    const { loanRequest } = await sdk.GetLoanRequest({
      requestId: requestId,
    })
    expect(loanRequest.risk_calc_result.latestOffer).toBeUndefined
  })
})
