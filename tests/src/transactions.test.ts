import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { LENDER1, BORROWER1, LENDER2, EDGE1, EDGE2 } from "./fixtures"
import { TransactionStatus } from "../../src/utils/types"
import { getUserPortfolio } from "./test_helpers"
import { DbClient } from "../../src/gql/db_client"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  sdk = getSdk(client)
  await sdk.ResetDB()
  dbClient = new DbClient(sdk, client)
  await sdk.CreateUser({ user: LENDER1 })
  await sdk.CreateUser({ user: BORROWER1 })
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("User initiated balance-updates (transaction comes first)", () => {
  // some changes to the user balance will be triggered from the outside,
  // e.g. by our financial service provider telling us that the user withdrew some
  // money or because the user deposited some money
  test("deposit cash", async () => {
    const amount = 10
    const { transaction } = await dbClient.instantBalanceUpdateWithTransaction(
      LENDER1.id,
      amount,
      "deposit"
    )

    expect(transaction.status).toBe(TransactionStatus.confirmed)
    const { user } = await sdk.GetAllUsers()
    expect(user.filter((x) => x.id === LENDER1.id)[0].balance).toBe(
      LENDER1.balance + amount
    )
  })

  test("withdrawing cash", async () => {
    const { transaction } = await dbClient.instantBalanceUpdateWithTransaction(
      BORROWER1.id,
      BORROWER1.balance,
      "withdraw"
    )

    expect(transaction.status).toBe(TransactionStatus.confirmed)
    expect(transaction.amount).toBe(BORROWER1.balance * -1)
    const { user } = await sdk.GetAllUsers()
    expect(user.filter((x) => x.id === BORROWER1.id)[0].balance).toBe(0)
  })
})

describe.skip("Arboreum initiated balance updates", () => {
  // sometimes we want to change the balances of our users. Before we can change them,
  // we store the would-be changes in a transaction and request our financial service provider
  // to fulfill those changes. Once they confirm those, we can then initiate the corresponding
  // balance updates
})
