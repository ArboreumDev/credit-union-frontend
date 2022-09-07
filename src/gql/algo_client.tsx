import { Fetcher } from "lib/api"
import log from "lib/logger"

export enum AlgorandErrors {
  // NOT_ENOUGH_BALANCE_IN_SYSTEM = "NOT_ENOUGH_BALANCE_IN_SYSTEM",
}

const ALGO_BACKEND_URL = process.env.NEXT_PUBLIC_ALGO_BACKEND_URL
console.log('alg from env', ALGO_BACKEND_URL) // TODO WHY?

export type NewAssetResponse = {
  assetId: number,
  txId: string
}

export default class AlgoClient {
  private fetcher: Fetcher

  constructor(baseURL: string, secret: string = "") {
    console.log('got base', baseURL)
    const headers = {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${process.env.ALGO_BACKEND_SECRET}`
      "Authorization": `Bearer ${secret}`
    }
    this.fetcher = new Fetcher(headers, baseURL)
    // TODO see if algo-backend is live
    // this.fetcher.get("", {}).then((res) => {
    //   console.log('res', res)
    //   if (!res) {
    //     console.log('algo backend not found')
    //     // throw "Algo Backend not reachable"
    //   }
    // })
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
    return this.fetcher.post(`/log/new`, payload)
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
    return this.fetcher.post(`/log/${assetId}`, {data})
  }

  async getCreditProfileOptInTx(
    userAddress: string,
  ): Promise<string> {
    return this.fetcher.get(`/tx/optIn/profile/${userAddress}`, {})
  }

  async isOptedInToAsset(
    userAddress: string,
    assetId: number,
  ): Promise<boolean> {
    return this.fetcher.get(`/state/optIn/asset/${assetId}/${userAddress}`, {})
  }

  async isOptedInToProfileApp(
    userAddress: string,
  ): Promise<boolean> {
    return this.fetcher.get(`/state/optIn/profile/${userAddress}`, {})
  }

  async createNewProfile(
    activeLoan: number,
    loanState: string,
    userAddress: string,
  ): Promise<string> {
    const payload = { activeLoan, loanState, userAddress }
    return this.fetcher.post(`/profile/new/`, payload)
  }

  /**
   * 
   * @param activeLoan the assetId of the nft where all loan data is logged
   * @param loanState new loan state
   * @param userAddress where the local storage should be modified
   * @returns 
   */
  async updateProfile(
    activeLoan: number,
    loanState: string,
    userAddress: string,
  ): Promise<string> {
    const payload = { activeLoan, loanState, userAddress }
    return this.fetcher.post(`/profile/update/${userAddress}`, payload)
  }

  async getLocalState(address: string) {
  return this.fetcher.get(`/state/local/now/${address}`, {})
  }

  async optInSampleBorrower() {
  return this.fetcher.get("/test/optIn/new", {})
  }
}

// use this client when we only want to fetch transactions
export const algoTxClient = new AlgoClient(ALGO_BACKEND_URL)

// use this client when we want to trigger the master account to do things
 // TODO load from env
// const BACKEND_SECRET = 'sWUCzK7ZaT5E8zgWY95wUL1e6cNpJli5DzcwAYXsRpw='
const BACKEND_SECRET = process.env.ALGO_BACKEND_SECRET
export const algoActionClient = new AlgoClient(ALGO_BACKEND_URL, BACKEND_SECRET)