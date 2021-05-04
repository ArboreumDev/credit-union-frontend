import { runAction } from "lib/gql_api_actions"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import DbClient from "../../gql/db_client"
import CircleClient, { CIRCLE_BASE_URL } from "../../gql/wallet/circle_client"
import { Session } from "../../lib/types"

const dbClient = new DbClient()
// TODO get CIRCLE BASE URL & SECRET from process.env
const circleClient = new CircleClient(CIRCLE_BASE_URL)

type GqlRequest = {
  actionType: string
  payload: (any) => Promise<any>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = (await getSession({ req })) as Session
    const { actionType, payload } = req.body as GqlRequest
    try {
      const data = await runAction(
        actionType,
        session,
        payload,
        dbClient,
        circleClient
      )
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}
