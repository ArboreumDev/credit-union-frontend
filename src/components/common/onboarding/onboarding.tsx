import {
  Box,
  FormLabel,
  Select,
  Button,
  HStack,
  Radio,
  RadioGroup,
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
import { CreateUser } from "lib/gql_api_actions"
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
  ifsc: string
  accountNumber: string
  bankName: string
  accountType: string
  address: string
  zipCode: string
  gender: string
  employmentType: string
  income: string
  fatherFirstName: string
  fatherLastName: string
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
        name: data.firstname + " " + data.lastname, // TODO: #154 Change DB to have separate first and last names
        user_type: userType,
        phone: data.phone,
        onboarded: true,
        account_details: {
          bankDetails: {
            bankName: data.bankName,
            accountNumber: data.accountNumber,
            branchCode: data.ifsc,
            accountType: data.accountType,
          },
          rcAccount: {
            investor_id: "",
            accountNumber: "",
            branchCode: "FIXED",
          },
        },
        demographic_info: {
          address: data.address,
          zipCode: data.zipCode,
          gender: data.gender,
          income: data.income,
          father: {
            firstName: data.fatherFirstName,
            lastName: data.fatherFirstName,
          },
        },
      },
    })
      .then((res) => {
        // router.push("/dashboard")
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
            <FormLabel>Date of birth:</FormLabel>
            <Input
              placeholder="Date of birth"
              type="date"
              name="dob"
              size="lg"
              ref={register({ required: true })}
            />
            <Select
              placeholder="Select gender"
              name="gender"
              ref={register({ required: true })}
            >
              <option>MALE</option>
              <option>FEMALE</option>
              <option>OTHER</option>
            </Select>
            <Input
              placeholder="Address"
              name="address"
              size="lg"
              ref={register({ required: true })}
            />
            <Input
              placeholder=" ZipCode (PIN), e.g. 400042 "
              name="zipCode"
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
            <Input
              placeholder="Bank Account Number"
              name="accountNumber"
              size="lg"
              ref={register({ required: true })}
            />
            <Input
              placeholder="Ifsc"
              name="ifsc"
              size="lg"
              ref={register({ required: true })}
            />
            <Input
              placeholder="Bank Name"
              name="bankName"
              size="lg"
              ref={register({ required: true })}
            />
            <Select
              placeholder="Select account type"
              name="accountType"
              ref={register({ required: true })}
            >
              <option>CURRENT</option>
              <option>SAVINGS</option>
            </Select>

            <Input
              placeholder="Father First Name"
              name="fatherFirstName"
              size="lg"
              ref={register({ required: true })}
            />
            <Input
              placeholder="Father Last Name"
              name="fatherLastName"
              size="lg"
              ref={register({ required: true })}
            />
            <Select
              placeholder="Select annual income category"
              name="income"
              ref={register({ required: true })}
            >
              <option>0-500000</option>
              <option>500000-1000000</option>
              <option>1000000-2000000</option>
              <option>2000000-1000000000</option>
            </Select>
            <Select
              placeholder="Select employment type"
              name="employmentType"
              ref={register({ required: true })}
            >
              <option>SELF_EMPLOYED</option>
              <option>SALARIED</option>
              <option>RETIRED</option>
              <option>OTHER</option>
            </Select>

            {userType == UserType.Lender && (
              <Box>
                <UploadingDropzone
                  endpoint="/api/upload"
                  s3Key={"lenderKYC/" + user.email}
                >
                  <p>Drop photos (jpeg, png) of your KYC documents here: </p>
                  <UnorderedList>
                    <ListItem>Aadhar Card (xml download) </ListItem>
                    <ListItem>PAN Card</ListItem>
                    <ListItem>Photo of face</ListItem>
                  </UnorderedList>
                </UploadingDropzone>
              </Box>
            )}

            {userType == UserType.Borrower && (
              <div>
                <Box>
                  <UploadingDropzone
                    endpoint="/api/upload"
                    s3Key={"user_uploads/" + user.email}
                  >
                    <p>Drop KYC documents here: </p>
                    <UnorderedList>
                      <ListItem>Passport</ListItem>
                      <ListItem>Aadhar Card</ListItem>
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
