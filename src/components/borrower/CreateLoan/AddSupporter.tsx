import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { useForm } from "react-hook-form"
import { AddSupporter as AddSupporterAction } from "lib/gql_api_actions"
import { LoanRequest } from "lib/types"

interface FormData {
  name: string
  email: string
  amount: number
}
interface Props {
  loanRequest: LoanRequest
}
export default function AddSupporter({ loanRequest }: Props) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    AddSupporterAction.fetch({
      requestId: loanRequest.request_id,
      email: data.email,
      amount: data.amount,
    })
  }

  return (
    <Stack>
      <Heading size="md">Add Supporters</Heading>
      <Text>
        Add well-wishers who can contribute to your loan to help reduce your
        interest rate
      </Text>
      <Text>
        The total amount pledged by your supporters needs to be at least 20% of
        loan size
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="10px" minW="280px">
          <Flex>
            <Box flex={1}>
              <Input
                placeholder="Name"
                name={`name`}
                size="lg"
                ref={register({ required: true })}
              />
            </Box>
            <Box flex={1}>
              <Input
                placeholder="Email"
                name={`email`}
                size="lg"
                ref={register({ required: true })}
              />
            </Box>
          </Flex>
          <Center flex={0.5}>
            <AmountInput
              passName={`amount`}
              passRef={register({ required: true })}
            />
          </Center>
          <Center>
            <Button type="submit">Add Supporter</Button>
          </Center>
        </Stack>
      </form>
    </Stack>
  )
}
