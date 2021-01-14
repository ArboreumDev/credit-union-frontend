import { Fetcher, fetchJSON } from "lib/api"
import { DEFAULT_LOAN_TENOR } from "lib/constant"
import log from "lib/logger"
import {
  BorrowerInfo,
  LoanRequestInfo,
  Scenario,
  SupporterInfo,
  LoanOffer,
  RequestedTerms,
  SwarmAiRequestMessage,
  SystemUpdate,
} from "lib/types"

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

  async acceptLoan(
    systemState: Scenario,
    latestOffer: LoanOffer
  ): Promise<SystemUpdate> {
    const payload = {
      system_state: systemState,
      loan_offer: latestOffer,
    }

    return this.fetch("/loan/accept", payload)
  }

  async make_repayment(
    systemState: Scenario,
    loan_id: string,
    amount: number
  ): Promise<SystemUpdate> {
    const payload = {
      system_state: systemState,
      loan_id,
      amount,
    }

    return this.fetch("/loan/repay", payload)
  }
  g

  async calculateLoanOffer(params: {
    requestId: string
    loanAmount: number
    supporters: SupporterInfo[]
    borrowerInfo: BorrowerInfo
  }): Promise<SystemUpdate> {
    const payload = {
      request_msg: this.generateLoanOfferRequest(params),
    }

    return this.fetch("/loan/request", payload)
  }

  generateLoanOfferRequest({
    requestId,
    loanAmount,
    borrowerInfo,
    supporters,
    borrowerCollateral = 0,
    tenor = DEFAULT_LOAN_TENOR,
  }: {
    requestId: string
    loanAmount: number
    borrowerInfo: BorrowerInfo
    supporters: SupporterInfo[]
    borrowerCollateral?: number
    tenor?: number
  }): SwarmAiRequestMessage {
    // ============ optimizer context =============================
    // not needed while we use backup model
    // read more here: https://github.com/ArboreumDev/frontend/blob/65db3a62778d9cc84ee859dd29562b469f7adf2c/src/gql/db_client.ts#L218

    return {
      loan_request_info: {
        request_id: requestId,
        terms: {
          request_id: requestId,
          borrower_info: borrowerInfo,
          tenor: tenor,
          amount: loanAmount,
          borrower_collateral: borrowerCollateral,
          supporters: supporters,
        } as RequestedTerms,
      } as LoanRequestInfo,
      // optimizer_context: {
      // risk_free_apr: DEFAULT_RISK_FREE_INTEREST_RATE,
      // supporter_corpus_share: supporterCorpusShare || 0,
      // loans_in_corpus: liveLoanInfo,
      // corpus_cash: totalCorpusCash,
      // supporter_cash: totalCorpusCash,
      // novation: false,
      // } as OptimizerContext,
      // risk_assessment_context: {
      // central_risk_info: DEFAULT_RECOMMENDATION_RISK_PARAMS,
      // } as RiskInput,
    }
  }
}
