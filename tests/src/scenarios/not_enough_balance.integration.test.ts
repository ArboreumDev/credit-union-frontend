import { SwarmAIErrors } from "gql/swarmai_client"
import { Action, Scenario, System } from "lib/scenario"
import * as scenario_json from "../../fixtures/scenarios/not_enough_balance.json"
import { dbClient, sdk } from "../common/utils"

beforeEach(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

test("scenario", async () => {
  const scenario = Scenario.fromJSON(scenario_json as System, dbClient)
  await scenario.initUsers()
  try {
    await scenario.executeAll()
  } catch (e) {
    expect(e.data.detail).toContain("ERROR: not enough free cash")
  }

  const state = await dbClient.getSystemSummary()
})
