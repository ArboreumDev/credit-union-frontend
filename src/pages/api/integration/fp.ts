import { DbClient } from "gql/db_client"
import { LogEventTypes } from "lib/constant"
import { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
}

export async function FPPushHandler(req: NextApiRequest) {
  const dbClient = new DbClient()
  return dbClient.logEvent(LogEventTypes.FPPush, req.body, req.headers)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = await FPPushHandler(req)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
