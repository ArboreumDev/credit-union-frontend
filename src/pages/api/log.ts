import { DbClient } from "gql/db_client"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"

export async function LogPushHandler(req: NextApiRequest) {
  const session = (await getSession({ req })) as Session

  const dbClient = new DbClient()
  const { eventType, eventData } = req.body
  const userId =
    session && session.user && session.user.id ? session.user.id : null
  return dbClient.logEvent(eventType, eventData, req.headers, userId)
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
