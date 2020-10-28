import { useForm } from "react-hook-form"
import { AiOutlineFileDone } from "react-icons/ai"
import { dec_to_perc } from "lib/currency"
import {
  LoanRequest,
  SupporterStatus,
  LoanInfo,
  LoanRequestStatus,
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
    return this._loan.risk_calc_result
  }

  get loanInfo() {
    if (
      this._loan.status in [LoanRequestStatus.active, LoanRequestStatus.settled]
    ) {
      return this._loan.loan as LoanInfo
    } else {
      return this.calculatedRisk.latestOffer as LoanInfo
    }
  }

  get borrowerAPR() {
    console.log(this.loanInfo)
    return this.loanInfo.terms.borrower_apr
  }

  get interestAmount() {
    const corpus_interest =
      this.borrowerView.corpus_interest.remain +
      this.borrowerView.corpus_interest.paid
    const supporter_interest =
      this.borrowerView.supporter_interest.remain +
      this.borrowerView.supporter_interest.paid
    return corpus_interest + supporter_interest
  }

  get totalAmountToRepay() {
    return this.borrowerView.total_payments.remain
  }

  get borrowerView() {
    return this.loanInfo.schedule.borrower_view
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
    return this.loanInfo.terms.tenor
  }

  get nextPayment() {
    return this.loanInfo.schedule.next_borrower_payment
  }
}
