import { Action, Scenario, System } from "lib/scenario"
import * as simple from "../../fixtures/scenarios/simple.json"
import { dbClient, sdk } from "../common/utils"

beforeEach(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Adding users and connections", () => {
  test("create scenario", async () => {
    const scenario = new Scenario(simple.users, [], dbClient)
    scenario.addAction(simple.actions[0] as Action)
    scenario.addAction(simple.actions[1] as Action)
    scenario.addAction(simple.actions[2] as Action)
    scenario.addAction(simple.actions[3] as Action)

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
    await scenario.execute(cb_action)
    state = await dbClient.getSystemSummary()
    const user = Object.values(state.users).filter(
      (u) => u.name == cb_action.payload.userId
    )[0]
    expect(user.balance).toBe(cb_action.payload.balanceDelta)

    // create loan offer
    const clo_action = scenario.actions[1]
    await scenario.execute(clo_action)
    state = await dbClient.getSystemSummary()
    expect(Object.keys(state.loan_offers).length).toBe(1)

    // accept loan offer
    const accept_action = scenario.actions[2]
    await scenario.execute(accept_action)
    state = await dbClient.getSystemSummary()
    expect(Object.keys(state.loan_offers).length).toBe(0)
    expect(Object.keys(state.loans).length).toBe(1)

    // repay loan offer
    const repay_action = scenario.actions[3]
    await scenario.execute(repay_action)
    state = await dbClient.getSystemSummary()
    const loan = Object.values(state.loans)[0]
    expect(loan.state.repayments).toStrictEqual([repay_action.payload.amount])
  })
  test("simple scenario", async () => {
    const scenario = Scenario.fromJSON(simple as System, dbClient)
    await scenario.initUsers()

    for (const action of scenario.actions) {
      await scenario.execute(action)
    }

    const state = await dbClient.getSystemSummary()
    const loan = Object.values(state.loans)[0]
    expect(loan.state.repayments).toStrictEqual([
      scenario.actions[scenario.actions.length - 1].payload.amount,
    ])
  })
})
