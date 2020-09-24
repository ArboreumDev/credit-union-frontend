import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { Loan_Requests_Insert_Input } from "gql/sdk"
import { fetcherMutate } from "lib/api"
import { ActionTypes } from "lib/gql_api_actions"
import { User } from "lib/types"
import { useState } from "react"
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
  const [nSup, supCount] = useState(1)

  const onSubmit = (data: FormData) => {
    console.log(data)
    const payload: Loan_Requests_Insert_Input = {
      borrower_id: user.id,
      amount: data.loanAmount,
      purpose: data.purpose,
    }
    // Call mutation
    fetcherMutate(ActionTypes.CreateLoan, payload)
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
            <Stack>
              <Heading size="md">Supporters</Heading>
              <Text>
                Supporters are your friends and colleagues who improve your
                credit rating by guaranteeing a part of your loan.
              </Text>
              <Text>
                The total amount pledged by your supporters needs to be at least
                20% of loan size
              </Text>

              {Array.from({ length: nSup }, (x, i) => i).map((idx) => (
                <Stack key={idx} spacing="10px" minW="280px">
                  <Text>Supporter {idx + 1}: </Text>
                  <Flex>
                    <Box flex={1}>
                      <Input
                        placeholder="Name"
                        name={`supporter_${idx}_name`}
                        size="lg"
                        ref={register({ required: true })}
                      />
                    </Box>
                    <Box flex={1}>
                      <Input
                        placeholder="Email"
                        name={`supporter_${idx}_email`}
                        size="lg"
                        ref={register({ required: true })}
                      />
                    </Box>
                  </Flex>
                  <Center flex={0.5}>
                    <AmountInput
                      passName={`supporter_${idx}_amount`}
                      passRef={register({ required: true })}
                    />
                  </Center>
                </Stack>
              ))}
              <Center>
                <Button variant="ghost" onClick={() => supCount(nSup + 1)}>
                  Add Supporter
                </Button>
              </Center>
            </Stack>

            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </Box>
  )
}
