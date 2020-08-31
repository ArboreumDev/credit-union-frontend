import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { DbClient } from "../../src/gql/db_client"
import { SupporterStatus } from "../../src/utils/types"
import { BASIC_NETWORK, BORROWER1, SUPPORTER1 } from "../fixtures/basic_network"
import { addNetwork } from "../../src/utils/network_helpers"
import { getUserPortfolio } from "./test_helpers"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  sdk = getSdk(client)
  dbClient = new DbClient(client)
  await sdk.ResetDB()
})

afterAll(async () => {
  // reset
  await sdk.ResetDB()
})

describe("Basic loan request flow for an accepted loan", () => {
  const amount = 100
  const purpose = "go see another movie"
  let request_id: string
  let balancesBefore

  beforeAll(async () => {
    // add a basic network from a fixture and initialize pointers to
    // an exisiting borrower and two lenders
    await addNetwork(sdk, BASIC_NETWORK)
    const { user } = await sdk.GetAllUsers()
    balancesBefore = getUserPortfolio(user)
    const { request } = await dbClient.createLoanRequest(
      BORROWER1.id,
      amount,
      purpose
    )
    request_id = request.request_id
  })

  test("suppporters that exist on the network can be added to the loan", async () => {
    await sdk.CreateUser({ user: SUPPORTER1 })
    await dbClient.addSupporters(request_id, [SUPPORTER1.id], [amount / 2])

    const { loanRequest } = await sdk.GetLoanRequest({ requestId: request_id })
    expect(loanRequest.supporters[0].supporter_id).toBe(SUPPORTER1.id)
    expect(loanRequest.supporters[0].status).toBe(SupporterStatus.unknown)
    expect(loanRequest.supporters[0].amount).toBe(amount / 2)
  })

  test.skip("supporters see the request for a pledge in their dashboard", async () => {
    // TODO
  })

  test("supporters can accept (or reject) a pledge-request", async () => {
    // await dbClient.Upda
    const { supporter } = await sdk.UpdateSupporter({
      request_id,
      supporter_id: SUPPORTER1.id,
      amount: 40,
      status: SupporterStatus.confirmed,
    })
    expect(supporter.status).toBe(SupporterStatus.confirmed)
    expect(supporter.amount).toBe(40)
  })
})
