import { DbClient } from "gql/db_client"
import {
  CreateUserMutationVariables,
  Loan_Requests_Insert_Input,
} from "gql/sdk"
import { NextApiRequest } from "next"
import { Session, User } from "./types"

export const ACTION_ERRORS = {
  Unauthorized: new Error("Unauthorized"),
  Invalid: new Error("Invalid"),
}

enum AUTH_TYPE {
  ANY,
  USER,
  ADMIN,
}

const ADMINS = ["dev-admin@arboreum.dev"]

export const getAuthTypeFromEmail = (email: string) => {
  if (email == undefined) {
    return AUTH_TYPE.ANY
  }
  if (email in ADMINS) {
    return AUTH_TYPE.ADMIN
  }
  return AUTH_TYPE.USER
}

export abstract class Action {
  constructor(
    protected session: Session,
    protected dbClient: DbClient,
    protected payload: any
  ) {}

  abstract minAuthLevel: AUTH_TYPE
  abstract run(): Promise<any>

  isUserAllowed() {
    if (this.minAuthLevel === AUTH_TYPE.ANY) return true
    if (this.session) {
      const authType = getAuthTypeFromEmail(this.session.user.email)
      return authType >= this.minAuthLevel
    }
    return false
  }
}

export class CreateUser extends Action {
  minAuthLevel = AUTH_TYPE.ANY

  run() {
    return this.dbClient.sdk.CreateUser(this.payload)
  }
}

export class CreateLoan extends Action {
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return (
      super.isUserAllowed() && this.payload.borrower_id === this.session.user.id
    )
  }

  run() {
    return this.dbClient.sdk.CreateLoanRequest({ request: this.payload })
  }
}

export enum ActionTypes {
  CreateUser = "CREATE_USER",
  CreateLoan = "CREATE_LOAN_REQUEST_MUTATION",
}

// TODO Add dynamic type validation
export const ACTIONS = {
  [ActionTypes.CreateUser]: CreateUser,
  [ActionTypes.CreateLoan]: CreateLoan,
}

export function runAction(
  actionType: ActionTypes,
  session: Session,
  payload: any,
  dbClient: DbClient
) {
  // console.log(session, payload)
  const actionMap = {
    [ActionTypes.CreateUser]: new CreateUser(session, dbClient, payload),
    [ActionTypes.CreateLoan]: new CreateLoan(session, dbClient, payload),
  }
  if (actionType in actionMap) {
    const action = actionMap[actionType]
    if (action.isUserAllowed()) return action.run()
    else return Promise.reject(ACTION_ERRORS.Unauthorized)
  } else return Promise.reject(ACTION_ERRORS.Invalid)
}
