import DbClient from "gql/db_client"
import {
  CreateLoanRequestMutation,
  CreateLoanRequestMutationVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
  FundLoanRequestMutation,
  FundLoanRequestMutationVariables,
  Action_Type_Enum,
  RegisterRepaymentMutation,
  ChangeUserCashBalanceMutationVariables,
  ApproveBorrowerMutationVariables,
} from "gql/sdk"
import { fetcherMutate } from "./api"
import { NO_ROI, USER_DEMOGRAPHIC } from "./constant"
import { Session, UserType } from "./types"
import { uuidv4 } from "lib/helpers"

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
    const user = this.payload.user

    user.email = this.session.user.email

    if (!user.demographic_info) {
      user.demographic_info = USER_DEMOGRAPHIC
    }

    // create user entry our DB
    const ret = await this.dbClient.sdk.CreateUser(this.payload)

    // circle setup using userId as idempotencyKey
    const circleData = await this.dbClient.circleClient.setupUser(
      ret.insert_user_one.id,
      user
    )

    // update db with circle data
    const data = await this.dbClient.sdk.UpdateAccountDetails({
      userId: ret.insert_user_one.id,
      accountDetails: {
        ...user.account_details,
        circle: circleData,
      },
    })

    // update value to be returned
    ret.insert_user_one.account_details = data.user.account_details
    return ret
  }

  static fetch(payload: typeof CreateUser.InputType) {
    return fetcherMutate(CreateUser.Name, payload)
  }
}

export class CreateLoan extends Action {
  static Name = "CreateLoan"
  static InputType: CreateLoanRequestMutationVariables
  static ReturnType: CreateLoanRequestMutation

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

export class SetBorrowerApproval extends Action {
  static Name = "SetBorrowerApproval"
  static InputType: {
    borrowerId: string
    approved: boolean
  }
  static ReturnType: boolean
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return super.isUserAllowed() //&& this.user.user_type === UserType.Lender
  }

  async run() {
    const creditLine = {
      borrower_id: this.payload.borrowerId,
      investor_id: this.user.id,
    }
    // add borrower entry
    if (this.payload.approved) {
      await this.dbClient.sdk.ApproveBorrower({ creditLine })
      await this.dbClient.processOpenRequests(this.user.id)
    } else {
      await this.dbClient.sdk.RemoveBorrowerApproval(creditLine)
    }
    return true
    // TODO // return await this.dbClient.sdk.InsertScenarioAction({
  }

  static fetch(payload: typeof SetBorrowerApproval.InputType) {
    return fetcherMutate(SetBorrowerApproval.Name, payload)
  }
}

export type Target = "ETH" | "ALGO" | "BANK" | undefined

export interface WithdrawPayload {
  target: Target
  address: string
  amount: number
}

export class Withdraw extends Action {
  static Name = "Withdraw"
  static InputType: WithdrawPayload
  minAuthLevel = AUTH_TYPE.USER

  isUserAllowed() {
    return super.isUserAllowed() // && this.user.user_type == UserType.Lender
  }

  async run() {
    // how to make sure this is only called once?
    const idemKey = uuidv4()
    const circleData = this.user.account_details.circle
    if (this.payload.target === "BANK") {
      return this.dbClient.circleClient.createWireWithdrawal(
        {
          sourceWalletId: circleData.walletId,
          targetAccountid: circleData.accountId,
          email: this.user.email,
        },
        idemKey,
        this.payload.amount
      )
    } else {
      // target is ETH or ALGO
      return this.dbClient.circleClient.walletToBlockchainTransfer(
        circleData.walletId,
        this.payload.target,
        this.payload.address,
        this.payload.amount,
        idemKey
      )
      // scenario action to stay in sync
      return await this.dbClient.sdk.InsertScenarioAction({
        action: {
          action_type: Action_Type_Enum.AdjustBalances,
          payload: {
            userEmail: this.user.email,
            balanceDelta: -this.payload.amount,
          },
        },
      })
    }
  }

  static fetch(payload: typeof Withdraw.InputType) {
    return fetcherMutate(Withdraw.Name, payload)
  }
}

export class FundLoanRequest extends Action {
  static Name = "FundLoan"
  static InputType: {
    requestId: string
  }
  static ReturnType: FundLoanRequestMutation
  minAuthLevel = AUTH_TYPE.USER

  async run() {
    return await this.dbClient.fundLoanRequest(
      this.payload.requestId,
      this.user.id
    )
  }

  isUserAllowed() {
    return (
      super.isUserAllowed() &&
      this.payload &&
      this.user.user_type === UserType.Lender
    )
  }

  static fetch(payload: typeof FundLoanRequest.InputType) {
    return fetcherMutate(FundLoanRequest.Name, payload)
  }
}

export class MakeRepayment extends Action {
  static Name = "MakeRepayment"
  static InputType: {
    amount: number
    loanId: string
  }
  static ReturnType: RegisterRepaymentMutation
  minAuthLevel = AUTH_TYPE.USER

