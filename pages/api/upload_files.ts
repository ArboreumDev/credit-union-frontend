import { NextApiRequest, NextApiResponse } from "next"

const BUCKET = "swarmai-loanrequests"

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
    // Process a POST request
    // Get data from your database
    // console.log(req)
    uploadParams.Body = req.body

    var path = require("path")
    uploadParams.Key = path.basename(Date.now() + ".json")

    const result = await new Promise((resolve, reject) => {
      // call S3 to retrieve upload file to specified bucket
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err)
          res.status(200).json({ error: err })
        }
        if (data) {
          console.log("New Loan Request Upload Success", data.Location)
          res.status(200).json({
            status: "success",
            [uploadParams.Key]: JSON.parse(uploadParams.Body),
          })
        }
      })
    })
  }
  res.status(200).json({ status: "not sure" })
}
