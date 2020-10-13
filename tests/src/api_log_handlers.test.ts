import { GraphQLClient } from "graphql-request"
import { LogEventTypes } from "lib/constant"
import { logEvent } from "lib/logger"
import DbClient from "../../src/gql/db_client"
import { initializeGQL } from "../../src/gql/graphql_client"
import { Sdk } from "../../src/gql/sdk"
import { BORROWER1 } from "../fixtures/basic_network"
import { getMockSession } from "../fixtures/session"

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

describe("Create new log event", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("push", async () => {
    const feedbackEvent: any = {
      eventType: LogEventTypes.ClientFeedback,
      eventData: {
        message: "hi its nice",
      },
    }
    const session = null //getMockSession(BORROWER1)

    const event = await logEvent(session, feedbackEvent, {}, dbClient)
    expect(event.data.message === feedbackEvent.eventData.message)
  })
})
