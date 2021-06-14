import { Fetcher } from "lib/api"
import log from "lib/logger"
import { Repayment, LoanState } from "lib/types"

export enum SwarmAIErrors {
  NOT_ENOUGH_BALANCE_IN_SYSTEM = "NOT_ENOUGH_BALANCE_IN_SYSTEM",
}

export default class SwarmAIClient {
  private fetcher: Fetcher

  constructor(baseURL: string) {
    this.fetcher = new Fetcher(null, baseURL)
  }

  async fetch(endpoint: string, payload: any) {
    log(`${endpoint} -- req -- ${"```"}${JSON.stringify(payload)}${"```"}`)

    const res = await this.fetcher.post(endpoint, payload)
    log(`${endpoint} -- res -- ${"```"}${JSON.stringify(res)}${"```"}`)
    return res
  }

  /**
   * @param loanTerms
   * @param repayments
   * @param currentDateTime - date which to be used as today, will default to utc.now()
   * @returns
   */
  async getLoanState(
    loanTerms,
    repayments: Array<Repayment>,
    currentDateTimeUTC = ""
  ): Promise<LoanState> {
    const payload = {
      loan: {
        terms: loanTerms,
        repayments,
        current_datetime_utc: currentDateTimeUTC || new Date().toUTCString(),
      },
    }
    return this.fetch("/loan/bullet", payload)
  }
}
