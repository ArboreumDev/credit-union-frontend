import { useForm } from "react-hook-form"
import { AiOutlineFileDone } from "react-icons/ai"
import { dec_to_perc } from "lib/currency"
import {
  CalculatedRisk,
  LoanRequest,
  SupporterStatus,
  LoanInfo,
  LoanOffer,
} from "lib/types"
import { Currency } from "components/common/Currency"
import { AcceptLoanOffer } from "lib/gql_api_actions"

export default class LoanModel {
  constructor(public _loan: LoanRequest) {}

  get amount() {
    return this._loan.amount
  }
  get purpose() {
    return this._loan.purpose
  }

  get confirmedSupporters() {
    return this._loan.supporters.filter(
      (x) => x.status == SupporterStatus.confirmed
    )
  }

  get calculatedRisk() {
    return this._loan.risk_calc_result.latestOffer as LoanOffer
  }

  get loanInfo() {
    return this.calculatedRisk.init_info
  }

  get borrowerAPR() {
    return this.loanInfo.borrower_apr
  }

  get interestAmount() {
    return this.loanInfo.borrower_apr * this.amount
  }

  get totalAmountToRepay() {
    // TODO: Should use borrowerview.total_paynents for this?
    return this.amount + this.loanInfo.borrower_apr * this.amount
  }

  get borrowerView() {
    return this.calculatedRisk.loan_schedule.borrower_view
  }

  get amountRepaid() {
    return this.borrowerView.total_payments.paid
  }
  get percRepaid() {
    return dec_to_perc(this.amountRepaid / this.amount)
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
