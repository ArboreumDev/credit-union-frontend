import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { DbClient } from "../../src/gql/db_client"
import { SupporterStatus } from "../../src/lib/types"
import {
  BASIC_NETWORK,
  BORROWER1,
  SUPPORTER1,
  SUPPORTER2,
} from "../fixtures/basic_network"
import { addNetwork } from "../../src/lib/network_helpers"
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
  const pledgeAmount1 = amount / 2
  const pledgeAmount2 = amount / 4
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
    await sdk.CreateUser({ user: SUPPORTER2 })
    await dbClient.addSupporters(
      request_id,
      [SUPPORTER1.id, SUPPORTER2.id],
      [pledgeAmount1, pledgeAmount2]
    )

    const { loanRequest } = await sdk.GetLoanRequest({ requestId: request_id })
    expect(loanRequest.supporters[0].supporter_id).toBe(SUPPORTER1.id)
    expect(loanRequest.supporters[0].status).toBe(SupporterStatus.unknown)
    expect(loanRequest.supporters[0].pledge_amount).toBe(pledgeAmount1)
  })

  test.skip("users can register supporters that are not on the network yet", async () => {
    // those should be put into the system by adding an edge of status unknown with the
    // other_user_mail field set to the other user
  })

  test("supporters see the request for a pledge with basic info in their dashboard", async () => {
    const user = await dbClient.getUserByEmail(SUPPORTER1.email)

    expect(user.pledge_requests[0].pledge_amount).toBe(pledgeAmount1)
    expect(user.pledge_requests[0].loan_request.user.email).toBe(
      BORROWER1.email
    )
    expect(user.pledge_requests[0].loan_request.user.name).toBe(BORROWER1.name)
    expect(user.pledge_requests[0].loan_request.amount).toBe(amount)
  })

  test("supporters can accept (or reject) a pledge-request", async () => {
    const { supporter } = await sdk.UpdateSupporter({
      request_id,
      supporter_id: SUPPORTER1.id,
      pledge_amount: 40,
      status: SupporterStatus.confirmed,
    })
    expect(supporter.status).toBe(SupporterStatus.confirmed)
    expect(supporter.pledge_amount).toBe(40)
  })

  test("only confirmed supporters are included in the loan-request-calculation", async () => {
    const { loan_request_info } = await dbClient.getSwarmAiInput(request_id)
    const loanSupporters = loan_request_info.supporters.map(
      (x) => x.supporter_id
    )
    expect(loanSupporters).toContain(SUPPORTER1.id)
    expect(loanSupporters).not.toContain(SUPPORTER2.id)
  })
})
