import { dec_to_perc } from "lib/currency"
import {
  LoanRequestStatus,
  User,
  LoanScheduleSummary,
  Receiver,
} from "lib/types"

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

  // helper function to get extract the total outstanding to supporter or corpus from a loanschedule summary
  outstandingTo(s: LoanScheduleSummary, receiver: Receiver) {
    if (receiver == Receiver.Corpus) {
      return (
        s.borrower_view.corpus_interest.remain +
        s.borrower_view.corpus_principal.remain
      )
    } else {
      return (
        s.borrower_view.supporter_interest.remain +
        s.borrower_view.supporter_principal.remain
      )
    }
  }

  get lenderAPY() {
    // apy is a average of all apr the lender is involved in, weighted by the amount that is still outstanding on the loan
    // TODO: this is suboptimal, in reality it should be the same sum, but taken over ALL loans where the user is not a not a supporter,
    //  but for that we need to either
    //  - pass down all live-loans
    //  - or compute it somewhere up and then pass it down
    const totalOutstanding = this.user.active_loans
      .map((l) =>
        this.outstandingTo(l.loan_request.loan.schedule, Receiver.Corpus)
      )
      .reduce((a, b) => a + b, 0)

    const weightedAverage = this.user.active_loans
      .map(
        (l) =>
          (l.percentage *
            this.outstandingTo(l.loan_request.loan.schedule, Receiver.Corpus)) /
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
