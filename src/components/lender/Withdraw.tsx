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
import { isEthAddress } from "lib/ethereum"
import { isAlgorandAddress } from "lib/algorand"

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
    setError,
    clearErrors,
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
    console.log("algtest", isAlgorandAddress("sdf"))
    const algoAddress =
      "OAQJOCLUKGJF3BR5GJWFDZ5IC43OLVCF56ODGUCZ6LJXGQG2HHFMIHPREM"
    console.log("algtest 2", isAlgorandAddress(algoAddress))
    return (
      !errors.amount &&
      !errors.address &&
      watched.address &&
      watched.target &&
      watched.amount &&
      !confirmed
    )
  }

  const verifyTargetAddress = () => {
    if (
      (watched.target === "ETH" && !isEthAddress(watched.address)) ||
      (watched.target === "ALGO" && !isAlgorandAddress(watched.address))
    ) {
      setError("address", {
        type: "manual",
        message: `This is not a valid ${watched.target} address!`,
      })
    } else {
      clearErrors("address")
    }
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
      .catch((err) => {
        console.error(err)
        toast({
          title: "Error.",
          description: "Your withdrawal could not be processed.",
          status: "error",
          duration: null,
          isClosable: true,
        })
      })
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>How do you want to withdraw?</Text>
          <Select
            placeholder={"choose withdrawal type"}
            disabled={confirmed}
            ref={register({ required: true })}
            name="target"
            // onChange={() => clearFormData()}
          >
            <option value="ETH">USDC on Ethereum</option>
            <option value="ALGO">USDC on Algorand</option>
            <option value="BANK">Bank Account</option>
          </Select>

          {watched.target && (
            <>
              <Text>Target Address: </Text>
              <Input
                // TODO run validation whether it is a valid address here
                name="address"
                disabled={confirmed}
                isInvalid={errors.address}
                ref={register({ required: true })}
                placeholder={`paste your ${watched.target}-address here`}
                onChange={verifyTargetAddress}
              ></Input>
              {errors.address && (
                <Text color="tomato">{errors.address.message}</Text>
              )}
              {watched.target === "ALGO" && (
                <i>
                  Note: Please make sure that you have added USDC as an asset to
                  accept transactions for your Algorand Address (see
                  instructions here(LINK) on)
                </i>
              )}
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

          {((watched.target && watched.address && !errors.address) ||
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
