import AWS from "aws-sdk"
import { SLACK_WEBHOOK_URL } from "lib/constant"
import { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
}
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

export const PostToSlack = async (message: string) => {
  const response = await fetch(SLACK_WEBHOOK_URL, {
    body: JSON.stringify({
      text: `[${process.env.ENVIRONMENT}] ${message}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
  if (!response.ok) {
    return console.error(
      "Slack post failed",
      response.status,
      await response.json()
    )
  }
}

export const UploadToS3 = async (
  bucket: string,
  key: string,
  body: Buffer | string,
  contentType: string,
  contentEncoding: string
) => {
  return s3
    .upload({
      Bucket: bucket,
      Key: `${process.env.ENVIRONMENT}/` + key,
      Body: body,
      ACL: "public-read",
      ContentEncoding: contentEncoding,
      ContentType: contentType,
    })
    .promise()
}

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
      const key =
        "user_uploads/" + uploadRequest.email + "/" + uploadRequest.file_name

      const { Location } = await UploadToS3(
        "uploads-all-arboreum",
        key,
        Buffer.from(uploadRequest.data, "base64"),
        uploadRequest.ctype,
        "base64"
      )
      PostToSlack("New user KYC Upload: " + Location)
      res.status(200).json({ Location })
    } catch (e) {
      console.log(e)
      res.status(500).json({ e })
    }
  }
}
