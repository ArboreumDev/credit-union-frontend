import { dec_to_perc } from "lib/currency"
import { User } from "lib/types"

export default class LenderModel {
  constructor(public user: User) {}

  get uninvested() {
    return this.user.balance
  }

  get invested() {
    return this.user.corpus_share
  }

  get totalPledgeAmount() {
    return this.user.pledges
      .map((p) => p.pledge_amount)
      .reduce((a, b) => a + b, 0)
  }

  get totalAssets() {
    return this.uninvested + this.user.corpus_share + this.totalPledgeAmount
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
    return dec_to_perc(this.totalPledgeAmount / this.totalAssets)
  }
}
