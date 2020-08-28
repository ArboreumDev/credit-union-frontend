import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { EDGE_STATUS } from "../../src/utils/types"
import { BASIC_NETWORK } from "../fixtures/basic_network"
import { addNetwork, setupScenario } from "../../src/utils/network_helpers"
const basicCorpus = require("../fixtures/basicCorpus.json")

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

describe("An entire network can be added from a fixture", () => {
  beforeAll(async () => {
    await addNetwork(sdk, BASIC_NETWORK)
  })

  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("users from fixture have been added", async () => {
    const { user } = await sdk.GetAllUsers()
    const usermails = user.map((x) => x.email)
    Object.values(BASIC_NETWORK.nodes).forEach((user) => {
      expect(usermails).toContain(user.email)
    })
  })

  test("all edges have been added", async () => {
    const { edges } = await sdk.GetEdgesByStatus({ status: EDGE_STATUS.active })
    expect(edges.length).toBe(BASIC_NETWORK.edges.length)
  })
})

describe("An entire network can be added from a JSON output by the simulator", () => {
  beforeAll(async () => {
    await sdk.ResetDB()
  })

  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("add scenraio", async () => {
    await setupScenario(sdk, "basicCorpus")
  })
})
