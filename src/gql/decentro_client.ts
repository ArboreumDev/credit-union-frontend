export default class DecentroClient {
  constructor(
    private base_url: string,
    private client_id: string,
    private client_secret: string,
    private module_secret: string
  ) {}

  private async _fetch(url: string, payload) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        client_id: this.client_id,
        client_secret: this.client_secret,
        module_secret: this.module_secret,
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    if (response.ok) {
      return data
    }

    const error = new Error(response.statusText)
    console.error(JSON.stringify(data))
    throw error
  }
  async create_virtual_account() {
    const url =
      this.base_url + "/core_banking/account_linking/create_virtual_account"

    return this._fetch(url, {
      type: "virtual",
      bank_code: "yesb",
      name: "somefirst somelast",
      pan_number: "abcdefg",
      email_address: "some_email@mail.com",
      mobile_number: "9999999999",
      address: "some_physical_address",
      kyc_verified: 1,
      kyc_check_decentro: 0,
      minimum_balance: "100",
      transaction_limit: "100000",
      currency_code: "INR",
      customer_id: "MER0001",
      email_notification: 1,
      sms_notification: 1,
      callback_url: "some_callback_url",
    })
  }
}
