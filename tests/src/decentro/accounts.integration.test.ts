import DecentroClient, {
  CurrencyCode,
  Notification,
} from "gql/wallet/decentro_client"

global.fetch = require("node-fetch")

export const decentro = new DecentroClient(
  "https://in.staging.decentro.tech",
  "arboreum_staging",
  "5aoTBWhjzeOz4GNI7zocGXV3XgozyejA",
  "KDTtCWDkcIfVKEEZlYCNMljnFM8SwM0L"
)

describe("Decentro tests", () => {
  test.skip("create account", async () => {
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
    const res = await decentro.createAccount(req)
    expect(res.minimumBalance).toBe(req.minimum_balance)
  })
})
