import { NextApiRequest, NextApiResponse } from "next";

const BUCKET = 'swarmai-loanrequests';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'eu-west-2' });

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_APP,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(null)


// Create S3 service object
const s3 = new AWS.S3();

// call S3 to retrieve upload file to specified bucket
var uploadParams = { Bucket: BUCKET, Key: '', Body: '' };

const loan_request_fixture = {
    "borrower_id": 4,
    "loan_size": 3,
    "network_dict": {
        "nodes": [1, 2, 3, 4],
        "edges": [
            [1, 2, 5],
            [2, 3, 5],
            [3, 4, 5]
        ]
    },
    "recommendation_risks": { "1": { "2": { "role": "trustee", "credit": 5, "risk": [1, 2] } }, "2": { "1": { "role": "trustor", "credit": 5, "risk": [1, 2] }, "3": { "role": "trustee", "credit": 5, "risk": [1, 2] } }, "3": { "2": { "role": "trustor", "credit": 5, "risk": [1, 2] }, "4": { "role": "trustee", "credit": 5, "risk": [1, 2] } }, "4": { "3": { "role": "trustor", "credit": 5, "risk": [1, 2] } } },
    "potential_lenders": [3, 2, 1],
    "portfolio_sizes": { "1": 0, "2": 0, "3": 0, "4": 0 },
    "repayments": { "1": [{ "agent_id": 2, "role": "trustee", "amount": 3, "repaid": 3, "default": 0 }, { "agent_id": 2, "role": "trustee", "amount": 4, "repaid": 4, "default": 0 }], "2": [{ "agent_id": 1, "role": "trustor", "amount": 3, "repaid": 0, "default": 3 }, { "agent_id": 1, "role": "trustor", "amount": 4, "repaid": 0, "default": 4 }], "3": [], "4": [] },
    "central_source_info": []
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Process a POST request
        // Get data from your database
        // console.log(req)
        uploadParams.Body = JSON.stringify(req.body);

        var path = require('path');
        uploadParams.Key = path.basename(Date.now() + ".json");

        const result = await new Promise((resolve, reject) => {
            // call S3 to retrieve upload file to specified bucket
            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    res.status(200).json({ 'error': err })
                }
                if (data) {
                    console.log("New Loan Request Upload Success", data.Location);
                    res.status(200).json({ 
                        'status': 'success',
                        [uploadParams.Key]: JSON.parse(uploadParams.Body)
                    })
                }
            });
        });
    }
    res.status(200).json({ 'status': 'not sure' })
}