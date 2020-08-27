import { NextApiRequest, NextApiResponse } from "next"
import { initializeGQL } from "../../gql/graphql_client"
import { DbClient } from "../../gql/db_client"
import {
  CreateUserMutationVariables,
  Loan_Requests_Insert_Input,
} from "../../gql/sdk"
import jwt from "next-auth/jwt"
import { JWTToken } from "../../utils/types"

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
    public getData: (payload: any, token: JWTToken) => Promise<any>,
    public authType: AUTH_TYPE
  ) {}
}

function createUser(payload: CreateUserMutationVariables, token: JWTToken) {
  if (payload.user.id === token.user.id) {
    return dbClient.sdk.CreateUser(payload)
  }
  return Promise.reject()
}
function createLoanRequest(
  payload: Loan_Requests_Insert_Input,
  token: JWTToken
) {
  if (payload.borrower_id === token.user.id) {
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
    const token = (await jwt.getToken({ req, secret })) as JWTToken

    const authType = getAuthTypeFromEmail(token.email)

    const { actionType, payload } = req.body as GqlRequest
    const action: Action = ACTIONS[actionType]
    if (authType >= action.authType) {
      if (action) {
        try {
          const data = await action.getData(payload, token)
          res.status(200).json(data)
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
