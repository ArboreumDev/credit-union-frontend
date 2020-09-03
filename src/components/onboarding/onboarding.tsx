import { useForm } from "react-hook-form"
import { useRouter } from "next/dist/client/router"
import Dropzone from "./Dropzone"
import { CreateUserMutationVariables } from "../../gql/sdk"
import { fetcher } from "../../utils/api"
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
  Heading,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  RequiredIndicator,
} from "@chakra-ui/core"

type FormData = {
  name: string
  phone: string
  user_type: string
}

interface Params {
  user: {
    email: string
    name?: string
  }
}

export default function Onboarding({ user }: Params) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const router = useRouter()

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
        location.reload()
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
            <Center>
              <Heading as="h4" size="md">
                Signup
              </Heading>
            </Center>

            <Input
              placeholder="Name"
              name="name"
              size="lg"
              ref={register({ required: true })}
            />
            <InputGroup>
              <InputLeftAddon>+91</InputLeftAddon>
              <Input
                type="phone"
                name="phone"
                borderLeftRadius="0"
                placeholder="Phone"
                size="lg"
                ref={register({ required: true })}
              />
            </InputGroup>
            <FormControl id="first-name" isRequired>
              <FormLabel>
                What do you plan to do? <RequiredIndicator />
              </FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio
                    value="borrower"
                    name="user_type"
                    // @ts-ignore Throwing compile time error. Hopefully fixed in future chakra version.
                    ref={register({ required: true })}
                  >
                    Borrow
                  </Radio>
                  <Radio
                    value="lender"
                    name="user_type"
                    // @ts-ignore
                    ref={register({ required: true })}
                  >
                    Lend
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Box>
              <Dropzone email={user.email} />
            </Box>
            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </div>
  )
}
