import DbClient from "gql/db_client"
import { User_Insert_Input } from "gql/sdk"
import { addAndConfirmSupporter } from "../../tests/src/common/test_helpers"
import { NO_ROI } from "./constant"
import {
  AcceptLoanOffer,
  ChangeBalance,
  MakeRepayment,
  runAction,
} from "./gql_api_actions"
import { LoanRequestStatus, SupporterStatus } from "./types"

export interface System {
  users: User[]
  actions: Action[]
}

export interface User {
  name?: string
  email: string
  user_type: string
}
export interface DemographicInfo {
  education_years?: null
  income?: null
  credit_score?: null
}
export enum ActionType {
  ADJUST_BALANCES = "ADJUST_BALANCES",
  NEW_LOAN = "NEW_LOAN",
  CONFIRM_LOAN = "CONFIRM_LOAN",
  REPAY_LOAN = "REPAY_LOAN",
}

export interface Action {
  action_type: ActionType
  payload: any
}

// from stack overflow
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export class Scenario {
  lrMap = {}
  constructor(
    public users: User[],
    public actions: Action[],
    private dbClient: DbClient
  ) {}

  static fromJSON(scenario: System, dbClient: DbClient) {
    return new Scenario(scenario.users, scenario.actions, dbClient)
  }

  async initUsers() {
    for (const u of this.users) {
      const user: User_Insert_Input = {
        ...u,
        id: uuidv4(),
        name: u.name ?? u.email,
        onboarded: true,
        roi: NO_ROI,
      }
      await this.dbClient.sdk.CreateUser({ user })
    }
  }

  async getUser(email) {
    return this.dbClient.getUserByEmail(email)
  }

  getSession(user) {
    return { user, accessToken: null, expires: null }
  }

  _runAction(cls, user, payload: any) {
    return runAction(cls.Name, this.getSession(user), payload, this.dbClient)
  }

  async adjustBalances({ userEmail, balanceDelta }) {
    const user = await this.getUser(userEmail)

    const payload: typeof ChangeBalance.InputType = {
      delta: balanceDelta,
      userId: user.id,
    }
    return this._runAction(ChangeBalance, user, payload)
  }

  async repayLoan({ loan_id, amount }) {
    const requestId = this.lrMap[loan_id]

    const { loanRequest } = await this.dbClient.sdk.GetLoanRequest({
      requestId,
    })

    const payload: typeof MakeRepayment.InputType = {
      amount,
    }
    await this._runAction(
      MakeRepayment,
      await this.getUser(loanRequest.user.email),
      payload
    )
  }

  async newLoan({ userEmail, amount, loan_id, supporters, purpose }) {
    const user = await this.getUser(userEmail)

    const { loanRequest } = await this.dbClient.createLoanRequest(
      user.id,
      amount,
      purpose ?? ""
    )
    this.lrMap[loan_id] = loanRequest.request_id

    // confirm supporter and trigger the loan offer generation
    for (const s of supporters) {
      await this.dbClient.sdk.AddSupporter({
        supporter: {
          status: SupporterStatus.unknown,
          request_id: loanRequest.request_id,
          supporter_id: (await this.getUser(s.email)).id,
          pledge_amount: s.pledge_amount,
        },
      })
    }
  }

  async confirmLoan({ userEmail, amount, loan_id, supporters, purpose }) {
    const user = await this.getUser(userEmail)

    const { loanRequest } = await this.dbClient.createLoanRequest(
      user.id,
      amount,
      purpose ?? "purpose"
    )
    this.lrMap[loan_id] = loanRequest.request_id

    // confirm supporter and trigger the loan offer generation
    for (const s of supporters) {
      await addAndConfirmSupporter(
        this.dbClient,
        loanRequest.request_id,
        (await this.getUser(s.email)).id,
        s.pledge_amount
      )
    }

    const payload: typeof AcceptLoanOffer.InputType = {
      request_id: loanRequest.request_id,
    }
    await this._runAction(
      AcceptLoanOffer,
      await this.getUser(userEmail),
      payload
    )
  }

  async executeAction(action: Action) {
    switch (action.action_type) {
      case ActionType.ADJUST_BALANCES:
        return this.adjustBalances(action.payload)
      case ActionType.CONFIRM_LOAN:
        return this.confirmLoan(action.payload)
      case ActionType.REPAY_LOAN:
        return this.repayLoan(action.payload)
      case ActionType.NEW_LOAN:
        return this.newLoan(action.payload)
      default:
        console.log("unknown action")
        throw Error
    }
  }

  async executeAll() {
    for (const action of this.actions) await this.executeAction(action)
  }

  async addAction(action: Action) {
    this.actions.push(action)
    return action
  }
  async toJSON() {
    const { scenario_actions } = await this.dbClient.sdk.GetAllActions()
    return {
      users: (await this.dbClient.allUsers).map((u) => ({
        name: u.name,
        email: u.email,
        user_type: u.user_type,
        demographic_info: u.demographic_info,
      })),
      actions: scenario_actions,
    }
  }
}
