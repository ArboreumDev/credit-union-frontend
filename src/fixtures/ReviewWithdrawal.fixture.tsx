import { Details } from "components/common/Details"
import { ReviewWithdrawal, Props } from "../components/lender/ReviewWithdrawal"

const props = {
  details: {
    targetAddress: "0xdeadbeef",
    amount: "500",
  },
} as Props

export default {
  reviewWithdrawal: (
    <ReviewWithdrawal handleConfirm={null} details={props.details} />
  ),
}
