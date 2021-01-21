import { Action, Scenario, System } from "lib/scenario"
import { dbClient, sdk } from "../common/utils"
import yaml from "js-yaml"
import fs from "fs"

jest.setTimeout(30000)

const execScenario = async (path) => {
  const json = yaml.load(fs.readFileSync(path, "utf8"))
  const scenario = Scenario.fromJSON(json as System, dbClient)
  await scenario.initUsers()
  await scenario.executeAll()
  return scenario
}

beforeEach(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

test("simple scenario", async () => {
  const scenario = await execScenario("tests/fixtures/scenarios/simple.yaml")

  const state = await dbClient.getSystemSummary()
  const loan = Object.values(state.loans)[0]
  expect(loan.state.repayments).toStrictEqual([
    scenario.actions[scenario.actions.length - 1].payload.amount,
  ])
})

test("full_repayment scenario", async () => {
  const scenario = await execScenario(
    "tests/fixtures/scenarios/full_repayment.yaml"
  )
  const { loanRequests } = await sdk.GetLoanRequests()
  expect(loanRequests[0].status).toBe("settled")
})

test("full_repayment_default scenario", async () => {
  const scenario = await execScenario(
    "tests/fixtures/scenarios/full_repayment_default.yaml"
  )
  const { loanRequests } = await sdk.GetLoanRequests()
  expect(loanRequests[0].status).toBe("defaulted")
})

test("second loan exposure scenario", async () => {
  const scenario = await execScenario(
    "tests/fixtures/scenarios/second_loan_reduce_expsoure.yaml"
  )
  const { loanRequests } = await sdk.GetLoanRequests()
  expect(loanRequests[0].status).toBe("live")
  expect(loanRequests[1].status).toBe("live")
})
