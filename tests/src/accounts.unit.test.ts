import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { LENDER1, BORROWER1, LENDER2, EDGE1, EDGE2} from "./fixtures"
import { EDGE_STATUS } from "../../src/utils/types"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  sdk = getSdk(client)
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Adding users and connections", () => {
  test("add users", async () => {
    // add users
    await sdk.CreateUser({user: LENDER1})
    await sdk.CreateUser({user: LENDER2})
    await sdk.CreateUser({user: BORROWER1})

    const { user } = await sdk.GetAllUsers()

    expect(user.length).toBe(3)
  })

  test("add edges", async () => {
    await sdk.InsertEdge({ edge: EDGE1 })
    await sdk.InsertEdge({ edge: EDGE2 })

    const { edges } = await sdk.GetEdgesByStatus({status: EDGE_STATUS.active})
    expect(edges.length).toBe(2)
  })
})