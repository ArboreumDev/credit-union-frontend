import { DbClient } from "../../src/gql/db_client"
import { GraphQLClient } from "graphql-request"
import { initializeGQL } from "../../src/gql/graphql_client"
import { Sdk } from "../../src/gql/sdk"
import { LogEventTypes } from "../../src/lib/constant"
import { LogEvent } from "../../src/lib/types"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  dbClient = new DbClient(client)
})

describe("Create new event", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new log event", async () => {
    const event: LogEvent = {
      eventType: LogEventTypes.ClientLog,
      data: {
        userId: "UserId",
        test: "test",
      },
    }
    const headers = {
      IP: "10.0.0.1",
    }

    const res = await dbClient.logEvent(event, headers)
    expect(res.event.data.userId === event.data.userId)
    expect(res.headers.IP === headers.IP)
  })
})
