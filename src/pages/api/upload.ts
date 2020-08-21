import { NextApiRequest, NextApiResponse } from "next"
import AWS from "aws-sdk"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
}
const BUCKET = "kyc-arboreum"

// Load the AWS SDK for Node.js

// Set the region
AWS.config.update({ region: "ap-south-1" })

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_APP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
})

// configure AWS to work with promises
AWS.config.setPromisesDependency(null)

// Create S3 service object
const s3 = new AWS.S3()

// call S3 to retrieve upload file to specified bucket
const uploadParams = { Bucket: BUCKET, Key: "", Body: "" }

export type UploadRequest = {
  email: string
  file_name: string
  ctype: string
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const uploadRequest: UploadRequest = req.body
      const { Location } = await s3
        .upload({
          Bucket: BUCKET,
          Key: uploadRequest.email + "/" + uploadRequest.file_name,
          Body: Buffer.from(uploadRequest.data, "base64"),
          ACL: "public-read",
          ContentEncoding: "base64",
          ContentType: uploadRequest.ctype,
        })
        .promise()

      res.statusCode = 200
      res.json({ Location })
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.json({ e })
    }
  }
}
