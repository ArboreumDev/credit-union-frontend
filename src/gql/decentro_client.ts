import { Fetcher, fetcher } from "lib/api"

export enum CurrencyCode {
  INR = "INR",
}
export enum Notification {
  true = 1,
  false = 0,
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&")
}

export default class DecentroClient {
  private fetcher: Fetcher

  constructor(
    baseURL: string,
    client_id: string,
    client_secret: string,
    module_secret: string
  ) {
    this.fetcher = new Fetcher(
      {
        "Content-Type": "application/json",
        client_id: client_id,
        client_secret: client_secret,
        module_secret: module_secret,
      },
      baseURL
    )
  }

  async create_virtual_account(params: {
    type: string
    bank_code: string
    name: string
    pan_number: string
    email_address: string
    mobile_number: string
    address: string
    kyc_verified: number
    kyc_check_decentro: number
    minimum_balance: string
    transaction_limit: number
    currency_code: CurrencyCode
    customer_id: string
    email_notification: Notification
    sms_notification: Notification
    callback_url: string
  }) {
    const endpoint = "/core_banking/account_linking/create_virtual_account"
    return this.fetcher.post(endpoint, params)
  }
  async get_balance(params: {
    account_number: string
    customer_id: string
    mobile_number: string
  }) {
    const endpoint = "/core_banking/money_transfer/get_balance"
    this.fetcher.get(endpoint, params)
  }
}
