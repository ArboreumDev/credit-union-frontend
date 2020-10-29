import DbClient from "gql/db_client"
import { NextApiRequest, NextApiResponse } from "next"

const dbClient = new DbClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allUsers = await dbClient.allUsers
  res.status(200).json(allUsers)
}
