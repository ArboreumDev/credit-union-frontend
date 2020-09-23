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
import { CalculatedRisk, LoanRequest } from "lib/types"
import { Currency } from "../../common/Currency"

interface Params {
  loanRequest: LoanRequest
}

const LoanRequestTable = ({ loanRequest }: Params) => {
  const calculatedRisk = loanRequest.risk_calc_result as CalculatedRisk
  return (
    <Stack w="100%">
      <Flex>
        <Box flex={0.5}>Principal</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={loanRequest.amount} />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Interest Rate</Box>
        <Box flex={0.5} textAlign="right">
          {dec_to_perc(calculatedRisk.interestRate)}%
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Interest Amount</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={calculatedRisk.totalDue - loanRequest.amount} />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Total due in {calculatedRisk.loanTerm} months</Box>
        <Box flex={0.5} textAlign="right">
          <Currency amount={calculatedRisk.totalDue} />
        </Box>
      </Flex>
      <Flex>
        <Box flex={0.5}>Monthly Payment Due</Box>
        <Box flex={0.5} textAlign="right">
          <Currency
            amount={calculatedRisk.totalDue / calculatedRisk.loanTerm}
          />
        </Box>
      </Flex>
    </Stack>
  )
}

export default function BLoanNeedsConfirmation({ loanRequest }: Params) {
  const confirmLoan = () => {
    console.log("confirm loan", JSON.stringify(loanRequest))
  }
  const rejectLoan = () => {
    console.log("reject loan", JSON.stringify(loanRequest))
  }

  const { register, setValue, handleSubmit, errors } = useForm<any>()

  return (
    <Stack padding="10px">
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
    </Stack>
  )
}
