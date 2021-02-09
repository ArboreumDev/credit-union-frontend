import { fetchJSON } from "lib/api"
import { NextApiRequest, NextApiResponse } from "next"

// We need this on Server side because https website is not allowed http request by browsers
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { lenderId, cached } = req.body

    try {
      const endpoint = cached ? "cached_lender" : "lender"
      const url = process.env.YAZALI_SERVER + endpoint + "/" + lenderId
      console.log(url)
      const data = await fetchJSON({ url })
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
