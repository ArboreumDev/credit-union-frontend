import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
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
import { irr_dec_to_perc } from "lib/currency"
import { CalculatedRisk, LoanRequest } from "lib/types"
import { Currency } from "../../common/Currency"
import { Row, Table, TextColumn } from "../../common/Table"

interface Params {
  loanRequest: LoanRequest
}

const LoanRequestTable = ({ loanRequest }: Params) => {
  const calculatedRisk = loanRequest.risk_calc_result as CalculatedRisk
  return (
    <Table>
      <Row>
        <TextColumn muted>Principal</TextColumn>
        <TextColumn textAlign="right">
          <Currency amount={loanRequest.amount} />
        </TextColumn>
      </Row>
      <Row>
        <TextColumn muted>Interest Rate</TextColumn>
        <TextColumn textAlign="right">
          {irr_dec_to_perc(calculatedRisk.interestRate)}%
        </TextColumn>
      </Row>
      <Row>
        <TextColumn muted>Interest Amount</TextColumn>
        <TextColumn textAlign="right">
          <Currency amount={calculatedRisk.totalDue - loanRequest.amount} />
        </TextColumn>
      </Row>
      <Row>
        <TextColumn muted>
          Total due in {calculatedRisk.loanTerm} months
        </TextColumn>
        <TextColumn textAlign="right">
          <Currency amount={calculatedRisk.totalDue} />
        </TextColumn>
      </Row>
      <Row>
        <TextColumn muted>Monthly Payment Due</TextColumn>
        <TextColumn textAlign="right">
          <Currency
            amount={calculatedRisk.totalDue / calculatedRisk.loanTerm}
          />
        </TextColumn>
      </Row>
    </Table>
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
    <Container minW="s" bg="white">
      <Stack padding="10px" borderWidth="3px">
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
        <Center w="100%">
          <LoanRequestTable loanRequest={loanRequest} />
        </Center>

        <Box h="10px" />
        <form onSubmit={handleSubmit(confirmLoan)}>
          <Stack margin="10px">
            <Checkbox
              size="sm"
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
              size="sm"
              name="confirm_2"
              colorScheme="green"
              // @ts-ignore
              ref={register({ required: "This is required" })}
            >
              I understand if I am unable to repay an installment, the amount
              will be deducted from my monthly salary.
            </Checkbox>
            <Box h="10px" />
            <Checkbox
              size="sm"
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
    </Container>
  )
}
