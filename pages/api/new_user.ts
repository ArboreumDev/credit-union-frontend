import { NextApiRequest, NextApiResponse } from "next"
import { initializeGQL } from "../../utils/graphql_client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let data = req.body.data
    console.log(data)
    res.status(200).json(data)
  }
}
