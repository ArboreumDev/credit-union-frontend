import KYCCompleted from "./Notifications/KYCCompleted"
import {
  Container,
  Stack,
  Center,
  Button,
  Spinner,
  Box,
  Text,
  ListIcon,
  ListItem,
  List,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/core"
import { useSession } from "next-auth/client"
import {
  Session,
  LoanRequestStatus,
  User,
  LoanRequest,
} from "../../utils/types"
import { bool } from "aws-sdk/clients/signer"
import { CgFileDocument } from "react-icons/cg"
import { AiOutlineFileDone } from "react-icons/ai"
import { Contactus } from "../ContactUs"

interface Params {
  loanRequest: LoanRequest
}

export const BLoanRequestInitiated = ({ loanRequest }: Params) => (
  <Container minW="s" bg="white">
    <Stack spacing={1}>
      <Box margin="20px" padding="10px" borderWidth="5px" borderRadius="lg">
        <Center>
          <Text padding="0px" margin="0px" fontSize="100px">
            <CgFileDocument />
          </Text>
        </Center>
        <Center>
          <Text>Loan request is being processed.</Text>
        </Center>
        <Box h="30px" />
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
      </Box>
    </Stack>
  </Container>
)

export const BLoanRequestAwaitsConfirmation = ({ loanRequest }: Params) => (
  <Container minW="s" bg="white">
    <Stack spacing={2}>
      <Center>
        <Text padding="0px" margin="0px" fontSize="100px" color="green.500">
          <AiOutlineFileDone />
        </Text>
      </Center>
      <Center>
        <Text>Congratulations, your loan request has been processed!</Text>
      </Center>
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
          <Stat>
            <StatLabel>Interest</StatLabel>
            <StatNumber>
              {loanRequest.risk_calc_result.interestRate}%
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Due in 6 months</StatLabel>
            <StatNumber>INR {loanRequest.risk_calc_result.totalDue}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Monthly Installments</StatLabel>
            <StatNumber>
              INR {loanRequest.risk_calc_result.monthlyDue}
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      <label>
        <input type="checkbox" name="user_type" value="borrower" />I understand
        I will have to repay this loan with interest in 6 monthly installments
      </label>
      <label>
        <input type="checkbox" name="user_type" value="borrower" />I understand
        if I am unable to repay an installment, the amount will be deducted from
        my monthly salary.
      </label>

      <Center>
        <Button>Confirm</Button>
        <Button>Reject</Button>
      </Center>
      <Center>
        <Contactus />
      </Center>
    </Stack>
  </Container>
)
