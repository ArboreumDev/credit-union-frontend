import DbClient from "gql/db_client"
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
    // TODO: Check if the session belongs to admin
    // const session = (await getSession({ req })) as Session
    try {
      const { json } = req.body
      if (process.env.ENVIRONMENT === "preview") await dbClient.sdk.ResetDB()
      const scenario = Scenario.fromJSON(JSON.parse(json) as System, dbClient)
      await scenario.initUsers()
      await scenario.executeAll()
      res.status(200).json({ status: "success" })
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
