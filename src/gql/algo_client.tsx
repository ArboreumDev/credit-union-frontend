import { Fetcher } from "lib/api"
import log from "lib/logger"

export enum AlgorandErrors {
  // NOT_ENOUGH_BALANCE_IN_SYSTEM = "NOT_ENOUGH_BALANCE_IN_SYSTEM",
}

const ALGO_BACKEND_URL = process.env.ALGO_BACKEND_URL
console.log('alg from env', ALGO_BACKEND_URL) // TODO WHY?

export type NewAssetResponse = {
  assetId: number,
  txId: string
}

export default class AlgoClient {
  private fetcher: Fetcher

  constructor(baseURL: string) {
    const headers = {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${process.env.ALGO_BACKEND_SECRET}`
      "Authorization": 'Bearer sWUCzK7ZaT5E8zgWY95wUL1e6cNpJli5DzcwAYXsRpw=' // TODO load from env
    }
    this.fetcher = new Fetcher(headers, baseURL)
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
    return this.fetcher.get(`/tx/optIn/${assetId}/${userAddress}`, {})
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
    return this.fetcher.get(`/tx/transfer/usdc/${userAddress}/${targetAddress}/${amount}`, {})
  }

  /**
   * @param loanParams basic data on the loan to be tokenized, will be stored in token-metadata
   * @returns the txId & the assetId of the created token
   */
  async tokenizeLoan(
    loanParams: any
  ): Promise<NewAssetResponse> {
    const payload = {
      assetName: "LoanAsset", // TODO give it an appropriate name
      loanParams

    }
    return this.fetcher.post(`/v1/log/new`, payload)
  }

  /**
   * @param assetId of the token to be logged with
   * @param data to be attached in the notefield of the tx
   * @returns the txId 
   */
  async logRepayment(
    assetId: any,
    data: any
  ): Promise<NewAssetResponse> {
    return this.fetcher.post(`/v1/log/${assetId}`, {data})
  }



}

export const algoTxClient = new AlgoClient(ALGO_BACKEND_URL)