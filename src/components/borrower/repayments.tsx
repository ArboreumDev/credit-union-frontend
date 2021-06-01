import { Box, Button, Center, Stack, Text } from "@chakra-ui/core"
import { AmountInputWithHelper } from "components/common/AmountInputWithHelper"
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
      loanId: user.loansToRepay[0].loan_id,
    })
      .then((res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

  const activeLoan = user.loansToRepay[0]
  const suggestedNextBorrowerPayment = Math.ceil(activeLoan.next_payment_amount)

  const fullRepay = Math.ceil(
    activeLoan.interest_accrued +
      activeLoan.principal_overdue +
      activeLoan.principal_remaining
  )

  return (
    <Box maxW="lg">
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Stack spacing={3}>
          <Text>Please make a repayment for the current time period</Text>
          <AmountInputWithHelper
            helpers={{
              Next: suggestedNextBorrowerPayment,
              All: fullRepay,
            }}
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
