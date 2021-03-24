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

describe.skip("Loan Request Flow", () => {
  const amount = 100
  let requestId: string

  test("New loan request", async () => {
    const purpose = "go see the movies"
    const { loanRequest } = await dbClient.createLoanRequest(
      BORROWER1.id,
      amount,
      purpose
    )

    requestId = loanRequest.request_id
    expect(loanRequest.amount).toBe(amount)
    expect(loanRequest.purpose).toBe(purpose)
    expect(loanRequest.status).toBe(LoanRequestStatus.initiated)
    expect(loanRequest.risk_calc_result).toBeUndefined
  })

  test("When a supporter confirms and the total support amount is below 20%, no loan offer is made", async () => {
    await sdk.CreateUser({ user: SUPPORTER1 })
    await addAndConfirmSupporter(
      dbClient,
      requestId,
      SUPPORTER1.id,
      (amount * MIN_SUPPORT_RATIO) / 2
    )
    const { loanRequest } = await sdk.GetLoanRequest({
      requestId: requestId,
    })
    expect(loanRequest.risk_calc_result).toBeUndefined
  })
})
