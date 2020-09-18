import {
  Action,
  ACTIONS,
  ActionTypes,
  CreateUser,
  CreateLoanRequest as CreateLoan,
  LogEvent,
} from "lib/gql_api_actions"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { DbClient } from "../../gql/db_client"
import {
  CreateUserMutationVariables,
  Loan_Requests_Insert_Input,
} from "../../gql/sdk"
import { Session, User } from "../../lib/types"

const dbClient = new DbClient()

type GqlRequest = {
  actionType: string
  payload: (any) => Promise<any>
}

export function runAction(
  actionType: ActionTypes,
  session: Session,
  payload: any
) {
  const actionMap = {
    [ActionTypes.CreateUser]: new CreateUser(session, dbClient, payload),
    [ActionTypes.CreateLoan]: new CreateLoan(session, dbClient, payload),
    [ActionTypes.LogEvent]: new LogEvent(session, dbClient, payload),
  }
  if (actionType in actionMap) {
    const action = actionMap[actionType]
    if (action.isUserAllowed()) return action.run()
    else return Promise.reject("Unauthorized")
  } else return Promise.reject("Invalid")
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = (await getSession({ req })) as Session
    const { actionType, payload } = req.body as GqlRequest
    try {
      runAction(actionType as ActionTypes, session, payload)
    } catch (error) {
      res.status(401).json({ error })
    }
  }
}
