import { CurrencyCode, Notification } from "gql/decentro_client"
import { decentro } from "../common/utils"

describe("Decentro tests", () => {
  test("create account", async () => {
    const req = {
      type: "virtual",
      bank_code: "yesb",
      name: "somefirst somelast",
      pan_number: "abcdefg",
      email_address: "some_email@mail.com",
      mobile_number: "9999999999",
      address: "some_physical_address",
      kyc_verified: 1,
      kyc_check_decentro: 0,
      minimum_balance: 100,
      transaction_limit: 100000,
      currency_code: CurrencyCode.INR,
      customer_id: "MER0001",
      email_notification: Notification.true,
      sms_notification: Notification.true,
      callback_url: "some_callback_url",
    }
    const res = await decentro.create_virtual_account(req)
    console.log(res)
    expect(res.minimumBalance).toBe(req.minimum_balance)
  })
})
