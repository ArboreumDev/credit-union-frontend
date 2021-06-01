import { dec_to_perc } from "lib/currency"
import { LoanInfo, Loan, SupporterStatus } from "lib/types"
import { Loan_Request_State_Enum, Loan_State_Enum } from "../../../gql/sdk"
export default class LoanModel {
  constructor(public _loan: Loan) {}

  get amount() {
    return this._loan.principal
  }
  get purpose() {
    return this._loan.loanRequest.purpose
  }

  get loanInfo() {
    return {}
  }

  get interestAmount() {
    return this._loan.interest_accrued
  }

  get percRepaid() {
    return dec_to_perc(
      this.amountRepaid / (this.totalOutStandingDebt + this.amountRepaid)
    )
  }
  get amountRepaid() {
    const paidPrincipal =
      this._loan.principal_overdue +
      this._loan.principal -
      this._loan.principal_remaining
    return paidPrincipal + this._loan.interest_paid
  }
  get totalOutStandingDebt() {
    return this._loan.principal_remaining + this._loan.interest_accrued
  }
  get outstandingInterest() {
    return this._loan.interest_accrued
  }
  get tenor() {
    return this._loan.tenor
  }
  get nextPayment() {
    return {
      amount: this._loan.next_payment_amount,
      date: this._loan.next_payment_due_date,
    }
  }
}
