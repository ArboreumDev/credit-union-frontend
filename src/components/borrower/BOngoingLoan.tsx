import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { CgFileDocument } from "react-icons/cg"
import { LoanRequest } from "../../utils/types"
import { Currency } from "../common/Currency"
import { Details, KeyValueMap } from "../common/Details"
import { Column, Row, Table } from "../common/Table"
import RepaymentNotReceived from "./Notifications/RepaymentNotReceived"

interface Params {
  loanRequest: LoanRequest
}

const getTableObjectFromLoanRequest = (loan: LoanRequest): KeyValueMap[] => [
  { key: "Status", value: "To Be disbursed" },
  { key: "Loan Amount", value: "₹1,20,000" },
  { key: "Repaid", value: "₹6,000" },
  { key: "Outstanding Principal", value: "₹1,20,000" },
  { key: "Outstanding Interest", value: "₹20,000" },
  { key: "Last Repayment Date", value: "30 August 2020" },
  { key: "Next Repayment Amount", value: "₹6,000", color: "red.500" },
  {
    key: "Next Repayment Due Date",
    value: "30 September 2020",
    color: "red.500",
  },
  {
    key: "Late Payment Fee",
    value: "₹200",
    color: "red.500",
  },
]

const BOngoingLoan = ({ loanRequest: loan }: Params) => (
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
      <Table>
        <Row>
          <Column>
            <Center>
              <Stack spacing="3">
                <Stat>
                  <StatLabel>Amount</StatLabel>
                  <StatNumber>
                    <Currency amount={loan.amount} />
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Purpose</StatLabel>
                  <StatNumber>{loan.purpose}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Next Repayment Due In</StatLabel>
                  <StatNumber>
                    20 Days
                    {/* {formatDistance(new Date(), new Date(2020, 8, 30))} */}
                  </StatNumber>
                </Stat>
              </Stack>
            </Center>
          </Column>
          <Column>
            <Center>
              <CircularProgress size="120px" value={50} color="green.400">
                <CircularProgressLabel maxW="80px" fontSize="20px">
                  {50}% Repaid
                </CircularProgressLabel>
              </CircularProgress>
            </Center>
          </Column>
        </Row>
      </Table>
      <Box h="30px" />
      <Details rows={getTableObjectFromLoanRequest(loan)} />
      <Box h="30px" />

      <Center>
        <Button>Make Repayment</Button>
      </Center>
    </Stack>
  </Container>
)

export default BOngoingLoan
