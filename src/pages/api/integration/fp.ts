import { DbClient } from "gql/db_client"
import { LogEventTypes } from "lib/constant"
import { LogEvent } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"

const dbClient = new DbClient()

export default async function FPPushHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const eventData: LogEvent = {
        eventType: LogEventTypes.FPPush,
        data: req.body,
      }
      const data = await dbClient.logEvent(eventData, req.headers)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
