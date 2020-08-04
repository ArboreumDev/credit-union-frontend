import { NextApiRequest, NextApiResponse } from "next";
import { initializeGQL } from "../../utils/graphql_client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
      console.log(req.body)
    let query = JSON.parse(req.body).query;
    const gqlClient = initializeGQL();
    var data = await gqlClient.request(query);
    res.status(200).json(data);
  }
}
