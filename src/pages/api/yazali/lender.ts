import DbClient from "gql/db_client"
import { fetchJSON } from "lib/api"
import { logEvent } from "lib/logger"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { lenderId } = req.body
    try {
      const url = "http://app.arbo.link:8000/lender/" + lenderId
      const data = await fetchJSON({ url })
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
