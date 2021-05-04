import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Box,
  Button,
  Center,
  Stack,
  Text,
} from "@chakra-ui/core"
import { AmountInputWithHelper } from "components/common/AmountInputWithHelper"
import BankAccount from "components/common/BankAccount"
import FormData from "form-data"
import { ReviewWithdrawal } from "./ReviewWithdrawal"
import { ChangeBalance } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  amount: number
  address: string
  target: string
}

interface Props {
  user: User
}

// type target = "Ethereum" | "Algorand" | "Bank Account"

export function WithdrawFundsForm({ user }: Props) {
  const router = useRouter()
  const {
    formState,
    register,
    setValue,
    watch,
    handleSubmit,
    errors,
    getValues,
    reset,
  } = useForm<FormData>()
  // const [nSup, supCount] = useState(1)

  const watchTarget = watch("target", false)
  const watchAddress = watch("address", false)
  const watchAmount = watch("amount", false)

  const [confirmed, setConfirmed] = useState(false)

  const onSubmit = (formData: FormData) => {
    console.log("making a tx", formData)
    // clearFormData()
    // ChangeBalance.fetch({
    //   userId: user.id,
    //   delta: -formData.amount,
    // })
    //   .then(async (res) => {
    //     router.push("/dashboard")
    //   })
    //   .catch((err) => console.error(err))
  }
  const clearFormData = () => {
    setConfirmed(false)
    reset({ address: "", amount: 0 })
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>Choose where you want to withdraw to:</Text>
          <Select
            placeholder="withdrawal type"
            disabled={confirmed}
            ref={register({ required: true })}
            name="target"
            // onChange={() => clearFormData()}
          >
            <option value="ETH">USDC on Ethereum</option>
            <option value="ALGO">USDC on Algorand</option>
            <option value="BANK">Bank Account</option>
          </Select>

          {getValues("target") === "ETH" && (
            <>
              <Text>Target Address: </Text>
              <Input
                // TODO run validation whether it is a valid address here
                name="address"
                disabled={confirmed}
                ref={register({ required: true })}
                placeholder={"paste your ethereum-address here"}
              ></Input>
            </>
          )}

          {getValues("target") === "ALGO" && (
            <>
              <Text>Target Address: </Text>
              <Input
                name="address"
                disabled={confirmed}
                ref={register({ required: true })}
                placeholder={"paste your algorand-address here"}
                onChange={() => console.log("TODO check if is valid address")}
              />
              <i>
                Note: Please make sure that you have added USDC as an asset to
                accept transactions for your Algorand Address (see instructions
                here(LINK) on)
              </i>
            </>
          )}
          {getValues("target") === "BANK" && (
            <Box>
              <Text>Your Withdrawal will be credited to this account: </Text>
              <BankAccount
                account={user.account_details.bankDetails}
                owner={user.name}
                ownerDescription="Beneficiary"
              />
            </Box>
          )}
          {((watchTarget && watchAddress) ||
            getValues("target") === "BANK") && (
            <Box flex={1}>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  placeholder={"Enter your withdrawal Amount here"}
                  size="lg"
                  disabled={confirmed}
                  name="amount"
                  type="string"
                  ref={register({ required: true, max: user.balance, min: 1 })}
                  onChange={() => console.log("TODO check balance")}
                />
              </InputGroup>
              <Text>
                {" "}
                Minimum: $1, Available Balance: {Math.round(user.balance)}{" "}
              </Text>
            </Box>
          )}

          {!confirmed && watchAddress && watchTarget && watchAmount && (
            <Center flex={0.4} padding="2">
              <ReviewWithdrawal
                details={{
                  targetAddress: getValues("target"),
                  amount: "" + getValues("amount"),
                }}
                handleConfirm={() => setConfirmed(true)}
              />
            </Center>
          )}

          {confirmed && (
            <Center flex={0.4}>
              <Flex padding="4">
                <Button bg="gray.200" onClick={() => setConfirmed(false)}>
                  Edit Withdrawal
                </Button>
                <Button type="submit" colorScheme="teal">
                  Confirm Withdraw!
                </Button>
              </Flex>
            </Center>
          )}
        </Stack>
      </form>
    </Box>
  )
}

export default WithdrawFundsForm
