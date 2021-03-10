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
import { CreateUser, RegisterUser } from "lib/gql_api_actions"
import { UserType } from "lib/types"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useForm } from "react-hook-form"
import { AiOutlineMail } from "react-icons/ai"
import UploadingDropzone from "./UploadingDropzone"

type FormData = {
  firstname: string
  lastname: string
  phone: string
  kycFile: File
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
    console.log("to be submitted ", data)
    RegisterUser.fetch({
      user: {
        name: data.firstname,
        kycFiles: data.kycFile[0],
      },
    })
      .then((res) => {
        console.log("result of registiering with RC", res)
        console.log("TODO save registration status in DB")
        return Promise.resolve()
        //   return CreateUser.fetch({
        //     user: {
        //       name: data.firstname + " " + data.lastname, // TODO: #154 Change DB to have separate first and last names
        //       user_type: userType,
        //       phone: data.phone,
        //       onboarded: true,
        //     },
        //   })
      })
      .catch((err2) => {
        // TODO handle what to do when not able to connect to RC
        console.error("err2", err2)
        const msg = "err connecting to RC"
        alert(msg)
        return false
      })
      .then((res2) => {
        console.log("res2", res2)
        if (res2) {
          // router.push("/dashboard")
        }
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
              ref={register({ required: false })}
            />
            <Input
              placeholder="Last Name"
              name="lastname"
              size="lg"
              ref={register({ required: false })}
            />
            <InputGroup>
              <InputLeftAddon>+91</InputLeftAddon>
              <Input
                type="phone"
                name="phone"
                borderLeftRadius="0"
                placeholder="Phone"
                size="lg"
                ref={register({ required: false })}
              />
            </InputGroup>
            <Input
              type="file"
              name="kycFile"
              placeholder="Pan card"
              ref={register({ required: true })}
            />

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
                  <UploadingDropzone
                    endpoint="/api/kyc"
                    s3Key={"user_uploads/" + user.email}
                  >
                    <p>Drop KYC documents here: </p>
                    <UnorderedList>
                      {/* <ListItem>Passport</ListItem> */}
                      {/* <ListItem>Aadhar Card</ListItem> */}
                      <ListItem>PAN Card</ListItem>
                    </UnorderedList>
                  </UploadingDropzone>
                </Box>
                <Box>
                  <UploadingDropzone
                    endpoint="/api/upload"
                    s3Key={"user_uploads/" + user.email}
                  >
                    <p>Upload financial documents here: </p>
                    <UnorderedList>
                      <ListItem>Latest Income Tax Returns</ListItem>
                      <ListItem>Bank Statement for last 6 months</ListItem>
                    </UnorderedList>
                  </UploadingDropzone>
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
