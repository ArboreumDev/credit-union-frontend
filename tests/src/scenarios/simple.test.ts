import * as simple from "../../fixtures/scenarios/simple.json"
import { System } from "../../fixtures/scenarios/types"
import { uuidv4 } from "../common/utils"

const scenario = simple as System

import { dbClient, sdk } from "../common/utils"

beforeAll(async () => {
  await sdk.ResetDB()
  //   setup scenario
  for (const username in scenario.state.users) {
    const user = scenario.state.users[username]
    delete user.encumbered_cash
    delete user.encumbered_portfolio
    user.id = uuidv4()
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
  })
})
