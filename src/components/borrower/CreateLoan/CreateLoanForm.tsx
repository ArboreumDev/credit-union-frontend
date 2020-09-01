import { useSession } from "next-auth/client"

import { useForm } from "react-hook-form"
import {
  Stack,
  Input,
  Radio,
  RadioGroup,
  Button,
  Center,
  Box,
  VStack,
  Container,
  Textarea,
  Select,
} from "@chakra-ui/core"
import { User, Session } from "../../../utils/types"
import {
  CreateLoanRequestMutation,
  Loan_Requests_Insert_Input,
} from "../../../gql/sdk"
import { fetcher } from "../../../utils/api"
import { useRouter } from "next/dist/client/router"

type FormData = {
  amount: number
  purpose: string
  loanSupporters: string
}

interface Props {
  user: User
}

export default function CreateLoanForm({ user }: Props) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = (data: FormData) => {
    console.log(data)
    const payload: Loan_Requests_Insert_Input = {
      borrower_id: user.id,
      amount: data.amount,
      purpose: data.purpose,
    }
    // Call mutation
    fetcher("CreateLoanRequestMutation", payload)
      .then((res) => {
        location.reload()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container maxW="300px" bg="white">
          <Stack spacing={3}>
            <Input
              placeholder="Amount in INR"
              name="amount"
              size="lg"
              ref={register({ required: true })}
            />
            <Select
              name="purpose"
              placeholder="Choose loan purpose"
              ref={register({ required: false })}
            >
              <option value="School">School</option>
              <option value="Auto">Auto</option>
              <option value="Other">Other</option>
            </Select>
            <Textarea
              name="loanSupporters"
              placeholder="Supporters (name, amount)"
              ref={register({ required: false })}
            />

            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </div>
  )
}
