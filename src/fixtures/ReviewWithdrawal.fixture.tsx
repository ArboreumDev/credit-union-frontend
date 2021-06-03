import { Details } from "components/common/Details"
import { ReviewWithdrawal, Props } from "../components/lender/ReviewWithdrawal"
import { TransactionDetails } from "../components/common/TransactionDetails"
import { UserTransaction } from "lib/types"
import {
  transferToUserTransaction,
  payoutToUserTransaction,
} from "../gql/wallet/circle_client"

const props = {
  details: {
    targetAddress: "0xdeadbeef",
    amount: "500",
  },
} as Props

const transfer = {
  type: "Withdrawal",
  amount: "1.00",
  status: "complete",
  createDate: "2021-05-04T16:14:57.930Z",
  destination: "ETH",
  source: "WALLET",
  details: {
    id: "e9275778-667c-4bdb-81a8-e785415cf6bc",
    source: {
      type: "wallet",
      id: "1000088128",
    },
    destination: {
      type: "blockchain",
      address: "0x2Db98f725Ce52ddAf5dC8c87d3b32b258DE8117b",
      chain: "ETH",
    },
    amount: {
      amount: "1.00",
      currency: "USD",
    },
    transactionHash:
      "0xa2d90dcfd0de123b13a1ab46453e3c94379f8b3c0d08d8e8fedad8a2e9184570",
    status: "complete",
    createDate: "2021-05-04T16:14:57.930Z",
  },
} as UserTransaction

export default {
  review: <ReviewWithdrawal handleConfirm={null} details={props.details} />,
  tx: <TransactionDetails tx={transfer} />,
}
