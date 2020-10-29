import { LogEventTypes } from "../../src/lib/constant"
import { BORROWER1 } from "../fixtures/basic_network"
import { dbClient, sdk } from "./common/utils"

describe("Create new event", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new log event", async () => {
    const data = {
      test: "test",
    }
    const headers = {
      IP: "10.0.0.1",
    }

    const res = await dbClient.logEvent(LogEventTypes.ClientLog, data, headers)
    expect(res.headers.IP === headers.IP)
  })
})

describe("Create feedback", () => {
  const message = "hi"
  const data = {
    message: message,
  }
  const headers = {
    IP: "10.0.0.1",
  }
  const eventType = LogEventTypes.ClientFeedback

  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new log event", async () => {
    const res = await dbClient.logEvent(eventType, data, headers)
    expect(res.headers.IP === headers.IP)
    expect(res.data.message === message)
    expect(res.event_type === eventType)
  })

  test("new log event with user_id", async () => {
    await sdk.CreateUser({ user: BORROWER1 })
    const res = await dbClient.logEvent(eventType, data, headers, BORROWER1.id)
    expect(res.user.id === BORROWER1.id)
  })
})
