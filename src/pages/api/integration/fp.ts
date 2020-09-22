import { DbClient } from "gql/db_client"
import { LogEventTypes } from "lib/constant"
import { LogEvent } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"

export async function FPPushHandler(req: NextApiRequest) {
  const dbClient = new DbClient()

  const eventData: LogEvent = {
    eventType: LogEventTypes.FPPush,
    data: req.body,
  }
  return dbClient.logEvent(eventData, req.headers)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dbClient = new DbClient()
    try {
      const data = await FPPushHandler(req)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
