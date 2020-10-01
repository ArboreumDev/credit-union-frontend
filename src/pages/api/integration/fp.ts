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
      const data = JSON.stringify(req.body)
      const { Location } = await UploadToS3(
        "uploads-all-arboreum",
        "integrations/" + Date.now(),
        data,
        "text/html",
        null
      )
      PostToSlack("File Upload: " + Location + "  " + data.slice(0, 20))
      res.status(200).json({ location: Location })
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
