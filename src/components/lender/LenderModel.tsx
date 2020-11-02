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
    return dec_to_perc(0.163)
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
