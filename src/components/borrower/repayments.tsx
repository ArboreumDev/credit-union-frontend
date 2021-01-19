import { Box, Button, Center, Stack, Text } from "@chakra-ui/core"
import { AmountInputWithButtons } from "components/common/AmountInputWithHelper"
import { MakeRepayment } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  requestId: string
  amount: number
}

interface Props {
  user: User
}

export function RepaymentsForm({ user }: Props) {
  const router = useRouter()
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    MakeRepayment.fetch({
      amount: formData.amount,
    })
      .then((res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

  const suggestedNextBorrowerPayment = Math.ceil(
    user.loans_to_repay[0].loan.schedule.next_borrower_payment
  )

  return (
    <Box maxW="lg">
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>Please make a repayment for the current time period</Text>
          <AmountInputWithButtons
            nextAmount={suggestedNextBorrowerPayment}
            passRef={register({ required: true })}
            setValue={setValue}
          />

          <Box h="30px" />
          <Center>
            <Button type="submit">Submit</Button>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}

export default RepaymentsForm
