import { Box, Button, Center, Stack, Text } from "@chakra-ui/core"
import { AmountInputWithButtons } from "components/common/AmountInputWithHelper"
import { ChangeBalance } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  amount: number
}

interface Props {
  user: User
}

export function WithdrawFundsForm({ user }: Props) {
  const router = useRouter()
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    ChangeBalance.fetch({
      userId: user.id,
      delta: -formData.amount,
    })
      .then(async (res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>Enter the amount you wish to withdraw</Text>

          <Box flex={1}>
            <AmountInputWithButtons
              maxAmount={Math.round(user.balance)}
              setValue={setValue}
              passRef={register({ required: true })}
            />
          </Box>
          <Center flex={0.4}>
            <Button type="submit">Withdraw</Button>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}

export default WithdrawFundsForm
