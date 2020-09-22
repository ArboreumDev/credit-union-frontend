import { DbClient } from "../../src/gql/db_client"
import { GraphQLClient } from "graphql-request"
import { initializeGQL } from "../../src/gql/graphql_client"
import { Sdk } from "../../src/gql/sdk"
import { LogEventTypes } from "../../src/lib/constant"
import { LogEvent } from "../../src/lib/types"
import { BORROWER1 } from "../fixtures/basic_network"

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
})

describe("Create new event", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new log event", async () => {
    const event: LogEvent = {
      eventType: LogEventTypes.ClientLog,
      data: {
        test: "test",
      },
    }
    const headers = {
      IP: "10.0.0.1",
    }

    const res = await dbClient.logEvent(event, headers)
    expect(res.headers.IP === headers.IP)
  })
})

describe("Create feedback", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new log event", async () => {
    const message = "hi"
    const event: LogEvent = {
      eventType: LogEventTypes.ClientFeedback,
      data: {
        message: message,
      },
    }
    const headers = {
      IP: "10.0.0.1",
    }

    const res = await dbClient.logEvent(event, headers)
    expect(res.headers.IP === headers.IP)
    expect(res.event.data.message === message)
  })

  test("new log event with session", async () => {
    await sdk.CreateUser({ user: BORROWER1 })
    const message = "hi"

    const event: LogEvent = {
      eventType: LogEventTypes.ClientFeedback,
      data: {
        message: message,
      },
    }
    const headers = {
      IP: "10.0.0.1",
    }

    const res = await dbClient.logEvent(event, headers, BORROWER1.id)
    expect(res.headers.IP === headers.IP)
    expect(res.event.data.message === message)
    expect(res.user.id === BORROWER1.id)
  })
})
