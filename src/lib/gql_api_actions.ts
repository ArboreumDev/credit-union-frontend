import { DbClient } from "gql/db_client"
import {
  ChangeUserCashBalanceMutationVariables,
  CreateLoanRequestMutation,
  CreateLoanRequestMutationVariables,
  CreateUserMutationVariables,
} from "gql/sdk"
import { fetcherMutate } from "./api"
import { Session, UserType } from "./types"

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

  get user() {
    return this.session.user
  }

  isUserAllowed() {
    if (this.minAuthLevel === AUTH_TYPE.ANY) return true
    if (this.session) {
      const authType = getAuthTypeFromEmail(this.user.email)
      return authType >= this.minAuthLevel
    }
    return false
  }
}

export class CreateUser extends Action {
  static InputType: CreateUserMutationVariables
  minAuthLevel = AUTH_TYPE.ANY

  run() {
    return this.dbClient.sdk.CreateUser(this.payload)
  }

  static fetch(payload: typeof CreateUser.InputType) {
    return fetcherMutate(CreateUser.name, payload)
  }
}

export class CreateLoan extends Action {
  static InputType: CreateLoanRequestMutationVariables
  static ReturnType: CreateLoanRequestMutation

  minAuthLevel = AUTH_TYPE.USER

  run() {
    try {
      // add call to swarmai here
    } catch (err) {
      console.error(err)
    }
    return this.dbClient.sdk.CreateLoanRequest({
      request: {
        ...this.payload.request,
        borrower_id: this.user.id,
      },
    })
  }

  isUserAllowed() {
    return (
      super.isUserAllowed() &&
      this.payload &&
      this.payload.request &&
      this.payload.request.borrower_id == this.user.id
    )
  }

  static fetch(payload: typeof CreateLoan.InputType) {
    return fetcherMutate(CreateLoan.name, payload)
  }
}

export class ChangeBalance extends Action {
  static InputType: ChangeUserCashBalanceMutationVariables
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return super.isUserAllowed() && this.user.user_type == UserType.Lender
  }

  run() {
    return this.dbClient.sdk.ChangeUserCashBalance({
      userId: this.user.id,
      delta: this.payload.delta,
    })
  }

  static fetch(payload: typeof ChangeBalance.InputType) {
    return fetcherMutate(ChangeBalance.name, payload)
  }
}

export class AcceptRejectPledge extends Action {
  static InputType: ChangeUserCashBalanceMutationVariables // TODO
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return super.isUserAllowed() && this.user.user_type == UserType.Lender
  }

  run() {
    // TODO Add accept logic here
    // return this.dbClient.sdk.ChangeUserCashBalance({
    //   userId: this.user.id,
    //   delta: this.payload.delta,
    // })
    return null
  }

  static fetch(payload: typeof AcceptRejectPledge.InputType) {
    return fetcherMutate(AcceptRejectPledge.name, payload)
  }
}

// TODO Add dynamic type validation
export const ACTIONS = {
  [CreateUser.name]: CreateUser,
  [CreateLoan.name]: CreateLoan,
  [ChangeBalance.name]: ChangeBalance,
  [AcceptRejectPledge.name]: AcceptRejectPledge,
}

export function runAction(
  actionType: string,
  session: Session,
  payload: any,
  dbClient: DbClient
) {
  if (actionType in ACTIONS) {
    const action = new ACTIONS[actionType](session, dbClient, payload)
    if (action.isUserAllowed()) return action.run()
    else return Promise.reject(ACTION_ERRORS.Unauthorized)
  } else return Promise.reject(ACTION_ERRORS.Invalid)
}
