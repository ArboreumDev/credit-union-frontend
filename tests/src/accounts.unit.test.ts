import { EDGE_STATUS } from "../../src/lib/types"
import {
  BORROWER1,
  EDGE1,
  EDGE2,
  LENDER1,
  LENDER2,
} from "../fixtures/basic_network"
import { dbClient, sdk } from "./common/utils"
import { getUserPortfolio } from "./common/test_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Adding users and connections", () => {
  test("add users", async () => {
    // add users
    await sdk.CreateUser({ user: LENDER1 })
    await sdk.CreateUser({ user: LENDER2 })
    await sdk.CreateUser({ user: BORROWER1 })

    const allUsers = await dbClient.allUsers

    expect(allUsers.length).toBe(3)
  })

  test("get user by email", async () => {
    // add users
    const user = await dbClient.getUserByEmail(LENDER1.email)
    expect(user.id === LENDER1.id)
  })

  describe("Setting and updating user balances", () => {
    let balancesAfter
    let balancesBefore

    test("changing the balance of one account", async () => {
      await sdk.ChangeUserCashBalance({ userId: LENDER1.id, delta: 42 })
      const allUsers = await dbClient.allUsers
      expect(allUsers.filter((x) => x.id === LENDER1.id)[0].balance).toBe(1042)
    })
    test("batch updates to multiple accounts", async () => {
      // moving 41 from lender1 to lender lender2
      const VALID_UPDATES1 = [
        {
          userId: LENDER1.id,
          balanceDelta: -41,
          shareDelta: 0,
        },
        {
          userId: LENDER2.id,
          balanceDelta: 41,
          shareDelta: 0,
        },
      ]
      await dbClient.updatePortfolios(VALID_UPDATES1)

      const allUsers = await dbClient.allUsers
      expect(allUsers.filter((x) => x.id === LENDER1.id)[0].balance).toBe(1001)
      expect(allUsers.filter((x) => x.id === LENDER2.id)[0].balance).toBe(
        LENDER2.balance + 41
      )
    })

    test.skip("batch updates fail if one update is invalid", async () => {
      const allUsers = await dbClient.allUsers
      balancesBefore = getUserPortfolio(allUsers)

      // all tx's fail if one update woudl reduce the user balance below 0
      const INVALID_UPDATES = [
        {
          userId: LENDER1.id,
          balanceDelta: -100000,
          shareDelta: 0,
          alias: "lender1",
        },
        {
          userId: LENDER2.id,
          balanceDelta: 41,
          shareDelta: 0,
          alias: "lender2",
        },
      ]

      const result = await dbClient.updatePortfolios(INVALID_UPDATES)
      expect(result).toHaveProperty("ERROR")

      // all balances should be the same as before
      const balancesAfter = getUserPortfolio(allUsers)
      expect(balancesBefore).toStrictEqual(balancesAfter)
    })

    test("multiple updates to the same account are taken together", async () => {
      let allUsers = await dbClient.allUsers
      balancesBefore = getUserPortfolio(allUsers)
      const VALID_UPDATES2 = [
        {
          userId: LENDER1.id,
          balanceDelta: -100010,
          shareDelta: 0,
          alias: "firstTx",
        },
        {
          userId: LENDER1.id,
          balanceDelta: +100000,
          shareDelta: 0,
          alias: "secondTx",
        },
      ]
      // even though the first updates reduces the user balance below 0, the tx go trough
      // because the second add enough to be net positive
      await dbClient.updatePortfolios(VALID_UPDATES2)

      allUsers = await dbClient.allUsers
      balancesAfter = getUserPortfolio(allUsers)
      expect(balancesAfter[LENDER1.id].cash).toBe(
        balancesBefore[LENDER1.id].cash - 10
      )
    })
  })
})
