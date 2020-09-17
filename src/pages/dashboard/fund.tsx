import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/core"
import AppBar from "components/common/AppBar"
import { User } from "lib/types"
import useUser from "lib/useUser"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  amount: number
}

interface Props {
  user: User
}

export function AddFundsForm({ user }: Props) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [nSup, supCount] = useState(1)

  const onSubmit = (data: FormData) => {
    console.log(data)
    // const payload: XXX-TODO = {
    //   lender_id: user.id,
    //   amount: data.amount
    // }
    // Call mutation
    // fetcher("CreateLoanRequestMutation", payload)
    //   .then((res) => {
    //     location.reload()
    //   })
    //   .catch((err) => console.error(err))
  }

  return (
    <Box>
      <AppBar />
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container minW="300px" bg="white">
          <Stack spacing={3}>
            <Center>
              <Heading>Deposit funds</Heading>
            </Center>

            <Input
              placeholder="Amount (₹)"
              name="amount"
              size="lg"
              ref={register({ required: true })}
            />

            <Box h="30px" />
            <Text>
              The amount will be invested in several loans. Funds once invested,
              cannot be withdrawn before payback is complete.
            </Text>
            <Text>
              An any point in time, you may withdraw un-invested funds from your
              account.
            </Text>
            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </Box>
  )
}

const AddFundsPage = () => {
  const { user, mutate } = useUser()
  if (!user) return <AppBar />

  return <AddFundsForm user={user} />
}

export default AddFundsPage
