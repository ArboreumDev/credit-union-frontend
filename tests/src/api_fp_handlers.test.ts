import { GraphQLClient } from "graphql-request"
import { NextApiRequest } from "next"
import httpMocks from "node-mocks-http"
import { FPPushHandler } from "pages/api/integration/fp"
import { DbClient } from "../../src/gql/db_client"
import { initializeGQL } from "../../src/gql/graphql_client"
import { Sdk } from "../../src/gql/sdk"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  dbClient = new DbClient(client)
  sdk = dbClient.sdk
  await sdk.ResetDB()
})

describe("Create new fp push event", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("push", async () => {
    const fpPushData: any = {
      key: "value",
    }
    const req = httpMocks.createRequest<NextApiRequest>({
      body: fpPushData,
      headers: {
        ip: "10.0.0.1",
      },
    })

    const event = await FPPushHandler(req)
    expect(event.data.key === fpPushData.key)
  })
})
