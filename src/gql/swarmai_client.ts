import { fetchJSON } from "lib/api"
import { DEFAULT_LOAN_TENOR } from "lib/constant"
import log from "lib/logger"
import {
  BorrowerInfo,
  LoanRequestInfo,
  Scenario,
  SupporterInfo,
  SwarmAiRequestMessage,
  SwarmAiResponse,
} from "lib/types"

async function fetcher(url: string, payload: any, caller?: string) {
  log(`${caller} -- req -- ${"```"}${JSON.stringify(payload)}${"```"}`)

  const res = await fetchJSON({ url, payload })
  log(`${caller} -- res -- ${"```"}${JSON.stringify(res)}${"```"}`)

  // return res
  return fetchJSON({ url, payload })
}

export default class SwarmAIClient {
  constructor(private _url: string) {}

  async acceptLoan(
    systemState: Scenario,
    latestOffer: LoanOffer
  ): Promise<SystemUpdate> {
    const payload = {
      system_state: systemState,
      loan_offer: latestOffer,
    }
    const url = this._url + "/loan/accept"
    return fetcher(url, payload, "acceptLoan")
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
    const url = this._url + "/loan/repay"
    return fetcher(url, payload, "repayLoan")
  }

  async calculateLoanOffer(params: {
    requestId: string
    loanAmount: number
    supporters: SupporterInfo[]
    borrowerInfo: BorrowerInfo
  }): Promise<SystemUpdate> {
    const payload = {
      request_msg: this.generateLoanOfferRequest(params),
    }
    const url = this._url + "/loan/request"
    return fetcher(url, payload, "calculateLoanOffer")
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
        borrower_info: borrowerInfo,
        request_id: requestId,
        tenor: tenor,
        borrower_collateral: borrowerCollateral,
        amount: loanAmount,
        supporters: supporters,
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
