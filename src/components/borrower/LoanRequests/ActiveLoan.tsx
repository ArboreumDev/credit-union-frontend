import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/core"
import { LoanRequest } from "lib/types"
import { useRouter } from "next/router"
import { Currency } from "../../common/Currency"
import { Details, KeyValueMap as KeyValueRows } from "../../common/Details"
import { Column, Row } from "../../common/Table"
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
    value: <Currency amount={loan.outstandingPrincipal} />,
  },
  {
    key: "Outstanding Interest",
    value: <Currency amount={loan.interestAmount + 1} />,
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
  const router = useRouter()
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
          <Button
            colorScheme="blue"
            onClick={() => router.push("/dashboard/repay")}
          >
            Make Repayment
          </Button>
        </Center>
      </Stack>
    </>
  )
}

export default BActiveLoan
