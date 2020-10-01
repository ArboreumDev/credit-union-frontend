import { fetchJSON } from "lib/api"
import { DEFAULT_LOAN_TENOR, SWARMAI_URL } from "lib/constant"
import {
  BorrowerInfo,
  LoanRequestInfo,
  Scenario,
  SupporterInfo,
  SwarmAiRequestMessage,
  SwarmAiResponse,
} from "lib/types"

export default class SwarmAI {
  static async acceptLoan(
    systemState: Scenario,
    latestOffer: any
  ): Promise<any> {
    const payload = {
      system_state: systemState,
      aiResponse: latestOffer,
    }
    const url = SWARMAI_URL + "/loan/accept"
    return fetchJSON({ url, payload })
  }

  static async calculateLoanOffer(params: {
    requestId: string
    loanAmount: number
    supporters: SupporterInfo[]
    borrowerInfo: BorrowerInfo
  }): Promise<SwarmAiResponse> {
    const payload = {
      request_msg: SwarmAI.generateLoanOfferRequest(params),
    }
    const url = SWARMAI_URL + "/loan/request"
    return fetchJSON({ url, payload })
  }

  static generateLoanOfferRequest({
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