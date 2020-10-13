import DbClient from "gql/db_client"
import { IncomingHttpHeaders } from "http"
import { LogEventTypes } from "lib/constant"
import { Session } from "lib/types"
import { PostToSlack } from "pages/api/upload"

export default async function log(message) {
  if (process.env.ENVIRONMENT) await PostToSlack(message)
}

export async function logEvent(
  session: Session,
  payload: {
    eventType: LogEventTypes
    eventData: any
  },
  headers: IncomingHttpHeaders,
  dbClient: DbClient
) {
  const userId =
    session && session.user && session.user.id ? session.user.id : null
  const { eventType, eventData } = payload
  log(
    `Event: ${eventType} | ${
      session?.user?.name || "Anonymous"
    } | ${JSON.stringify(eventData)}`
  )
  return dbClient.logEvent(eventType, eventData, headers, userId)
}
