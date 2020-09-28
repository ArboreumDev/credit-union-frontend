import { User } from "lib/types"

export default class LenderModel {
  constructor(public user: User) {}

  get totalAssets() {
    const total_pledge_amt = this.user.pledges
      ?.map((p) => p.pledge_amount)
      .reduce((a, b) => a + b)

    return (
      this.user.balance +
      (this.user.corpus_share ?? 0) +
      (total_pledge_amt ?? 0)
    )
  }
}
