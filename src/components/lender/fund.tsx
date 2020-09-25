import { Box, Button, Center, Stack, Text } from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { fetcherMutate } from "lib/api"
import { ChangeBalance } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  amount: number
}

interface Props {
  user: User
}

export function AddFundsForm({ user }: Props) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    ChangeBalance.fetch({
      userId: user.id,
      delta: formData.amount,
    })
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>How much money would you like to invest?</Text>
          <AmountInput
            passName="amount"
            passRef={register({ required: true })}
          />

          <Box h="10px" />
          <Box padding="20px">
            <ul>
              <li>
                The amount invested will automatically be allocated towards
                several loans.
              </li>
              <li>
                Funds once invested, cannot be withdrawn before payback is
                complete.
              </li>
              <li>
                An any point in time, you may withdraw un-invested funds from
                your account.
              </li>
            </ul>
          </Box>

          <Box h="30px" />
          <Center>
            <Button type="submit">Submit</Button>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}

export default AddFundsForm
