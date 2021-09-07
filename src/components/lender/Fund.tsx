import { Box, Select, Text } from "@chakra-ui/core"
import Address from "components/common/Address"
import BankAccount from "components/common/BankAccount"
import { useState } from "react"
import { User } from "lib/types"

interface Props {
  user: User
}

export function AddFundsForm({ user }: Props) {
  const [method, setMethod] = useState(undefined)

  return (
    <Box>
      <Text>How do you want to fund your account?</Text>
      <Select
        placeholder="please choose a deposit method"
        // name="target"
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="ETH">USDC from Ethereum</option>
        <option value="ALGO">USDC from Algorand</option>
        <option value="BANK">Bank Wire Transfer</option>
      </Select>
      {(method === "ETH" || method === "ALGO") && (
        <Box>
          <Text>Fund your account by sending USDC to this deposit address</Text>
          <Address
            size="long"
            address={
              "" +
              (method === "ETH"
                ? user.account_details.circle.ethAddress
                : user.account_details.circle.algoAddress)
            }
          />
          <i>
            Note that we might afterwards move the money out of that account to
            a different address - It will still be reflected in your overall
            account balance though
          </i>
        </Box>
      )}

      {method === "BANK" && (
        <Box>
          Make a wire-transfer from this account:
          <BankAccount
            account={user.account_details.bankDetails}
            owner={user.first_name + " " + user.last_name}
          />
          to this bank account:
          <BankAccount
            account={user.account_details.circle.wireDepositAccount.bankDetails}
            owner={user.account_details.circle.wireDepositAccount.owner}
            ownerDescription="Beneficiary"
          />
          using this <b> {user.account_details.circle.trackingRef}</b> as
          reference code.
          <Box bg="pink.100">
            <p>
              <i>
                Note: Funds sent from other accounts or without the correct
                reference code are at risk to be lost or credited incorrectly!
              </i>
            </p>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default AddFundsForm
