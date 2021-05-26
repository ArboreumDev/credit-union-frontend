import { MIN_SUPPORT_RATIO } from "lib/constant"
import { Loan_Request_State_Enum } from "../../../src/gql/sdk"
import { BORROWER1, SUPPORTER1 } from "../../fixtures/basic_network"
import { dbClient, sdk } from "../common/utils"

beforeAll(async () => {
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Loan Request Success Flow", () => {
  const amount = 100
  let requestId: string

  test("Create new loan request", async () => {
    const purpose = "go see the movies"
    const { loanRequest } = await dbClient.createLoanRequest(
      BORROWER1.id,
      amount,
      purpose
    )
    requestId = loanRequest.request_id
    expect(loanRequest.amount).toBe(amount)
    expect(loanRequest.purpose).toBe(purpose)
    expect(loanRequest.state).toBe(Loan_Request_State_Enum.Active)
  })
  test.todo("borrower creates a loan request after a completed loan")
  test.todo("borrower creates a loan request after a withdrawn loan-request")
})
describe("Loan Request Creation fails, if...", () => {
  test.todo("...creator is incorrect user type")
  test.todo("...borrower already has an active loan")
  test.todo("...borrower already has an active request")
})
