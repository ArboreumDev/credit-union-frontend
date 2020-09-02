import {
  Box,
  Center,
  Container,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Button,
  Stack,
} from "@chakra-ui/core"
import { CgFileDocument } from "react-icons/cg"
import { LoanRequest } from "../../utils/types"
import { Details, Row } from "./common/Details"
import RepaymentNotReceived from "./Notifications/RepaymentNotReceived"

interface Params {
  loan: LoanRequest
}

const getTableObjectFromLoanRequest = (loan: LoanRequest): Row[] => [
  { key: "Status", value: "To Be disbursed" },
  { key: "Loan Amount", value: "INR 1,20,000" },
  { key: "Repaid", value: "INR 6000" },
  { key: "Outstanding Principal", value: "INR 1,20,000" },
  { key: "Outstanding Interest", value: "INR 20,000" },
  { key: "Last Repayment Date", value: "30 August 2020" },
  { key: "Next Repayment Amount", value: "INR 6,000" },
  {
    key: "Next Repayment Due Date",
    value: "30 Septembed 2020",
    color: "red.500",
  },
]

export const BOngoingLoan = ({ loan: loanRequest }: Params) => (
  <Container minW="s" bg="white">
    <RepaymentNotReceived />
    <Stack padding="10px" borderWidth="3px">
      <Center>
        <Text padding="0px" margin="0px" fontSize="30px">
          <CgFileDocument />
        </Text>
      </Center>
      <Center>
        <Text>Active Loan</Text>
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
      <Box h="30px" />
      <Details rows={getTableObjectFromLoanRequest(loanRequest)} />
      <Box h="30px" />

      <Center>
        <Button>Make Repayment</Button>
      </Center>
    </Stack>
  </Container>
)
