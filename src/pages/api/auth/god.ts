import DbClient from "gql/db_client"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"

export const getGodSession = async (email) => {
  const dbClient = new DbClient()
  const user = await dbClient.getUserByEmail(email)
  if (user) return { user }
  else return { user: { email } }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body
      const session = await getGodSession(data.email)
      res.status(200).json(session)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
