// import { logEvent } from "lib/logger"
// import { Scenario, System } from "lib/scenario"
import DbClient from "../../../gql/db_client"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import {algoActionClient} from "gql/algo_client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Check if the session belongs to admin
    const session = (await getSession({ req })) as Session
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      res.status(404).json({ details: "unauthorized" })
    } else {
      try {
        // create a dbClient with an algoClient that can hit the protected endpoints
        // TODO algoAction client needs to be moved to a non-exposed place (or instanttiated here from .env)
        const dbClient = new DbClient(null, null, null, algoActionClient)
        await dbClient.reconcile()
        console.log("sdf")
        res.status(200).json({ detail: "ok" })
      } catch (error) {
        console.log(error)
        res.status(401).json({ error })
      }
    }
  }
}
