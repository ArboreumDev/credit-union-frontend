import { Action, Scenario, System } from "lib/scenario"
import * as simple from "../../fixtures/scenarios/simple.json"
import { dbClient, sdk } from "../common/utils"

beforeEach(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Scenario unit tests", () => {
  test("create scenario", async () => {
    const scenario = new Scenario(simple.users, [], dbClient)
    simple.actions.map((a) => scenario.addAction(a as Action))

    expect(scenario.actions).toStrictEqual(simple.actions)
  })

  test("actions", async () => {
    const scenario = new Scenario(
      simple.users,
      simple.actions as Action[],
      dbClient
    )
    await scenario.initUsers()
    const allUsers = await dbClient.allUsers

    expect(allUsers.length).toBe(scenario.users.length)

    let state = await dbClient.getSystemSummary()

    // change balance test
    const cb_action = scenario.actions[0]
    await scenario.executeAction(cb_action)
    state = await dbClient.getSystemSummary()
    const user = Object.values(state.users).filter(
      (u) => u.email == cb_action.payload.userEmail
    )[0]
    expect(user.balance).toBe(cb_action.payload.balanceDelta)
    await scenario.executeAction(scenario.actions[1])

    // create loan offer
    const clo_action = scenario.actions[2]
    await scenario.executeAction(clo_action)
    state = await dbClient.getSystemSummary()
    expect(Object.keys(state.loan_offers).length).toBe(0)
    expect(Object.keys(state.loans).length).toBe(1)

    // repay loan offer
    const repay_action = scenario.actions[3]
    await scenario.executeAction(repay_action)
    state = await dbClient.getSystemSummary()
    const loan = Object.values(state.loans)[0]
    expect(loan.state.repayments).toStrictEqual([repay_action.payload.amount])
  })
})
let generated_json
test("simple scenario", async () => {
  const scenario = Scenario.fromJSON(simple as System, dbClient)
  await scenario.initUsers()
  await scenario.executeAll()

  const state = await dbClient.getSystemSummary()
  const loan = Object.values(state.loans)[0]
  expect(loan.state.repayments).toStrictEqual([
    scenario.actions[scenario.actions.length - 1].payload.amount,
  ])
  generated_json = JSON.stringify(await scenario.toJSON())
})

test("from generated", async () => {
  // console.log(generated_json)
  const scenario = Scenario.fromJSON(
    JSON.parse(generated_json) as System,
    dbClient
  )
  await scenario.initUsers()
  await scenario.executeAll()
})
