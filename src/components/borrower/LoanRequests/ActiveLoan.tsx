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
import { Currency } from "../../common/Currency"
import { Details, KeyValueMap as KeyValueRows } from "../../common/Details"
import { Column, Row, Table } from "../../common/Table"
import UpcomingRepayment from "../Notifications/UpcomingRepayment"
import LoanModel from "./LoanModel"

interface Params {
  loanRequest: LoanRequest
}

const getTableObjectFromLoanRequest = (loan: LoanModel): KeyValueRows[] => [
  { key: "Status", value: "To Be disbursed" },
  { key: "Loan Amount", value: <Currency amount={loan.amount} /> },
  { key: "Repaid", value: <Currency amount={loan.amountRepaid} /> },
  {
    key: "Outstanding Principal",
    // TODO: Fix these when adding repayment logic
    value: <Currency amount={loan.amount + loan.interestAmount} />,
  },
  {
    key: "Outstanding Interest",
    value: <Currency amount={loan.interestAmount} />,
  },
  { key: "Last Repayment Date", value: "30 August 2020" },
  {
    key: "Next Repayment Amount",
    value: <Currency amount={loan.nextPayment} />,
    color: "red.500",
  },
  {
    key: "Next Repayment Due Date",
    value: "30 September 2020",
    color: "red.500",
  },
  {
    key: "Late Payment Fee",
    value: <Currency amount={200} />,
    color: "red.500",
  },
]

const BActiveLoan = ({ loanRequest }: Params) => {
  const loan = new LoanModel(loanRequest)
  const amt = loan.amount
  return (
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
                    <Currency amount={amt} />
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
                value={loan.percRepaid}
                color="green.400"
              >
                <CircularProgressLabel maxW="80px" fontSize="20px">
                  {loan.percRepaid}% Repaid
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
}

export default BActiveLoan
