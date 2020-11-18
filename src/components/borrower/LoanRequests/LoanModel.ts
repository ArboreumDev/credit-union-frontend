import { dec_to_perc } from "lib/currency"
import {
  LoanInfo,
  LoanRequest,
  LoanRequestStatus,
  SupporterStatus,
} from "lib/types"

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

  get percRepaid() {
    return dec_to_perc(
      this.amountRepaid / (this.totalOutStandingDebt + this.amountRepaid)
    )
  }
  get amountRepaid() {
    return this.borrowerView.total_payments.paid
  }
  get totalOutStandingDebt() {
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
