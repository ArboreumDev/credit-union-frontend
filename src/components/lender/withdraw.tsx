import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { Currency } from "components/common/Currency"
import AppBar from "components/common/nav/AppBar"
import { User } from "lib/types"
import useUser from "lib/useUser"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  amount: number
}

interface Props {
  user: User
}

export function WithdrawFundsForm({ user }: Props) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)

  const onSubmit = (data: FormData) => {
    console.log(data)
    // const payload: XXX-TODO = {
    //   lender_id: user.id,
    //   amount: data.amount
    // }
    // Call mutation
    // fetcher("CreateLoanRequestMutation", payload)
    //   .then((res) => {
    //     location.reload()
    //   })
    //   .catch((err) => console.error(err))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>
            Enter the amount you wish to withdraw (Max{" "}
            <Currency amount={user.balance ?? 0} />)
          </Text>
          <AmountInput
            passName="amount"
            passRef={register({ required: true })}
          />

          <Center>
            <Button type="submit">Submit</Button>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}

export default WithdrawFundsForm
