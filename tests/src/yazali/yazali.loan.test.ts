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

    expect(res2.farmer.otp).not.toBe(farmer1.data.otp)
  })

  //   test("Yazali starts loan process", async () => {
  //       // a password is created and its hashed vesion is stored on the loan
  //       // loan.status = awaiting_farmer_confirmation
  //   })
  //   test("yazali enters the OTP to start the loan", async () => {
  //       // entering a wrong password does not advance the loan state
  //       // entering a correct password sets loan.status to 'awaiting_disbursal'
  //   })
  //   test("the loan is sent to rupee-circle for disbursal", async () => {
  //       // we register a loan application with RC (part dummy data, part real data)
  //   })
})
