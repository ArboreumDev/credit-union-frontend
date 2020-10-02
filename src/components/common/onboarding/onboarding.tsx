import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/core"
import { USER_DEMOGRAPHIC } from "lib/constant"
import { CreateUser } from "lib/gql_api_actions"
import { UserType } from "lib/types"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useForm } from "react-hook-form"
import { AiOutlineMail } from "react-icons/ai"
import Dropzone from "./Dropzone"

type FormData = {
  firstname: string
  lastname: string
  phone: string
}

interface Params {
  user: {
    email: string
    name?: string
  }
  userType: UserType
}

export default function Onboarding({ user, userType }: Params) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = (data: FormData) => {
    console.log(data)
    CreateUser.fetch({
      user: {
        name: data.firstname + " " + data.lastname, // TODO: Change DB to have separate first and last names
        email: user.email,
        user_type: userType,
        phone: data.phone,
        demographic_info: USER_DEMOGRAPHIC,
      },
    })
      .then((res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

  return (
    <Box padding={4}>
      <Head>
        <title>Onboarding</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <Container maxW="400px" bg="white">
          <Stack spacing={3}>
            <Center>
              <Box marginTop="20px" h="40px">
                <img width="150px" src="/images/logo.svg" alt="logo" />
              </Box>
            </Center>
            <Center>
              <Heading as="h4" size="md">
                Signup
              </Heading>
            </Center>
            <InputGroup>
              <InputLeftElement>
                <Text>
                  <AiOutlineMail />
                </Text>
              </InputLeftElement>
              <Input
                type="email"
                placeholder="email"
                disabled
                value={user.email}
              />
            </InputGroup>
            <Input
              placeholder="First Name"
              name="firstname"
              size="lg"
              ref={register({ required: true })}
            />
            <Input
              placeholder="Last Name"
              name="lastname"
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

            {userType == UserType.Lender && (
              <Stack>
                <Input placeholder="PAN Card Number" name="pancard" size="lg" />
                <Input
                  placeholder="Aadhar Card Number"
                  name="aadhar"
                  size="lg"
                />
              </Stack>
            )}

            {userType == UserType.Borrower && (
              <div>
                <Box>
                  <Dropzone email={user.email}>
                    <p>Drop KYC documents here: </p>
                    <UnorderedList>
                      <ListItem>Passport</ListItem>
                      <ListItem>Aadhar Card</ListItem>
                      <ListItem>PAN Card</ListItem>
                    </UnorderedList>
                  </Dropzone>
                </Box>
                <Box>
                  <Dropzone email={user.email}>
                    <p>Upload financial documents here: </p>
                    <UnorderedList>
                      <ListItem>Latest Income Tax Returns</ListItem>
                      <ListItem>Bank Statement for last 6 months</ListItem>
                    </UnorderedList>
                  </Dropzone>
                </Box>
              </div>
            )}

            <Center>
              <Button type="submit">Submit</Button>
            </Center>
            <Box h={30} />
          </Stack>
        </Container>
      </form>
    </Box>
  )
}
