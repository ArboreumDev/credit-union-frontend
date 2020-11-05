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
      [LoanRequestStatus.active, LoanRequestStatus.settled].includes(
        this._loan.status
      )
    ) {
      return this._loan.loan as LoanInfo
    } else {
      console.log(this._loan.status)
      return this.calculatedRisk.latestOffer as LoanInfo
    }
  }

  get borrowerAPR() {
    return this.loanInfo.terms.borrower_apr
  }

  get borrowerView() {
    return this.loanInfo.schedule.borrower_view
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

  get remainingPayment() {
    return this.borrowerView.total_payments.remain
  }

  get amountRepaid() {
    return this.borrowerView.total_payments.paid
  }

  get percRepaid() {
    return dec_to_perc(
      this.amountRepaid / (this.remainingPayment + this.amountRepaid)
    )
  }
  get outstandingPrincipal() {
    return this.borrowerView.total_payments.remain
  }
  get outstandingInterest() {
    const bv = this.borrowerView
    return bv.corpus_interest.remain + bv.supporter_interest.remain
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
