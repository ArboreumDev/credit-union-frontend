import { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"

const BUCKET = "kyc-arboreum"

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk")
// Set the region
AWS.config.update({ region: "eu-west-2" })

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

// configure AWS to work with promises
AWS.config.setPromisesDependency(null)

// Create S3 service object
const s3 = new AWS.S3()

// call S3 to retrieve upload file to specified bucket
var uploadParams = { Bucket: BUCKET, Key: "", Body: "" }



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
    const file = req.body
     const { Location } = await s3
       .upload({
         Bucket: BUCKET,
         Key: file.file_name,
         Body: Buffer.from(file.data, 'base64'),
         ACL: "public-read",
         ContentEncoding: "base64",
         ContentType: file.ctype
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
