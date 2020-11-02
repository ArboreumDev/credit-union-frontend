import { LogEventTypes } from "lib/constant"
import { logEvent } from "lib/logger"
import { dbClient, sdk } from "./common/utils"

beforeAll(async () => {
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
