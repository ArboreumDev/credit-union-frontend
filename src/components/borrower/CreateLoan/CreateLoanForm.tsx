import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { Loan_Requests_Insert_Input } from "gql/sdk"
import { fetcherMutate } from "lib/api"
import { User } from "lib/types"
import { useState } from "react"
import { useForm } from "react-hook-form"

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
  const [nSup, supCount] = useState(1)

  const onSubmit = (data: FormData) => {
    console.log(data)
    const payload: Loan_Requests_Insert_Input = {
      borrower_id: user.id,
      amount: data.amount,
      purpose: data.purpose,
    }
    // Call mutation
    fetcherMutate("CreateLoanRequestMutation", payload)
      .then((res) => {
        location.reload()
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container minW="300px" bg="white">
          <Stack spacing={3}>
            <AmountInput passRef={register({ required: true })} />
            <Select
              name="purpose"
              placeholder="Choose loan purpose"
              ref={register({ required: false })}
            >
              <option value="School">Educational expense</option>
              <option value="Auto">Home repair/ renovation</option>
              <option value="Other">Medical expenses</option>
              <option value="Other">Wedding in family</option>
              <option value="Other">Business activity</option>
              <option value="Other">Other</option>
            </Select>
            <Box h="10px" />
            <Heading size="md">Supporters</Heading>
            <Text>Total pledge amount needs to be 20% of loan size</Text>

            {Array.from({ length: nSup }, (x, i) => i).map((idx) => (
              <Stack key={idx} spacing="10px" minW="280px">
                <Text>Supporter {idx + 1}: </Text>
                <Flex>
                  <Box flex={1}>
                    <Input
                      placeholder="Name"
                      name="Supporter's name"
                      size="lg"
                      ref={register({ required: true })}
                    />
                  </Box>
                  <Box flex={1}>
                    <Input
                      placeholder="Email"
                      name="email"
                      size="lg"
                      ref={register({ required: true })}
                    />
                  </Box>
                  <Box flex={1}>
                    <Input
                      placeholder="Amount"
                      name="amount"
                      size="lg"
                      ref={register({ required: true })}
                    />
                  </Box>
                </Flex>
              </Stack>
            ))}
            <Center>
              <Button variant="ghost" onClick={() => supCount(nSup + 1)}>
                Add Supporter
              </Button>
            </Center>
            <Box h="30px" />
            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </Box>
  )
}
