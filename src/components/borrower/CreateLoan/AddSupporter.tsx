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
import { AcceptRejectPledge } from "lib/gql_api_actions"
import { useForm } from "react-hook-form"

export default function AddSupporter() {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Stack>
      <Heading size="md">Add Supporter</Heading>
      <Text>
        Supporters are your friends and colleagues who improve your credit
        rating by guaranteeing a part of your loan.
      </Text>
      <Text>
        The total amount pledged by your supporters needs to be at least 20% of
        loan size
      </Text>
      <Stack spacing="10px" minW="280px">
        <Flex>
          <Box flex={1}>
            <Input
              placeholder="Name"
              name={`supporter_name`}
              size="lg"
              ref={register({ required: true })}
            />
          </Box>
          <Box flex={1}>
            <Input
              placeholder="Email"
              name={`supporter_email`}
              size="lg"
              ref={register({ required: true })}
            />
          </Box>
        </Flex>
        <Center flex={0.5}>
          <AmountInput
            passName={`supporter_amount`}
            passRef={register({ required: true })}
          />
        </Center>
      </Stack>
      )
      <Center>
        <Button type="submit">Submit</Button>
      </Center>
    </Stack>
  )
}