  async run() {
    return await this.dbClient.makeRepayment(
      this.payload.loanId,
      this.payload.amount
    )
    // TODO add scenario action
    // return await this.dbClient.sdk.InsertScenarioAction({
    //   action: {
    //     action_type: Action_Type_Enum.RepayLoan,
    //     payload: {
    //       userEmail: this.user.email,
    //       loan_id: this.payload.loanId,
    //       amount: this.payload.amount,
    //     },
    //   },
    // })
  }

  static fetch(payload: typeof MakeRepayment.InputType) {
    return fetcherMutate(MakeRepayment.Name, payload)
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
    return await this.dbClient.sdk.ChangeUserCashBalance({
      userId: this.user.id,
      delta: this.payload.delta,
    })
    // return await this.dbClient.sdk.InsertScenarioAction({
    //   action: {
    //     action_type: Action_Type_Enum.AdjustBalances,
    //     payload: {
    //       userEmail: this.user.email,
    //       balanceDelta: this.payload.delta,
    //     },
    //   },
    // })
  }

  static fetch(payload: typeof ChangeBalance.InputType) {
    return fetcherMutate(ChangeBalance.Name, payload)
  }
}

// export class AddSupporter extends Action {
//   static Name = "AddSupporter"
//   static InputType: {
//     requestId: string
//     email: string
//     amount: number
//     name: string
//     info: any
//   }
//   static ReturnType: AddSupporterMutation

//   minAuthLevel = AUTH_TYPE.USER

//   async run() {
//     const _p = this.payload as typeof AddSupporter.InputType
//     return await this.dbClient.addSupporter(
//       _p.requestId,
//       _p.email,
//       _p.amount,
//       _p.name,
//       _p.info
//     )
//   }

//   static fetch(payload: typeof AddSupporter.InputType) {
//     return fetcherMutate(AddSupporter.Name, payload)
//   }
// }

// export class ChangeBalance extends Action {
//   static Name = "ChangeBalance"
//   static InputType: ChangeUserCashBalanceMutationVariables
//   minAuthLevel = AUTH_TYPE.USER

//   isUserAllowed() {
//     return super.isUserAllowed() && this.user.user_type == UserType.Lender
//   }

//   async run() {
//     await this.dbClient.sdk.ChangeUserCashBalance({
//       userId: this.user.id,
//       delta: this.payload.delta,
//     })
//     return await this.dbClient.sdk.InsertScenarioAction({
//       action: {
//         action_type: Action_Type_Enum.AdjustBalances,
//         payload: {
//           userEmail: this.user.email,
//           balanceDelta: this.payload.delta,
//         },
//       },
//     })
//   }

//   static fetch(payload: typeof ChangeBalance.InputType) {
//     return fetcherMutate(ChangeBalance.Name, payload)
//   }
// }

// export class AcceptRejectPledge extends Action {
//   static Name = "AcceptRejectPledge"
//   static InputType: UpdateSupporterMutationVariables
//   minAuthLevel = AUTH_TYPE.USER

//   isUserAllowed() {
//     return super.isUserAllowed() && this.user.user_type == UserType.Lender
//   }

//   async run() {
//     return await this.dbClient.updateSupporter(
//       this.payload.request_id,
//       this.user.id,
//       this.payload.status, // see types.SupporterStatus
//       this.payload.pledge_amount
//     )
//   }

//   static fetch(payload: typeof AcceptRejectPledge.InputType) {
//     return fetcherMutate(AcceptRejectPledge.Name, payload)
//   }
// }

// export class AcceptLoanOffer extends Action {
//   static Name = "AcceptLoan"
//   static InputType: {
//     request_id: string
//   }
//   static ReturnType: StartLoanMutation
//   minAuthLevel = AUTH_TYPE.USER

//   isUserAllowed() {
//     const userHasLoan = this.user.loan_requests
//       .map((lr) => lr.request_id)
//       .includes(this.payload.request_id)
//     return super.isUserAllowed() && userHasLoan
//   }

//   async run() {
//     const {
//       update_loan_requests_by_pk: loan,
//     } = await this.dbClient.acceptLoanOffer(this.payload.request_id)

//     return await this.dbClient.sdk.InsertScenarioAction({
//       action: {
//         action_type: Action_Type_Enum.ConfirmLoan,
//         payload: {
//           userEmail: this.user.email,
//           loan_id: this.payload.request_id,
//           amount: loan.amount,
//           supporters: loan.supporters.map((s) => ({
//             email: s.user.email,
//             pledge_amount: s.pledge_amount,
//           })),
//         },
//       },
//     })
//   }

//   static fetch(payload: typeof AcceptLoanOffer.InputType) {
//     return fetcherMutate(AcceptLoanOffer.Name, payload)
//   }
// }

// TODO Add dynamic type validation
export const ACTIONS = {
  [CreateUser.Name]: CreateUser,
  [CreateLoan.Name]: CreateLoan,
  [FundLoanRequest.Name]: FundLoanRequest,
  [ChangeBalance.Name]: ChangeBalance,
  [MakeRepayment.Name]: MakeRepayment,
  [SetBorrowerApproval.Name]: SetBorrowerApproval,
  [Withdraw.Name]: Withdraw,
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
