import DbClient from "gql/db_client"
import { User_Insert_Input } from "gql/sdk"
import { addAndConfirmSupporter } from "../../tests/src/common/test_helpers"

export interface System {
  users: User[]
  actions: Action[]
}

export interface User {
  balance: number
  name: string
  email: string
  user_type: string
}
export interface DemographicInfo {
  education_years?: null
  income?: null
  credit_score?: null
}
export enum ActionType {
  GENERATE_LOAN_OFFER = "GENERATE_LOAN_OFFER",
  ADJUST_BALANCES = "ADJUST_BALANCES",
  CONFIRM_LOAN_OFFER = "CONFIRM_LOAN_OFFER",
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
  uidMap: { [uid: string]: User_Insert_Input } = {}
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
      }
      this.uidMap[u.name] = user
      await this.dbClient.sdk.CreateUser({ user })
    }
  }

  async adjustBalances({ userId, balanceDelta }) {
    const user = this.uidMap[userId]
    await this.dbClient.sdk.ChangeUserCashBalance({
      userId: user.id,
      delta: balanceDelta,
    })
  }

  async generateOffer({ userId, loan_id, amount, supporters }) {
    const user = this.uidMap[userId]

    const { loanRequest } = await this.dbClient.createLoanRequest(
      user.id,
      amount,
      "purpose"
    )
    this.lrMap[loan_id] = loanRequest.request_id

    // confirm supporter and trigger the loan offer generation
    for (const s of supporters) {
      // supporters.map(
      // async (s) =>
      await addAndConfirmSupporter(
        this.dbClient,
        loanRequest.request_id,
        this.uidMap[s.id].id,
        s.pledge_amount
      )
      // )
    }
  }

  async repayLoan({ loan_id, amount }) {
    const requestId = this.lrMap[loan_id]
    await this.dbClient.make_repayment(requestId, amount)
  }

  async acceptLoan({ loan_id }) {
    const requestId = this.lrMap[loan_id]
    await this.dbClient.acceptLoanOffer(requestId, "latestOffer")
  }

  async execute(action: Action) {
    switch (action.action_type) {
      case ActionType.ADJUST_BALANCES:
        return this.adjustBalances(action.payload)
      case ActionType.GENERATE_LOAN_OFFER:
        return this.generateOffer(action.payload)
      case ActionType.CONFIRM_LOAN_OFFER:
        return this.acceptLoan(action.payload)
      case ActionType.REPAY_LOAN:
        return this.repayLoan(action.payload)
      default:
        console.log("unknown action")
        throw Error
    }
  }

  async addAction(action: Action) {
    this.actions.push(action)
    return action
  }
  async toJSON() {
    return { users: this.users, actions: this.actions }
  }
}
