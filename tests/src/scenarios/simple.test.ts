import { MIN_SUPPORT_RATIO } from "lib/constant"
import * as simple from "../../fixtures/scenarios/simple.json"
import { addAndConfirmSupporter } from "../common/test_helpers"
import { dbClient, sdk } from "../common/utils"
import { ActionType, System } from "./types"

const scenario = simple as System
const users = scenario.state.users
const lrMap = {}

async function adjustBalances({ userId, balanceDelta }) {
  const user = users[userId]
  await sdk.ChangeUserCashBalance({
    userId: user.id,
    delta: balanceDelta,
  })
}

async function generateOffer({ userId, loan_id, amount, supporters }) {
  const user = users[userId]

  const { request } = await dbClient.createLoanRequest(
    user.id,
    amount,
    "purpose"
  )
  lrMap[loan_id] = request.request_id

  // confirm supporter and trigger the loan offer generation
  for (const sId in supporters) {
    const supporter = users[sId]
    await addAndConfirmSupporter(
      dbClient,
      request.request_id,
      supporter.id,
      amount * MIN_SUPPORT_RATIO
    )
  }
}

async function repayLoan({ loan_id, amount }) {
  const requestId = lrMap[loan_id]
  const request = await dbClient.make_repayment(requestId, amount)
}

export const actionTypeHandlerMap = {
  [ActionType.GENERATE_LOAN_OFFER]: generateOffer,
  [ActionType.ADJUST_BALANCES]: adjustBalances,
  [ActionType.REPAY_LOAN]: repayLoan,
}

beforeAll(async () => {
  await sdk.ResetDB()
  //   setup scenario
  for (const id in scenario.state.users) {
    const user = scenario.state.users[id]
    delete user.encumbered_cash
    delete user.encumbered_portfolio
    users[id] = user
    await sdk.CreateUser({ user })
  }
})

afterAll(async () => {
  await sdk.ResetDB()
})
let action
describe("Adding users and connections", () => {
  test("check scenario", async () => {
    const allUsers = await dbClient.allUsers
    expect(allUsers.length).toBe(Object.keys(scenario.state.users).length)
    const before = await dbClient.getSystemSummary()

    action = scenario.actions[0]
    await actionTypeHandlerMap[action.action_type](action.payload)

    action = scenario.actions[1]
    await actionTypeHandlerMap[action.action_type](action.payload)

    action = scenario.actions[2]
    await actionTypeHandlerMap[action.action_type](action.payload)

    const after = await dbClient.getSystemSummary()
    console.log(after)
  })
})
