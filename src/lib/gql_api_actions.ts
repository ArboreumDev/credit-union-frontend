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
  constructor(protected session: Session, protected dbClient: DbClient) {}

  abstract minAuthLevel: AUTH_TYPE
  abstract _run(): Promise<any>

  isUserAllowed() {
    if (this.minAuthLevel === AUTH_TYPE.ANY) return true
    if (this.session) {
      const authType = getAuthTypeFromEmail(this.session.user.email)
      return authType >= this.minAuthLevel
    }
    return false
  }

  run() {
    if (this.isUserAllowed) {
      return this._run()
    } else return Promise.reject(ACTION_ERRORS.Unauthorized)
  }
}

export class CreateUser extends Action {
  minAuthLevel = AUTH_TYPE.ANY
  private payload: CreateUserMutationVariables
  constructor(
    session: Session,
    dbClient: DbClient,
    payload: CreateUserMutationVariables
  ) {
    super(session, dbClient)
    this.payload = payload
  }
  _run() {
    return this.dbClient.sdk.CreateUser(this.payload)
  }
}

export class CreateLoan extends Action {
  minAuthLevel = AUTH_TYPE.USER
  private payload: Loan_Requests_Insert_Input
  constructor(
    session: Session,
    dbClient: DbClient,
    payload: Loan_Requests_Insert_Input
  ) {
    super(session, dbClient)
    this.payload = payload
  }
  isUserAllowed() {
    return (
      super.isUserAllowed() && this.payload.borrower_id === this.session.user.id
    )
  }

  _run() {
    return this.dbClient.sdk.CreateLoanRequest({ request: this.payload })
  }
}

export class LogEvent extends Action {
  minAuthLevel = AUTH_TYPE.ANY
  private payload: NextApiRequest
  constructor(session: Session, dbClient: DbClient, payload: NextApiRequest) {
    super(session, dbClient)
    this.payload = payload
  }
  _run() {
    return this.dbClient.logEvent(this.payload.body, this.payload.headers)
  }
}

export enum ActionTypes {
  CreateUser = "CREATE_USER",
  CreateLoan = "CREATE_LOAN_REQUEST_MUTATION",
  LogEvent = "LOG_EVENT",
}

// TODO Add dynamic type validation
export const ACTIONS = {
  [ActionTypes.CreateUser]: CreateUser,
  [ActionTypes.CreateLoan]: CreateLoan,
  [ActionTypes.LogEvent]: LogEvent,
}

export function runAction(
  actionType: ActionTypes,
  session: Session,
  payload: any,
  dbClient: DbClient
) {
  const actionMap = {
    [ActionTypes.CreateUser]: new CreateUser(session, dbClient, payload),
    [ActionTypes.CreateLoan]: new CreateLoan(session, dbClient, payload),
    [ActionTypes.LogEvent]: new LogEvent(session, dbClient, payload),
  }
  if (actionType in actionMap) {
    const action = actionMap[actionType]
    if (action.isUserAllowed()) return action.run()
    else return Promise.reject(ACTION_ERRORS.Unauthorized)
  } else return Promise.reject(ACTION_ERRORS.Invalid)
}
