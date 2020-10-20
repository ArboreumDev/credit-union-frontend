import DbClient from "gql/db_client"
import {
  AddSupporterMutation,
  AddSupporterMutationVariables,
  ChangeUserCashBalanceMutationVariables,
  CreateLoanRequestMutationVariables,
  CreateUserMutationVariables,
  StartLoanMutation,
  UpdateLoanRequestWithOfferMutation,
  UpdateSupporterMutationVariables,
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
    return this.dbClient.sdk.CreateLoanRequest(this.payload)
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

export class AddSupporter extends Action {
  static Name = "AddSupporter"
  static InputType: {
    requestId: string
    email: string
    amount: number
    info: any
  }
  static ReturnType: AddSupporterMutation

  minAuthLevel = AUTH_TYPE.USER

  run() {
    const _p = this.payload as typeof AddSupporter.InputType
    return this.dbClient.addSupporter(
      _p.requestId,
      _p.email,
      _p.amount,
      _p.info
    )
  }

  static fetch(payload: typeof AddSupporter.InputType) {
    return fetcherMutate(AddSupporter.Name, payload)
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
  static InputType: {
    request_id: string
  }
  static ReturnType: StartLoanMutation
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    const userHasLoan = this.user.loan_requests
      .map((lr) => lr.request_id)
      .includes(this.payload.request_id)
    return super.isUserAllowed() && userHasLoan
  }

  run() {
    return this.dbClient.acceptLoanOffer(this.payload.request_id)
  }

  static fetch(payload: typeof AcceptLoanOffer.InputType) {
    return fetcherMutate(AcceptLoanOffer.Name, payload)
  }
}

// TODO Add dynamic type validation
export const ACTIONS = {
  [CreateUser.Name]: CreateUser,
  [CreateLoan.Name]: CreateLoan,
  [AddSupporter.Name]: AddSupporter,
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
