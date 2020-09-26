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

export const PostToSlack = (message: string) => {
  fetch(
    "https://hooks.slack.com/services/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",
    {
      body: JSON.stringify({
        text: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
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
      Key: key,
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
      const key = uploadRequest.email + "/" + uploadRequest.file_name

      const { Location } = await UploadToS3(
        BUCKET,
        key,
        Buffer.from(uploadRequest.data, "base64"),
        uploadRequest.ctype,
        "base64"
      )

      res.statusCode = 200
      PostToSlack("New user KYC Upload: " + Location)
      res.json({ Location })
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.json({ e })
    }
  }
}
