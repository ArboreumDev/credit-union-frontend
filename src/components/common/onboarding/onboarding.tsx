import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  RequiredIndicator,
  Stack,
  InputLeftElement,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/core"
import { useRouter } from "next/dist/client/router"
import { useForm } from "react-hook-form"
import { CreateUserMutationVariables } from "gql/sdk"
import { fetcher } from "utils/api"
import Dropzone from "./Dropzone"
import { ListItem, Spinner, UnorderedList } from "@chakra-ui/core"
import { AiOutlineMail } from "react-icons/ai"
import Head from "next/head"
import { useState } from "react"
import { UserType } from "utils/types"

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
}

export default function Onboarding({ user }: Params) {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const [userTypeIdx, setUserType] = useState(0)

  const router = useRouter()

  const onSubmit = (data: FormData) => {
    console.log(data)
    const payload: CreateUserMutationVariables = {
      user: {
        name: data.firstname + " " + data.lastname, // TODO: Change DB to have separate first and last names
        email: user.email,
        user_type: { 0: UserType.Lender, 1: UserType.Borrower }[userTypeIdx],
        phone: data.phone,
      },
    }
    // Call mutation
    fetcher("CreateUser", payload)
      .then((res) => {
        router.push("/dashboard")
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
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
            <Tabs onChange={(idx) => setUserType(idx)} variant="unstyled">
              <TabList>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>Invest</Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>
                  Borrow
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack>
                    <Input
                      placeholder="PAN Card Number"
                      name="pancard"
                      size="lg"
                    />
                    <Input
                      placeholder="Aadhar Card Number"
                      name="aadhar"
                      size="lg"
                    />
                  </Stack>
                </TabPanel>
                <TabPanel>
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
                      <p>Drop financial documents here: </p>
                      <UnorderedList>
                        <ListItem>latest Income Tax Returns</ListItem>
                        <ListItem>Bank Statement for last 6 months</ListItem>
                      </UnorderedList>
                    </Dropzone>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Center>
              <Button type="submit">Submit</Button>
            </Center>
          </Stack>
        </Container>
      </form>
    </div>
  )
}
