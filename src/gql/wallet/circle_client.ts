import { Fetcher } from "lib/api"
import { Bank } from "./bank"

export enum CurrencyCode {
  INR = "INR",
}
export enum Notification {
  true = 1,
  false = 0,
}

// sandbox
const CIRCLE_API_KEY =
  "QVBJX0tFWTo1NWE2MDdjZDNjYjNjZjk0N2Q4MmU0MWFkNTEyYzIyYTo1NmEyY2NmZDAwYzIwNmY0ZWZhYTVkMzI3MTA4NmM3Yw"
export const CIRCLE_BASE_URL = "https://api-sandbox.circle.com/"

export default class CircleClient extends Bank {
  private fetcher: Fetcher

  constructor(
    baseURL: string
    // api_secret: string,
  ) {
    super()
    this.fetcher = new Fetcher(
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CIRCLE_API_KEY}`,
      },
      baseURL
    )
  }

  async createAccount(params: { idempotencyKey: string; description: string }) {
    const endpoint = "v1/wallets"
    const { data } = await this.fetcher.post(endpoint, params)
    return data
    // returns:
    // {

    //     "data":{
    //     "walletId":"434000"
    //     "entityId":"fc988ed5-c129-4f70-a064-e5beb7eb8e32"
    //     "type":"end_user_wallet"
    //     "description":"Treasury Wallet"
    //     "balances":[
    //     {
    //     "amount":"3.14"
    //     "currency":"USD"
    //     }
    //     ]
    //     }
    // }
  }

  async getBalance(walletId: string) {
    const endpoint = `/v1/wallets/${walletId}`
    const { data } = await this.fetcher.get(endpoint, {})
    return data.balances
    // returns
    // {
    //     "data":{
    //         "walletId":"434000"
    //         "entityId":"fc988ed5-c129-4f70-a064-e5beb7eb8e32"
    //         "type":"end_user_wallet"
    //         "description":"Treasury Wallet"
    //        "balances":[ {"amount":"3.14", "currency":"USD" } ]
    // } }
  }
}

export const circle = new CircleClient(CIRCLE_BASE_URL)