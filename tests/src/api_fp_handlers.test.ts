import { GraphQLClient } from "graphql-request"
import { NextApiRequest, NextApiResponse } from "next"
import httpMocks from "node-mocks-http"
import { DbClient } from "../../src/gql/db_client"
import { initializeGQL } from "../../src/gql/graphql_client"
import { Sdk } from "../../src/gql/sdk"
import { LogEventTypes } from "../../src/lib/constant"
import { LogEvent } from "../../src/lib/types"
import FPPushHandler from "../../src/pages/api/integration/fp"

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
    const event: LogEvent = {
      eventType: LogEventTypes.FPPush,
      data: {
        test: "data",
      },
    }
    const req = httpMocks.createRequest<NextApiRequest>({
      body: { payload: event },
      headers: {
        ip: "10.0.0.1",
      },
    })
    const res = httpMocks.createResponse<NextApiResponse>()

    const data = await FPPushHandler(req, res)
    console.log(data)
  })
})
