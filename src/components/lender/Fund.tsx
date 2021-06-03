import {
  Box,
  Select,
  Button,
  Center,
  Stack,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Divider,
  useClipboard,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import Address from "components/common/Address"
import BankAccount from "components/common/BankAccount"
import { ChangeBalance } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { User_Constraint } from "gql/sdk"

type FormData = {
  amount: number
}

interface Props {
  user: User
}

type Method = "BANK" | "ALGO" | "ETH"

export function AddFundsForm({ user }: Props) {
  const router = useRouter()
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)
  const [method, setMethod] = useState(undefined)

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    ChangeBalance.fetch({
      userId: user.id,
      delta: formData.amount,
    })
      .then((res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

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
