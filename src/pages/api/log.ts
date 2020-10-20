import DbClient from "gql/db_client"
import { logEvent } from "lib/logger"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dbClient = new DbClient()
    const session = (await getSession({ req })) as Session
    try {
      const data = await logEvent(session, req.body, req.headers, dbClient)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
