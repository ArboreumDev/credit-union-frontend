import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { CgFileDocument } from "react-icons/cg"
import { dec_to_perc } from "lib/currency"
import { LoanRequest } from "lib/types"
import { Currency } from "../common/Currency"
import { Details, KeyValueMap as KeyValueRows } from "../common/Details"
import { Column, Row, Table } from "../common/Table"
import UpcomingRepayment from "./Notifications/UpcomingRepayment"

interface Params {
  loanRequest: LoanRequest
}

const getTableObjectFromLoanRequest = (loan: LoanRequest): KeyValueRows[] => [
  { key: "Status", value: "To Be disbursed" },
  { key: "Loan Amount", value: "₹1,20,000" },
  { key: "Repaid", value: "₹10,000" },
  { key: "Outstanding Principal", value: "₹1,10,000" },
  { key: "Outstanding Interest", value: "₹7,700" },
  { key: "Last Repayment Date", value: "30 August 2020" },
  { key: "Next Repayment Amount", value: "₹10,000", color: "red.500" },
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

const BActiveLoan = ({ loanRequest: loan }: Params) => (
  <>
    <Stack>
      <Center>
        <Heading size="lg">Active Loan</Heading>
      </Center>

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
            <CircularProgress
              size="120px"
              value={dec_to_perc(10000 / loan.amount)}
              color="green.400"
            >
              <CircularProgressLabel maxW="80px" fontSize="20px">
                {dec_to_perc(10000 / loan.amount)}% Repaid
              </CircularProgressLabel>
            </CircularProgress>
          </Center>
        </Column>
      </Row>

      <Box h="30px" />
      <Details rows={getTableObjectFromLoanRequest(loan)} />
      <Box h="30px" />

      <Center>
        <Button colorScheme="blue">Make Repayment</Button>
      </Center>
    </Stack>
  </>
)

export default BActiveLoan
