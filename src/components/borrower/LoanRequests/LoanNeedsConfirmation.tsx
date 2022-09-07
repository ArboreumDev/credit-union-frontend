import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
} from "@chakra-ui/core"
import { Currency } from "components/common/Currency"
import { dec_to_perc } from "lib/currency"
import { LoanRequest } from "lib/types"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { AiOutlineFileDone } from "react-icons/ai"
import LoanModel from "./LoanModel"

interface Params {
  loanRequest: LoanRequest
}

const LoanRequestTable = ({ loanRequest }: Params) => {
  // const loan = new LoanModel(loanRequest)
  return (
    <Stack w="100%">
      <Flex>
        <Box flex={0.5}>Principal</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={loanRequest.amount} />
        </Box>
      </Flex>
      <Flex></Flex>
      <Flex>
        <Box flex={1}>
          You will pay {dec_to_perc(0.62)}% of the loan amount as interest.{" "}
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Interest Amount</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={10000000} />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Total due in {66} months</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={1001212120} />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Monthly Payment Due</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={34343} />
        </Box>
      </Flex>
    </Stack>
  )
}

export default function BLoanNeedsConfirmation({ loanRequest }: Params) {
  const router = useRouter()

  const confirmLoan = () => {
    console.log("confirm loan", JSON.stringify(loanRequest))
    // AcceptLoanOffer.fetch({ request_id: loanRequest.request_id })
    //   .then(async (res) => {
    //     router.push("/dashboard")
    //   })
    //   .catch((err) => console.error(err))
  }
  const rejectLoan = () => {
    console.log("reject loan", JSON.stringify(loanRequest))
  }

  const { register, setValue, handleSubmit, errors } = useForm<any>()

  return (
    <Container padding="10px">
      <Center>
        <Text fontSize="100px" color="green.500">
          <AiOutlineFileDone />
        </Text>
      </Center>
      <Center>
        <Text align="center">
          Congratulations, your loan request has been processed!
        </Text>
      </Center>
      <Box h="10px" />
      <Stack>
        <Stat>
          <StatLabel fontSize="md">
            <Tooltip label="Amount">Amount</Tooltip>
          </StatLabel>
          <StatNumber fontSize="2xl">
            <Currency amount={loanRequest.amount} />
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="md">
            <Tooltip label="Purpose">Purpose</Tooltip>
          </StatLabel>
          <StatNumber fontSize="2xl">{loanRequest.purpose}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="md">
            <Tooltip label="Annual Percentage Yield">IRR</Tooltip>
          </StatLabel>
          <StatNumber fontSize="2xl">13.5%</StatNumber>
        </Stat>
        <Box h="20px" />
      </Stack>
      <Center>
        <LoanRequestTable loanRequest={loanRequest} />
      </Center>

      <Box h="10px" />
      <form onSubmit={handleSubmit(confirmLoan)}>
        <Stack margin="10px">
          <Checkbox
            size="md"
            name="confirm_1"
            colorScheme="green"
            // @ts-ignore
            ref={register({ required: "This is required" })}
          >
            I understand I will have to repay this loan with interest in 6
            monthly installments.
          </Checkbox>
          <Box h="10px" />
          <Checkbox
            size="md"
            name="confirm_2"
            colorScheme="green"
            // @ts-ignore
            ref={register({ required: "This is required" })}
          >
            I understand if I am unable to repay an installment, the amount will
            be deducted from my monthly salary.
          </Checkbox>
          <Box h="10px" />
          <Checkbox
            size="md"
            name="confirm_2"
            colorScheme="green"
            // @ts-ignore
            ref={register({ required: "This is required" })}
          >
            I accept the proposed interest rate.
          </Checkbox>
        </Stack>
        <Box h="30px" />
        {errors.example_1 && (
          <p className="error">{errors.example_1.message}</p>
        )}
        <Center>
          <HStack>
            <Button colorScheme="blue" type="submit">
              Accept Loan
            </Button>
            <Button colorScheme="red" onClick={rejectLoan}>
              Reject Loan
            </Button>
          </HStack>
        </Center>
      </form>
      <Box h="30px" />
    </Container>
  )
}
