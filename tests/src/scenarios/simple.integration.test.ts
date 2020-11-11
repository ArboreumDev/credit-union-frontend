import { Action, ActionType, Scenario } from "lib/scenario"
import * as simple from "../../fixtures/scenarios/simple.json"
import { dbClient, sdk } from "../common/utils"

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  // await sdk.ResetDB()
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

    // console.log(state)
    // console.log(scenario.uidMap)
    // scenario.actions.slice(0, 1).map(async (action) => {
    //   console.log(action.action_type)
    //   console.log(action.payload)
    //   await scenario.execute(action.action_type, action.payload)
    // })
    state = await dbClient.getSystemSummary()
    console.log(state)
  })
})
