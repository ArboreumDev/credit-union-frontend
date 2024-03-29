import AWS from "aws-sdk"
import DecentroKYCClient, {
  decentroKYCClient,
  KYCStatus,
} from "gql/wallet/decentro_kyc_client"
import { PostToSlack } from "lib/logger"
import { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"

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
  s3Key: string
  file_name: string
  ctype: string
  data: string
}

async function uploadS3(uploadRequest: UploadRequest) {
  const key =
    "user_uploads/" + uploadRequest.s3Key + "/" + uploadRequest.file_name

  const { Location } = await UploadToS3(
    "uploads-all-arboreum",
    key,
    Buffer.from(uploadRequest.data, "base64"),
    uploadRequest.ctype,
    "base64"
  )
  return Location
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const uploadRequest: UploadRequest = req.body
      uploadRequest.file_name = Date.now() + "-" + uploadRequest.file_name
      const location = await uploadS3(uploadRequest)
      PostToSlack("New user KYC Upload: " + location)
      res.status(200).json({ location })
    } catch (e) {
      console.log(e)
      res.status(500).json({ status: e })
    }
  }
}
