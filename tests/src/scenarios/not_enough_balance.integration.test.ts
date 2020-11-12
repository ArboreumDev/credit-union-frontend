import { Action, Scenario, System } from "lib/scenario"
import * as scenario_json from "../../fixtures/scenarios/not_enough_balance.json"
import { dbClient, sdk } from "../common/utils"

beforeEach(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  // await sdk.ResetDB()
})

test("scenario", async () => {
  const scenario = Scenario.fromJSON(scenario_json as System, dbClient)
  await scenario.initUsers()

  for (const action of scenario.actions) {
    await scenario.execute(action)
  }

  const state = await dbClient.getSystemSummary()
})
