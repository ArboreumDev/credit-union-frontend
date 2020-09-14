import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { DbClient } from "../../gql/db_client"
import {
  CreateUserMutationVariables,
  Loan_Requests_Insert_Input,
} from "../../gql/sdk"
import { Session, User } from "../../lib/types"

const secret = process.env.JWT_SECRET
enum AUTH_TYPE {
  ANY,
  USER,
  ADMIN,
}

const ADMINS = ["dev-admin@arboreum.dev"]

const getAuthTypeFromEmail = (email: string) => {
  if (email == undefined) {
    return AUTH_TYPE.ANY
  }
  if (email in ADMINS) {
    return AUTH_TYPE.ADMIN
  }
  return AUTH_TYPE.USER
}

const dbClient = new DbClient()

class Action {
  constructor(
    public getData: (payload: any, user?: User) => Promise<any>,
    public authType: AUTH_TYPE
  ) {}
}

function createUser(payload: CreateUserMutationVariables) {
  return dbClient.sdk.CreateUser(payload)
}

function createLoanRequest(payload: Loan_Requests_Insert_Input, user: User) {
  if (payload.borrower_id === user.id) {
    return dbClient.sdk.CreateLoanRequest({ request: payload })
  }
  return Promise.reject()
}

// TODO Add dynamic type validation
const ACTIONS = {
  CreateUser: new Action(createUser, AUTH_TYPE.ANY),
  CreateLoanRequestMutation: new Action(createLoanRequest, AUTH_TYPE.USER),
}

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

    const authType = getAuthTypeFromEmail(session.user.email)

    const { actionType, payload } = req.body as GqlRequest
    const action: Action = ACTIONS[actionType]
    if (authType >= action.authType) {
      if (action) {
        try {
          const user = session.user
          if (user) {
            const data = await action.getData(payload, user)
            res.status(200).json(data)
          } else {
            res.status(200).json({})
          }
        } catch (e) {
          console.error(e)
          res.status(400).json({ error: e })
        }
      } else {
        res.status(400).json({ error: "invalid action" })
      }
    } else {
      res.status(401).json({ error: "Unauthorized" })
    }
  } else {
    res.status(405).json({ error: "invalid method" })
  }
}
