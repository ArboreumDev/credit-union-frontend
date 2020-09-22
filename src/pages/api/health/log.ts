import { DbClient } from "gql/db_client"
import { NextApiRequest, NextApiResponse } from "next"

const dbClient = new DbClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const d = await dbClient.logEvent(req.body, req.headers)
  res.status(200).json({ status: "OK", data: d })
}
