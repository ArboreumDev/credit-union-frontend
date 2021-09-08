// import { logEvent } from "lib/logger"
// import { Scenario, System } from "lib/scenario"
import DbClient from "../../../gql/db_client"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"

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
        const dbClient = new DbClient()
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
