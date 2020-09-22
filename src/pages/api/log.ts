import { DbClient } from "gql/db_client"
import { NextApiRequest, NextApiResponse } from "next"

export async function LogPushHandler(req: NextApiRequest) {
  const dbClient = new DbClient()
  const { eventType, eventData } = req.body

  return dbClient.logEvent(eventType, eventData, req.headers)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dbClient = new DbClient()
    try {
      const data = await LogPushHandler(req)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
