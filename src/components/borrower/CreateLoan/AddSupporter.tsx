import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { useForm } from "react-hook-form"
import { AddSupporter as AddSupporterAction } from "lib/gql_api_actions"
import { LoanRequest } from "lib/types"
import { useRouter } from "next/router"

interface FormData {
  name: string
  email: string
  amount: number
}
interface Props {
  loanRequest: LoanRequest
}
export default function AddSupporter({ loanRequest }: Props) {
  const router = useRouter()
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    AddSupporterAction.fetch({
      requestId: loanRequest.request_id,
      email: data.email,
      amount: data.amount,
      name: data.name,
      info: data,
    })
      .then(async (res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
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
          <AmountInput
            passName="amount"
            passRef={register({ required: true })}
          />
          <Input
            placeholder="Name"
            name="name"
            size="md"
            ref={register({ required: true })}
          />
          <Input
            placeholder="Email"
            name="email"
            size="md"
            ref={register({ required: true })}
          />
          <Box flex={1}>
            I have known the supporter since
            <Input
              placeholder="e.g. September 2015"
              name="known_since"
              size="md"
              ref={register({ required: true })}
            />
          </Box>

          <Box flex={1}>
            Supporter is my...
            <Input
              placeholder="e.g. manager, team mate, old team mate, etc."
              name="supporter_relation"
              size="md"
              ref={register({ required: true })}
            />
          </Box>

          <Center>
            <Button type="submit">Add Supporter</Button>
          </Center>
        </Stack>
      </form>
    </Stack>
  )
}
