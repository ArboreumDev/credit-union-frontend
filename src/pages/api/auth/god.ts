import DbClient from "gql/db_client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body
      const dbClient = new DbClient()
      const user = await dbClient.getUserByEmail(data.email)
      if (user) res.status(200).json({ user: user })
      else res.status(200).json({ user: { email: data.email } })
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
