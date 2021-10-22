import { Fetcher } from "lib/api"
import log from "lib/logger"

export enum AlgorandErrors {
  // NOT_ENOUGH_BALANCE_IN_SYSTEM = "NOT_ENOUGH_BALANCE_IN_SYSTEM",
}

const ALGO_TX_URL = "http://localhost:8001/v1/tx"
// const ALGO_TX_URL = process.env("ALGO_TX_URL")

export default class AlgoTxClient {
  private fetcher: Fetcher

  constructor(baseURL: string) {
    this.fetcher = new Fetcher(null, baseURL)
  }

  // async fetch(endpoint: string, payload: any) {
  //   log(`${endpoint} -- req -- ${"```"}${JSON.stringify(payload)}${"```"}`)

  //   const res = await this.fetcher.post(endpoint, payload)
  //   log(`${endpoint} -- res -- ${"```"}${JSON.stringify(res)}${"```"}`)
  //   return res
  // }

  /**
   * @param assetId
   * @param userAddress
   * @param currentDateTime - date which to be used as today, will default to utc.now()
   * @returns
   */
  async getAssetOptInTx(
    assetId: number,
    userAddress: string,
  ): Promise<string> {
    return this.fetcher.get(`/optIn/${assetId}/${userAddress}`, {})
  }

  /**
   * @param assetId
   * @param userAddress
   * @param currentDateTime - date which to be used as today, will default to utc.now()
   * @returns
   */
  async getUSDCDepositTx(
    userAddress: string,
    targetAddress: string,
    amount: number,
  ): Promise<string> {
    return this.fetcher.get(`/transfer/usdc/${userAddress}/${targetAddress}/${amount}`, {})
  }

}

export const algoTxClient = new AlgoTxClient(ALGO_TX_URL)