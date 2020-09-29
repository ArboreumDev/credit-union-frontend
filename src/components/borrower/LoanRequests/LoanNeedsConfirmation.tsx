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
} from "@chakra-ui/core"
import { useForm } from "react-hook-form"
import { AiOutlineFileDone } from "react-icons/ai"
import { dec_to_perc } from "lib/currency"
import {
  CalculatedRisk,
  LoanRequest,
  SwarmAiResponse,
  SupporterStatus,
} from "lib/types"
import { Currency } from "../../common/Currency"
import { AcceptLoanOffer } from "../../../lib/gql_api_actions"

interface Params {
  loanRequest: LoanRequest
}

const LoanRequestTable = ({ loanRequest }: Params) => {
  const confirmed = loanRequest.supporters.filter(
    (x) => x.status == SupporterStatus.confirmed
  ).length
  const calculatedRisk = loanRequest.risk_calc_result
    .latestOffer as SwarmAiResponse
  return (
    <Stack w="100%">
      <Flex>
        <Box flex={0.5}>Principal</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={loanRequest.amount} />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Support</Box>
        <Box flex={0.5} textAlign="right">
          <p>
            {confirmed} out of {loanRequest.supporters.length} have confirmed
          </p>
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Interest Rate</Box>
        <Box flex={0.5} textAlign="right">
          {calculatedRisk.loan_info.borrower_apr}%
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Interest Amount</Box>
        <Box flex={0.5} textAlign="right">
          <Currency
            amount={
              calculatedRisk.loan_schedule.borrower_view.total_payments.remain -
              loanRequest.amount
            }
          />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>
          Total due in {calculatedRisk.loan_info.tenor} months
        </Box>
        <Box flex={0.5} textAlign="right">
          <Currency
            amount={
              calculatedRisk.loan_schedule.borrower_view.total_payments.remain
            }
          />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Monthly Payment Due</Box>
        <Box flex={0.5} textAlign="right">
          <Currency
            amount={calculatedRisk.loan_schedule.next_borrower_payment}
          />
        </Box>
      </Flex>
    </Stack>
  )
}

export default function BLoanNeedsConfirmation({ loanRequest }: Params) {
  const confirmLoan = () => {
    console.log("confirm loan", JSON.stringify(loanRequest))
    AcceptLoanOffer.fetch({ request_id: loanRequest.request_id })
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
      <Box>
        <StatGroup>
          <Stat>
            <StatLabel>Amount</StatLabel>
            <StatNumber>
              <Currency amount={loanRequest.amount} />
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Purpose</StatLabel>
            <StatNumber>{loanRequest.purpose}</StatNumber>
          </Stat>
        </StatGroup>
        <Box h="20px" />
      </Box>
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
