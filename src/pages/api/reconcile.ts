import { runAction } from "lib/gql_api_actions"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import DbClient from "../../gql/db_client"
import { Update_Type_Enum } from "../../gql/sdk"
import { Session } from "../../lib/types"

const dbClient = new DbClient()

export type UpdateRequestType =
  | "COMPOUND"
  | "REPAYMENT"
  | "BLOCKCHAINDEPOSIT"
  | "BANKDEPOSIT"
  | "OPENREQUEST"

export type UpdateRequest = {
  updateType: UpdateRequestType
  payload: (any) => Promise<any>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = (await getSession({ req })) as Session
    const { updateType, payload } = req.body as UpdateRequest
    try {
      const isAdmin = session.user.email !== process.env.ADMIN_EMAIL
      // only allow users to trigger certain kinds of updates
      if (!isAdmin && updateType !== "OPENREQUEST") {
        res.status(404).json({ details: "unauthorized" })
      }
      const data = await dbClient.processUpdateRequest(
        updateType,
        isAdmin ? "all" : session.user.id,
        payload
      )
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(401).json({ error })
    }
  }
}

// notes what to build

// /reconcile/compoundUpdate
// /reconcile/repayment
// /reconcile/blockchainDeposits
// /reconcile/bankDeposits
// /reconcile/openRequests
// // /reconcile/penalty
// /reconcile/default
