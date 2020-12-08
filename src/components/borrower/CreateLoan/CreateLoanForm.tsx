import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react"
import AmountInput from "components/common/AmountInput"
import { CreateLoan } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useForm } from "react-hook-form"

type FormData = {
  loanAmount: number
  purpose: string
  loanSupporters: string
}

interface Props {
  user: User
}

export default function CreateLoanForm({ user }: Props) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = (data: FormData) => {
    console.log(data)
    CreateLoan.fetch({
      request: {
        borrower_id: user.id,
        amount: data.loanAmount,
        purpose: data.purpose,
      },
    })
      .then((res) => {
        location.reload()
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container minW="300px">
          <Stack spacing={5}>
            <Center>
              <Heading size="lg">Request Loan</Heading>
            </Center>

            <Stack>
              <Text>How much do you need?</Text>
              <AmountInput
                passName="loanAmount"
                passRef={register({ required: true })}
              />
            </Stack>

            <Stack>
              <Text>What{"'"}s the money for?</Text>
              <Select
                name="purpose"
                placeholder="Choose loan purpose"
                ref={register({ required: false })}
              >
                <option value="Educational expense">Educational expense</option>
                <option value="Home repair/ renovation">
                  Home repair/ renovation
                </option>
                <option value="Medical expenses">Medical expenses</option>
                <option value="Wedding in family">Wedding in family</option>
                <option value="Business activity">Business activity</option>
                <option value="Other">Other</option>
              </Select>
            </Stack>

            <Center>
              <Button type="submit">Next</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </Box>
  )
}
