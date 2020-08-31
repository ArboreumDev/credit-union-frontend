import {
  Box,
  Center,
  Container,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { CgFileDocument } from "react-icons/cg"
import { LoanRequest } from "../../utils/types"
import { Details } from "./common/Details"

interface Params {
  loan: LoanRequest
}

const getTableObjectFromLoanRequest = (loan: LoanRequest) =>
  Object.entries({
    Status: "To Be disbursed",
    "Loan Amount": "INR 1,20,000",
    Repaid: "INR 6000",
    "Outstanding Principal": "INR 1,20,000",
    "Outstanding Interest": "INR 20,000",
    "Last Repayment Date": "30 Septembed 2020",
  })

export const BOngoingLoan = ({ loan: loanRequest }: Params) => (
  <Container minW="s" bg="white">
    <Box margin="20px" padding="10px" borderWidth="5px" borderRadius="lg">
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
      <Details keyValueTuples={getTableObjectFromLoanRequest(loanRequest)} />
    </Box>
  </Container>
)
