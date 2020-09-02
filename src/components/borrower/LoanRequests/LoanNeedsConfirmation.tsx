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
import { LoanRequest } from "../../../utils/types"
import { Contactus } from "../../ContactUs"

interface Params {
  loanRequest: LoanRequest
}

export const BLoanRequestAwaitsConfirmation = ({ loanRequest }: Params) => {
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
              <StatNumber>INR {loanRequest.amount}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Purpose</StatLabel>
              <StatNumber>{loanRequest.purpose}</StatNumber>
            </Stat>
          </StatGroup>
          <Box h="10px" />
          <StatGroup>
            <Stat>
              <StatLabel>Interest</StatLabel>
              <StatNumber>
                {loanRequest.risk_calc_result.interestRate}%
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Total Due in 6 months</StatLabel>
              <StatNumber>
                INR {loanRequest.risk_calc_result.totalDue}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Monthly Installments</StatLabel>
              <StatNumber>
                INR {loanRequest.risk_calc_result.monthlyDue}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Box>
        <Box h="30px" />
        <form onSubmit={handleSubmit(confirmLoan)}>
          <Stack>
            <Checkbox
              size="sm"
              name="confirm_1"
              colorScheme="green"
              // @ts-ignore
              ref={register({ required: "This is required" })}
            >
              I understand I will have to repay this loan with interest in 6
              monthly installments
            </Checkbox>
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
          </Stack>
          <Box h="30px" />
          {errors.example_1 && (
            <p className="error">{errors.example_1.message}</p>
          )}
          <Center>
            <HStack>
              <Button type="submit">Confirm</Button>
              <Button onClick={rejectLoan}>Reject</Button>
            </HStack>
          </Center>
        </form>
        <Box h="30px" />
        <Center>
          <Contactus />
        </Center>
      </Stack>
    </Container>
  )
}
