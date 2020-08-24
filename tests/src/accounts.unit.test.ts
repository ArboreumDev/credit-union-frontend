import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { LENDER1, BORROWER1, LENDER2, EDGE1, EDGE2 } from "./fixtures"
import { EDGE_STATUS } from "../../src/utils/types"
import {getUserPortfolio} from "./test_helpers"
import { DbClient } from "../../src/gql/db_client"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient


beforeAll(async () => {
  client = initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL)
  sdk = getSdk(client)
  await sdk.ResetDB()
  dbClient = new DbClient(TEST_ADMIN_SECRET, TEST_API_URL)
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

    const { user } = await sdk.GetAllUsers()

    expect(user.length).toBe(3)
  })

  test("add edges", async () => {
    await sdk.InsertEdge({ edge: EDGE1 })
    await sdk.InsertEdge({ edge: EDGE2 })

    const { edges } = await sdk.GetEdgesByStatus({ status: EDGE_STATUS.active })
    expect(edges.length).toBe(2)
  })

  describe("Setting and updating user balances", () => {
    let balancesAfter
    let balancesBefore

    test("setting the balance of one account", async () => {
      await sdk.SetUserCashBalance({userId: LENDER1.id, amount:42000})
      const {user} = await sdk.GetAllUsers()
      expect(user.filter(x => x.id === LENDER1.id)[0].balance).toBe(42000)
    })
    
    test("changing the balance of one account", async () => {
      await sdk.ChangeUserCashBalance({userId: LENDER1.id, delta:42})
      const {user} = await sdk.GetAllUsers()
      expect(user.filter(x => x.id === LENDER1.id)[0].balance).toBe(42042)
    })

    test("batch updates to multiple accounts", async () => {
      // moving 41 from lender1 to lender lender2
      const VALID_UPDATES1 = [
        {userId: LENDER1.id, balanceDelta: -41, shareDelta: 0, alias: "lender1"},
        {userId: LENDER2.id, balanceDelta: 41, shareDelta: 0, alias: "lender2"}
      ]
      await dbClient.updatePortfolios(VALID_UPDATES1)
      
      const {user} = await sdk.GetAllUsers()
      expect(user.filter(x => x.id === LENDER1.id)[0].balance).toBe(42001)
      expect(user.filter(x => x.id === LENDER2.id)[0].balance).toBe(LENDER2.balance + 41)
      
    })
    
    test("batch updates fail if one update is invalid", async () => {
      const {user} = await sdk.GetAllUsers()
      balancesBefore = getUserPortfolio(user)
      
      // all tx's fail if one update woudl reduce the user balance below 0
      const INVALID_UPDATES = [
        {userId: LENDER1.id, balanceDelta: -100000, shareDelta: 0, alias: "lender1"},
        {userId: LENDER2.id, balanceDelta: 41, shareDelta: 0, alias: "lender2"}
      ]
      
      const result = await dbClient.dryRunPortfolioUpdates(INVALID_UPDATES)
      expect(result.length).toBe(1)
      
      // all balances should be the same as before
      let balancesAfter = getUserPortfolio(user)
      expect(balancesBefore).toStrictEqual(balancesAfter)
    })

    test("multiple updates to the same account are taken together", async () => {
      const {user} = await sdk.GetAllUsers()
      balancesBefore = getUserPortfolio(user)
      const VALID_UPDATES2 = [
        {userId: LENDER1.id, balanceDelta: -100010, shareDelta: 0, alias: "firstTx"},
        {userId: LENDER1.id, balanceDelta: +100000, shareDelta: 0, alias: "secondTx"},
      ]
      // even though the first updates reduces the user balance below 0, the tx go trough
      // because the second add enough to be net positive
      await dbClient.updatePortfolios(VALID_UPDATES2)
      
      const after = await sdk.GetAllUsers()
      balancesAfter = getUserPortfolio(after.user)
      expect(balancesAfter[LENDER1.id].cash).toBe(balancesBefore[LENDER1.id].cash - 10)
    })
  })
})
