import { Box, Select, Text, Divider} from "@chakra-ui/core"
import Address from "components/common/algorand/Address"
import BankAccount from "components/common/BankAccount"
import { useState } from "react"
import { LoanRepayInfo } from "lib/types"
import {DepositWithAlgoConnect} from "components/common/algorand/DepositWidget"

interface Props {
  loan: LoanRepayInfo
}

/**
 * this is 90% the same component as the AddFundsForm TODO how can this be refactored?
 * @param param0 this 
 * @returns 
 */
export function RepaymentsForm({ loan }: Props) {
  const [method, setMethod] = useState(undefined)

  const suggestedAmounts = [
    {
      amount: Math.ceil(loan.next_payment_amount),
      description: "next due payment"
    },
    {
      amount: Math.ceil(loan.interest_accrued + loan.principal_overdue + loan.principal_remaining),
      description: "full repayment"
    }
  ]
  console.log('sugge', suggestedAmounts)

  return (
    <Box>
      <Text>How do you want to repay?</Text>
      <Select
        placeholder="please choose a repayment method"
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="ETH">USDC from Ethereum</option>
        <option value="ALGO">USDC from Algorand</option>
        {/* <option value="BANK">Bank Wire Transfer</option> */}
      </Select>
      {method === "ETH"  && (
        <Box>
          <Text>Fund your account by sending USDC to this deposit address</Text>
          <Address
            size="long"
            address={ "" +  loan.wallet_info.ethAddress }
          />
        </Box>
      )}
      {method === "ALGO"  && (
        <Box>
          <Text>Fund your account by sending USDC to this deposit address</Text>
          <Address
            size="long"
            address={ "" +  loan.wallet_info.algoAddress }
          />
          <Text><b>OR</b></Text>
          <DepositWithAlgoConnect 
            toAddress={loan.wallet_info.algoAddress}
            titleText="Repay with USDC"
            buttonText="Repay with myAlgoWallet"
            suggestedAmounts={suggestedAmounts}
            // note="Repay loan TODO"
          />
        </Box>
      )}
    </Box>
  )
}

export default RepaymentsForm
