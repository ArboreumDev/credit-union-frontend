import { DbClient } from "gql/db_client"
import { LogEventTypes } from "lib/constant"
import { NextApiRequest, NextApiResponse } from "next"
import { PostToSlack, UploadToS3 } from "../upload"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req.body)
      const { Location } = await UploadToS3(
        "uploads-all-arboreum",
        "integrations/" + Date.now(),
        JSON.stringify(req.body),
        "text/html",
        null
      )
      PostToSlack("FinancePeer Upload: " + Location)
      res.status(200).json({ location: Location })
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
