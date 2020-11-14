import { FARMER1, FARMER2 } from "./yazali_fixtures"
import { dbClient, sdk } from "../common/utils"

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Yazali Loan Flow", () => {
  test("write farmer to table ", async () => {
    const res1 = await dbClient.addFarmer(FARMER1)
    const farmer1 = res1.farmer
    expect(farmer1.data.info.name).toBe(FARMER1.name)

    const res2 = await dbClient.addFarmer(FARMER2)
    expect(res2.farmer.data.terms.principal).toBeGreaterThan(
      farmer1.data.terms.principal
    )

    // verify otp's are different
    expect(res2.farmer.otp).not.toBe(farmer1.data.otp)
  })
  test("get farmers", async () => {
    const { farmers } = await sdk.GetAllFarmers()
    expect(farmers.length).toBe(2)
  })
})
