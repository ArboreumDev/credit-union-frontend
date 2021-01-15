import DbClient from "gql/db_client"
import {
  AddSupporterMutation,
  ChangeUserCashBalanceMutationVariables,
  CreateLoanRequestMutationVariables,
  CreateUserMutationVariables,
  StartLoanMutation,
  UpdateLoanRequestWithOfferMutation,
  UpdateSupporterMutationVariables,
  Action_Type_Enum,
} from "gql/sdk"
import { fetcherMutate } from "./api"
import { NO_ROI } from "./constant"
import { Session, UserType } from "./types"

export const ACTION_ERRORS = {
  Unauthorized: "UNAUTHORIZED",
  Invalid: "INVALID",
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

  async run() {
    // set default init values
    this.payload.user.roi = NO_ROI

    return await this.dbClient.sdk.CreateUser(this.payload)
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

  async run() {
    return await this.dbClient.sdk.CreateLoanRequest(this.payload)
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
    name: string
    info: any
  }
  static ReturnType: AddSupporterMutation

  minAuthLevel = AUTH_TYPE.USER

  async run() {
    const _p = this.payload as typeof AddSupporter.InputType
    return await this.dbClient.addSupporter(
      _p.requestId,
      _p.email,
      _p.amount,
      _p.name,
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

  async run() {
    await this.dbClient.sdk.ChangeUserCashBalance({
      userId: this.user.id,
      delta: this.payload.delta,
    })
    return await this.dbClient.sdk.InsertScenarioAction({
      action: {
        action_type: Action_Type_Enum.AdjustBalances,
        payload: {
          userEmail: this.user.email,
          balanceDelta: this.payload.delta,
        },
      },
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

  async run() {
    return await this.dbClient.updateSupporter(
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

  async run() {
    const {
      update_loan_requests_by_pk: loan,
    } = await this.dbClient.acceptLoanOffer(this.payload.request_id)

    return await this.dbClient.sdk.InsertScenarioAction({
      action: {
        action_type: Action_Type_Enum.ConfirmLoan,
        payload: {
          userEmail: this.user.email,
          loan_id: this.payload.request_id,
          amount: loan.amount,
          supporters: loan.supporters.map((s) => ({
            email: s.user.email,
            pledge_amount: s.pledge_amount,
          })),
        },
      },
    })
  }

  static fetch(payload: typeof AcceptLoanOffer.InputType) {
    return fetcherMutate(AcceptLoanOffer.Name, payload)
  }
}

export class MakeRepayment extends Action {
  static Name = "MakeRepayment"
  static InputType: {
    amount: number
  }
  static ReturnType: StartLoanMutation
  minAuthLevel = AUTH_TYPE.USER

  async run() {
    const userLoanId = this.user.loan_requests[0].request_id
    await this.dbClient.sdk.ChangeUserCashBalance({
      userId: this.user.id,
      delta: this.payload.amount,
    })
    await this.dbClient.make_repayment(userLoanId, this.payload.amount)
    return await this.dbClient.sdk.InsertScenarioAction({
      action: {
        action_type: Action_Type_Enum.RepayLoan,
        payload: {
          userEmail: this.user.email,
          loan_id: userLoanId,
          amount: this.payload.amount,
        },
      },
    })
  }

  static fetch(payload: typeof MakeRepayment.InputType) {
    return fetcherMutate(MakeRepayment.Name, payload)
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
  [MakeRepayment.Name]: MakeRepayment,
}

export async function runAction(
  actionType: string,
  session: Session,
  payload: any,
  dbClient: DbClient
) {
  if (actionType in ACTIONS) {
    const action = new ACTIONS[actionType](session, dbClient, payload)
    if (action.isUserAllowed()) return await action.run()
    else throw ACTION_ERRORS.Unauthorized
  } else throw ACTION_ERRORS.Invalid
}
