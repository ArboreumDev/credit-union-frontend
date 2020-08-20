import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { EDGE_STATUS } from "../../src/utils/types"
import { BASIC_NETWORK } from "./fixtures"
import { addNetwork } from "../../src/utils/network_helpers"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk

beforeAll(async () => {
  client = initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL)
  sdk = getSdk(client)
  await sdk.ResetDB()
})

describe("An entire network can be added from a fixture", () => {
  beforeAll(async () => {
    await addNetwork(sdk, BASIC_NETWORK)
  })

  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("users from fixture have been added", async () => {
    const { user } = await sdk.GetAllUsers()
    let usermails = user.map((x) => x.email)
    Object.values(BASIC_NETWORK.nodes).forEach((user) => {
      expect(usermails).toContain(user.email)
    })
  })

  test("all edges have been added", async () => {
    const { edges } = await sdk.GetEdgesByStatus({ status: EDGE_STATUS.active })
    expect(edges.length).toBe(BASIC_NETWORK.edges.length)
  })
})
