import {
  useToast,
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
import { Withdraw, Target } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"

type FormData = {
  amount: number
  address: string
  target: Target
}

interface Props {
  user: User
}

export function WithdrawFundsForm({ user }: Props) {
  const router = useRouter()
  const {
    formState,
    register,
    trigger,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
  } = useForm<FormData>()

  const watched = useWatch({
    control,
    name: ["target", "address", "amount"],
    defaultValue: { target: "", address: "", amount: "" },
  })

  const readyForReview = () => {
    console.log("w", watched)
    return (
      !errors.amount &&
      !errors.address &&
      watched.address &&
      watched.target &&
      watched.amount &&
      !confirmed
    )
  }

  const toast = useToast()

  const [confirmed, setConfirmed] = useState(false)

  const onSubmit = (formData: FormData) => {
    console.log("making a tx", formData)
    Withdraw.fetch({
      target: formData.target,
      address: formData.address,
      amount: formData.amount,
    })
      .then(async (res) => {
        console.log("res", res)
        reset({ amount: 0, address: "", target: undefined })
        toast({
          title: "Confirmed.",
          description: "Your withdrawal is being processed.",
          status: "success",
          duration: null,
          isClosable: true,
        })
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>Choose where you want to withdraw to:</Text>
          <Select
            placeholder="choose withdrawal type"
            disabled={confirmed}
            ref={register({ required: true })}
            name="target"
            // onChange={() => clearFormData()}
          >
            <option value="ETH">USDC on Ethereum</option>
            <option value="ALGO">USDC on Algorand</option>
            <option value="BANK">Bank Account</option>
          </Select>

          {watched.target === "ETH" && (
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

          {watched.target === "ALGO" && (
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
          {watched.target === "BANK" && (
            <Box>
              <Text>Your Withdrawal will be credited to this account: </Text>
              <BankAccount
                account={user.account_details.bankDetails}
                owner={user.name}
                ownerDescription="Beneficiary"
              />
            </Box>
          )}

          {((watched.target && watched.address) ||
            getValues("target") === "BANK") && (
            <Box flex={1}>
              <Text>Withdrawal amount: </Text>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  placeholder={"Enter your withdrawal Amount here"}
                  size="lg"
                  disabled={confirmed}
                  name="amount"
                  type="string"
                  ref={register({ required: true, max: user.balance, min: 1 })}
                  onChange={() => trigger("amount")}
                />
              </InputGroup>
              <Text as="i">
                {" "}
                Minimum: $1, Available Balance: {Math.round(user.balance)}{" "}
              </Text>
              {errors.amount && (
                <Text color="tomato">
                  {" "}
                  Your balance is too low to withdraw that amount.
                </Text>
              )}
            </Box>
          )}

          {readyForReview() && (
            <Center flex={0.4} padding="2">
              <ReviewWithdrawal
                details={{
                  targetAddress: getValues("address"),
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
                  Confirm Withdrawal!
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
