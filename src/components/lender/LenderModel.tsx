import { dec_to_perc } from "lib/currency"
import { User } from "lib/types"
import { Loan_Request_State_Enum } from "../../gql/sdk"

export default class LenderModel {
  constructor(public user: User) {}

  get uninvested() {
    return this.user.balance
  }

  get invested() {
    return 1000
  }

  get totalAssets() {
    return this.uninvested + this.invested
  }

  get APY() {
    return dec_to_perc(0.14)
  }

  get expectedInterest() {
    return 0.14
  }

  get earnedInterest() {
    return 1000
  }

  get percInvested() {
    return dec_to_perc(this.invested / this.totalAssets)
  }
  get percUninvested() {
    return dec_to_perc(this.uninvested / this.totalAssets)
  }
}
