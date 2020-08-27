import { useSession } from "next-auth/client"
import { User } from "../utils/types"

import { useForm } from "react-hook-form"
import { useRouter } from "next/dist/client/router"
import Dropzone from "../components/Dropzone"
import { CreateUserMutationVariables } from "../gql/sdk"
import { fetcher } from "../utils/api"
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
} from "@chakra-ui/core"

type FormData = {
  name: string
  phone: string
  user_type: string
}

export default function Onboarding() {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const router = useRouter()
  const [session, loading] = useSession()

  if (loading) return <div>Loading...</div>
  const user = session.user as User

  const onSubmit = (data: FormData) => {
    console.log(data)
    const payload: CreateUserMutationVariables = {
      user: {
        name: data.name,
        email: user.email,
        user_type: data.user_type,
        phone: data.phone,
      },
    }
    // Call mutation
    fetcher("CreateUser", payload)
      .then((res) => {
        router.push("/")
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container maxW="400px" bg="white">
          <Stack spacing={3}>
            <Center>
              <Box h="40px">
                <img width="150px" src="/images/logo.svg" alt="logo" />
              </Box>
            </Center>
            <h2>Signup</h2>
            <Input
              placeholder="Name"
              name="name"
              size="lg"
              ref={register({ required: true })}
            />
            <Input
              placeholder="Phone"
              name="phone"
              size="lg"
              ref={register({ required: true })}
            />
            <Box>
              <h4>Do you plan to lend or borrow?</h4>
              <RadioGroup>
                <Stack direction="row">
                  <label>
                    <input
                      type="radio"
                      name="user_type"
                      value="borrower"
                      ref={register({ required: true })}
                    />
                    Borrow
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="user_type"
                      value="lender"
                      ref={register({ required: true })}
                    />
                    Invest
                  </label>
                </Stack>
              </RadioGroup>
            </Box>
            <div>
              <h4>KYC Documents:</h4>
              <Dropzone email={user.email} />
            </div>
            <Center>
              <Button type="submit" intent="primary">
                Submit
              </Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </div>
  )
}
