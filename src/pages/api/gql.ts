import { fetchJSON } from "lib/api"
import { CURRENT_USER_EMAIL } from "lib/constant"
import { runAction } from "lib/gql_api_actions"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import DbClient from "../../gql/db_client"
import { Session } from "../../lib/types"

const dbClient = new DbClient()

type GqlRequest = {
  actionType: string
  payload: (any) => Promise<any>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await fetchJSON({
      url: "/api/auth/god",
      payload: { email: req.cookies[CURRENT_USER_EMAIL] },
      isSSR: true,
    })
    const { actionType, payload } = req.body as GqlRequest
    try {
      const data = await runAction(actionType, session, payload, dbClient)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
