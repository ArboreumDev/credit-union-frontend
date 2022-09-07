import { EDGE_STATUS, RoI, APRInfo, PaidRemain } from "../../src/lib/types"
import {
  BORROWER1,
  EDGE1,
  EDGE2,
  LENDER1,
  LENDER2,
} from "../fixtures/basic_network"
import { dbClient, sdk } from "./common/utils"
import { getUserPortfolio } from "./common/test_helpers"

// const ZERO_PAID_REMAIN = new PaidRemain({paid:0, remain:0})
// const ZERO1_PAID_REMAIN = new PaidRemain(0, 0)
const ZERO_PAID_REMAIN = { paid: 0, remain: 0 }

const NO_ROI = {
  total_apr: {
    apr: 0,
    interest: ZERO_PAID_REMAIN,
    principal: ZERO_PAID_REMAIN,
  },
  apr_on_pledges: {},
  apr_on_loans: {},
}

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Adding users and connections", () => {
  test("add users", async () => {
    await sdk.CreateUser({ user: LENDER1 })
    await sdk.CreateUser({ user: LENDER2 })
    await sdk.CreateUser({ user: BORROWER1 })

    const allUsers = await dbClient.allUsers

    expect(allUsers.length).toBe(3)
  })

  test("get user by email", async () => {
    const user = await dbClient.getUserByEmail(LENDER1.email)
    expect(user.id === LENDER1.id)
    expect(user.balance === 0)
  })

  describe("Setting and updating user balances", () => {
    test("changing the balance of one account", async () => {
      await sdk.ChangeUserCashBalance({ userId: LENDER1.id, delta: 42 })
      const allUsers = await dbClient.allUsers
      expect(allUsers.filter((x) => x.id === LENDER1.id)[0].balance).toBe(1042)
    })
    test.todo("batch updates to multiple accounts")
    test.todo("batch updates fail if one update is invalid")
    test.todo("multiple updates to the same account are taken together")
  })
})
