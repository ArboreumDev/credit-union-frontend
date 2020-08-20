import { NextApiRequest, NextApiResponse } from "next";
import { initializeGQL } from "../../gql/graphql_client";
import { DbClient } from "../../gql/db_client";
import { getSdk } from "../../gql/sdk";

const sdk = 
const dbClient = new DbClient(getSdk(initializeGQL()))

const ACTIONS = {
  "CreateUser" : dbClient
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let query = req.body.query;
    const gqlClient = initializeGQL();
    var data = await gqlClient.request(query);
    res.status(200).json(data);
  }
}
