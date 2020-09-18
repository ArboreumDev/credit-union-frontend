import { DbClient } from "gql/db_client"
import { NextApiRequest, NextApiResponse } from "next"

const dbClient = new DbClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const d = await dbClient.sdk.InsertEvent({
      event: {
        headers: req.headers,
        event: req.body,
      },
    })
    res.status(200).json({ status: "OK", data: d })
  }
}
