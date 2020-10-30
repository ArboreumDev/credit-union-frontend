import DbClient from "gql/db_client"
import { IncomingHttpHeaders } from "http"
import { LogEventTypes, SLACK_WEBHOOK_URL } from "lib/constant"
import { Session } from "lib/types"
import { Fetcher } from "./api"

export const PostToSlack = async (message: string, env?: string) => {
  const response = new Fetcher().post(SLACK_WEBHOOK_URL, {
    text: `[${env ?? process.env.ENVIRONMENT}] ${message}`,
  })
}

export default async function log(message: string, env?: string) {
  env = env ?? process.env.ENVIRONMENT
  env === "production" && (await PostToSlack(message))
  env === "preview" && console.log(message)
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
