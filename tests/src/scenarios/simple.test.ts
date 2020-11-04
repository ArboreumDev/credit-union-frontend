import * as simple from "../../fixtures/scenarios/simple.json"
import { ActionType, System, User } from "./types"
import { uuidv4 } from "./utils"

const scenario = simple as System

import { dbClient, sdk } from "../common/utils"
import { Scenario, UserInfo } from "lib/types"

const users: { [id: string]: User } = {}

interface AdjustBalancePayload {
  userId: string
  balanceDelta: number
}
async function adjustBalances({ userId, balanceDelta }) {
  const user = users[userId]
  await sdk.ChangeUserCashBalance({
    userId: user.id,
    delta: balanceDelta,
  })
}

function validateAdjustBalance(
  before: Scenario,
  after: Scenario,
  payload: AdjustBalancePayload
) {
  const id = users[payload.userId].id
  const userBefore = before.users[id] as UserInfo
  const userAfter = after.users[id] as UserInfo
  return userBefore.balance + payload.balanceDelta === userAfter.balance
}

export const actionTypeHandlerMap = {
  // [ActionType.GENERATE_LOAN_OFFER]: (generateOffer),
  [ActionType.ADJUST_BALANCES]: [adjustBalances, validateAdjustBalance],
  // [ActionType.CONFIRM_LOAN_OFFER]: confirm_loan_offer,
  // [ActionType.REPAY_LOAN]: repay_loan,
}

beforeAll(async () => {
  await sdk.ResetDB()
  //   setup scenario
  for (const id in scenario.state.users) {
    const user = scenario.state.users[id]
    delete user.encumbered_cash
    delete user.encumbered_portfolio
    // const uuid = uuidv4()
    // user.id = uuid
    users[id] = user
    await sdk.CreateUser({ user })
  }
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Adding users and connections", () => {
  test("check scenario", async () => {
    const allUsers = await dbClient.allUsers
    expect(allUsers.length).toBe(Object.keys(scenario.state.users).length)
    const action = scenario.actions[0]
    const before = await dbClient.getSystemSummary()
    const [actionMethod, verify] = actionTypeHandlerMap[action.action_type]
    await actionMethod(action.payload)
    const after = await dbClient.getSystemSummary()

    expect(verify(before, after, action.payload)).toBe(true)
  })
})
