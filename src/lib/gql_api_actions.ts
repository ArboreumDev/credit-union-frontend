import { DbClient } from "gql/db_client"
import {
  ChangeUserCashBalanceMutationVariables,
  UpdateSupporterMutationVariables,
  CreateLoanRequestMutationVariables,
  CreateUserMutationVariables,
  UpdateLoanRequestWithOfferMutation,
  StartLoanMutation,
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
  static Name = "CreateUser"
  static InputType: CreateUserMutationVariables
  minAuthLevel = AUTH_TYPE.ANY

  run() {
    return this.dbClient.sdk.CreateUser(this.payload)
  }

  static fetch(payload: typeof CreateUser.InputType) {
    return fetcherMutate(CreateUser.Name, payload)
  }
}

export class CreateLoan extends Action {
  static Name = "CreateLoan"
  static InputType: CreateLoanRequestMutationVariables
  static ReturnType: UpdateLoanRequestWithOfferMutation

  minAuthLevel = AUTH_TYPE.USER

  run() {
    // actually we first need to create the loan request and then call swarmai
    // but now I am doing it inside dbClient
    return this.dbClient.createLoanRequest(
      this.user.id /*borrower_id*/,
      this.payload.request.amount,
      this.payload.request.purpose
    )
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
    return fetcherMutate(CreateLoan.Name, payload)
  }
}

export class ChangeBalance extends Action {
  static Name = "ChangeBalance"
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
    return fetcherMutate(ChangeBalance.Name, payload)
  }
}

export class AcceptRejectPledge extends Action {
  static Name = "AcceptRejectPledge"
  static InputType: UpdateSupporterMutationVariables
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return super.isUserAllowed() && this.user.user_type == UserType.Lender
  }

  run() {
    return this.dbClient.updateSupporter(
      this.payload.request_id,
      this.user.id,
      this.payload.status, // see types.SupporterStatus
      this.payload.pledge_amount
    )
  }

  static fetch(payload: typeof AcceptRejectPledge.InputType) {
    return fetcherMutate(AcceptRejectPledge.Name, payload)
  }
}

export class AcceptLoanOffer extends Action {
  static Name = "AcceptLoan"
  static InputType: string
  static ReturnType: StartLoanMutation
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return super.isUserAllowed() && this.user.user_type == UserType.Lender
  }

  run() {
    return this.dbClient.acceptLoanOffer(this.payload.request_id)
  }

  // static fetch(payload: anytypeof AcceptLoanOffer.InputType) {
  static fetch(payload: any) {
    return fetcherMutate(AcceptLoanOffer.Name, payload)
  }
}

// TODO Add dynamic type validation
export const ACTIONS = {
  [CreateUser.Name]: CreateUser,
  [CreateLoan.Name]: CreateLoan,
  [ChangeBalance.Name]: ChangeBalance,
  [AcceptRejectPledge.Name]: AcceptRejectPledge,
  [AcceptLoanOffer.Name]: AcceptLoanOffer,
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
