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
  UpdateAccountDetailsMutation,
} from "gql/sdk"
import { fetcherMutate } from "./api"
import { NO_ROI, USER_DEMOGRAPHIC } from "./constant"
import { Session, UserType } from "./types"
import { uuidv4 } from "lib/helpers"
import { algoClient } from "../../tests/src/common/utils"
import { Link } from "@chakra-ui/layout"

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

    console.log('payl', this.payload.user.kyc_approved)
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

    // // update value to be returned
    // ret.insert_user_one.account_details = data.user.account_details
    return ret
  }

  static fetch(payload: typeof CreateUser.InputType) {
    return fetcherMutate(CreateUser.Name, payload)
  }
}

export interface LinkAlgoAccountInput {
  address: string
  name: string
}

export class LinkAlgoAccount extends Action {
  static Name = "LinkAlgoAccount"
  static InputType: LinkAlgoAccountInput
  static ReturnType: UpdateAccountDetailsMutation

  minAuthLevel = AUTH_TYPE.USER

  async run() {
    return await this.dbClient.sdk.UpdateAccountDetails({
      userId: this.user.id, accountDetails: {
        ...this.user.account_details,
        algorand: {
          ...this.user.account_details.algorand,
          optedIn: {
            address: this.payload.address,
            name: this.payload.name
          }
        }
      }
    })
  }

  // TODO make sure the user is passing the address they have just signed from 
  // if they just passed another one (who has also opted in to our app), we would write info from the 
  // wrong loan into someone else profile
  // isUserAllowed() {
  //   return (
  //     super.isUserAllowed() &&
  //     this.payload &&
  //     this.payload.request &&
  //     this.payload.request.borrower_id == this.user.id
  //   )
  // }

  static fetch(payload: typeof LinkAlgoAccount.InputType) {
    return fetcherMutate(LinkAlgoAccount.Name, payload)
  }

}

export type CreateLoanPayload = {
  loanInput: typeof CreateLoan.InputType
  userAddress: string
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
    try {
      if (this.payload.approved) {
        await this.dbClient.sdk.ApproveBorrower({ creditLine })
        await this.dbClient.processOpenRequests(this.user.id)
        return true
      } else {
        await this.dbClient.sdk.RemoveBorrowerApproval(creditLine)
        return true
      }
    } catch (err) {
      console.log(err)
      const msg = `error processing requests after approval: ${JSON.stringify(err)}`
      console.log(msg)
      throw msg
    }
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

// NOTE: I dont think we need this anymore
// export class MakeRepayment extends Action {
//   static Name = "MakeRepayment"
//   static InputType: {
//     amount: number
//     loanId: string
//   }
//   static ReturnType: RegisterRepaymentMutation
//   minAuthLevel = AUTH_TYPE.USER

//   async run() {
//     return await this.dbClient.makeRepayment(
//       this.payload.loanId,
//       this.payload.amount
//     )
//     // TODO add scenario action
//     // return await this.dbClient.sdk.InsertScenarioAction({
//     //   action: {
//     //     action_type: Action_Type_Enum.RepayLoan,
//     //     payload: {
//     //       userEmail: this.user.email,
//     //       loan_id: this.payload.loanId,
//     //       amount: this.payload.amount,
//     //     },
//     //   },
//     // })
//   }
// static fetch(payload: typeof MakeRepayment.InputType) {
//   return fetcherMutate(MakeRepayment.Name, payload)
// }
// }

// TODO Add dynamic type validation
export const ACTIONS = {
  [CreateUser.Name]: CreateUser,
  [CreateLoan.Name]: CreateLoan,
  [LinkAlgoAccount.Name]: LinkAlgoAccount,
  [FundLoanRequest.Name]: FundLoanRequest,
  // [MakeRepayment.Name]: MakeRepayment,
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
