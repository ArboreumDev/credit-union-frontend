import { useForm } from "react-hook-form"
import { AiOutlineFileDone } from "react-icons/ai"
import { dec_to_perc } from "lib/currency"
import {
  CalculatedRisk,
  LoanRequest,
  SwarmAiResponse,
  SupporterStatus,
  LoanInfo,
} from "lib/types"
import { Currency } from "components/common/Currency"
import { AcceptLoanOffer } from "lib/gql_api_actions"

export default class LoanModel {
  constructor(public loan: LoanRequest) {}

  get confirmedSupporters() {
    return this.loan.supporters.filter(
      (x) => x.status == SupporterStatus.confirmed
    )
  }

  get calculatedRisk() {
    return this.loan.risk_calc_result.latestOffer as SwarmAiResponse
  }

  get loanInfo() {
    return this.calculatedRisk.loan_info
  }

  get borrowerAPR() {
    return this.loanInfo.borrower_apr
  }

  get interestAmount() {
    return this.loanInfo.borrower_apr * this.loan.amount
  }

  get totalAmountToRepay() {
    return this.loan.amount + this.loanInfo.borrower_apr * this.loan.amount
  }

  /**
   * Loan tenor in months
   */
  get tenor() {
    return this.loanInfo.tenor
  }

  get nextPayment() {
    return this.calculatedRisk.loan_schedule.next_borrower_payment
  }
}
