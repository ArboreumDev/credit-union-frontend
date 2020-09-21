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
import AmountInput from "components/common/AmountInput"
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
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container minW="300px" bg="white">
          <Stack spacing={3}>
            <Box h="30px" />
            <Text>How much money would you like to invest?</Text>
            <AmountInput
              passName="amount"
              passRef={register({ required: true })}
            />

            <Box h="30px" />
            <Box padding="20px">
              <ul>
                <li>
                  The amount invested will automatically be allocated towards
                  several loans.
                </li>
                <li>
                  Funds once invested, cannot be withdrawn before payback is
                  complete.
                </li>
                <li>
                  An any point in time, you may withdraw un-invested funds from
                  your account.
                </li>
              </ul>
            </Box>

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

const AddFundsPage = () => {
  const { user } = useUser()
  if (!user) return <AppBar />

  return (
    <div>
      <AppBar />
      <AddFundsForm user={user} />
    </div>
  )
}

export default AddFundsPage
