import DbClient from "gql/db_client"
import CircleClient, { CIRCLE_BASE_URL } from "gql/wallet/circle_client"
import { logEvent } from "lib/logger"
import { Scenario, System } from "lib/scenario"
import { Session } from "lib/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dbClient = new DbClient()
    const circleClient = new CircleClient(CIRCLE_BASE_URL)

    // TODO: Check if the session belongs to admin
    const session = (await getSession({ req })) as Session
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      res.status(404).json({ details: "unauthorized" })
    } else {
      try {
        const { yaml } = req.body
        if (process.env.ENVIRONMENT === "preview") await dbClient.sdk.ResetDB()
        const scenario = Scenario.fromYAML(yaml, dbClient, circleClient)
        await scenario.initUsers()
        await scenario.executeAll()
        res.status(200).json({ status: "success" })
      } catch (error) {
        console.log(error)
        res.status(401).json({ error })
      }
    }
  }
}
