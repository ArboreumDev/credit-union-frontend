import { dec_to_perc } from "lib/currency"
import { LoanRequestStatus, User } from "lib/types"

export default class LenderModel {
  constructor(public user: User) {}

  get uninvested() {
    return this.user.balance - this.totalPledgeUnconfirmedAmount
  }

  get invested() {
    return this.user.corpus_share
  }

  get totalPledgeUnconfirmedAmount() {
    return this.user.pledges
      .filter((p) => p.loan_request.status != LoanRequestStatus.active)
      .map((p) => p.pledge_amount)
      .reduce((a, b) => a + b, 0)
  }

  get totalPledgeAndConfirmedAmount() {
    return this.user.pledges
      .filter((p) => p.loan_request.status === LoanRequestStatus.active)
      .map((p) => p.pledge_amount)
      .reduce((a, b) => a + b, 0)
  }

  get pledged() {
    return (
      this.totalPledgeAndConfirmedAmount + this.totalPledgeUnconfirmedAmount
    )
  }

  get totalAssets() {
    return this.uninvested + this.invested + this.pledged
  }

  get APY() {
    // TODO supporter APY
    return this.lenderAPY
  }

  get supporterAPY() {
    // TODO
    return 0.2
  }

  get lenderAPY() {
    // apy is a average of all apr the lender is involved in, weighted by the amount that is still outstanding on the loan
    // NOTE: this is a hack, in reality it should be the same sum, but taken over all loans, where they
    // are not a supporter, but for that we need to either
    //  - pass down all live-loans
    //  - or compute it somewhere up and then pass it down
    const totalOutstanding = this.user.active_loans
      .map((l) => l.loan_request.to_corpus[0].amount_remain)
      .reduce((a, b) => a + b, 0)

    const weightedAverage = this.user.active_loans
      .map(
        (l) =>
          (l.percentage * l.loan_request.to_corpus[0].amount_remain) /
          totalOutstanding
      )
      .reduce((a, b) => a + b, 0)

    return dec_to_perc(weightedAverage)
  }

  get percInvested() {
    return dec_to_perc(this.invested / this.totalAssets)
  }
  get percUninvested() {
    return dec_to_perc(this.uninvested / this.totalAssets)
  }
  get percPledged() {
    return dec_to_perc(this.totalPledgeUnconfirmedAmount / this.totalAssets)
  }
}
