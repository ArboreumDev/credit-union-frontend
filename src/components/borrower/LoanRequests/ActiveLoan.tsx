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
import { LoanRequest, Loan } from "lib/types"
import { useRouter } from "next/router"
import { Currency } from "../../common/Currency"
import { Details, KeyValueMap as KeyValueRows } from "../../common/Details"
import { Column, Row } from "../../common/Table"
import LoanModel from "./LoanModel"

interface Params {
  loan: Loan
  loanRequest?: LoanRequest
}

const getTableObjectFromLoanRequest = (loan: LoanModel): KeyValueRows[] => [
  { key: "Status", value: "To Be disbursed" },
  { key: "Loan Amount", value: <Currency amount={loan.amount} /> },
  { key: "Repaid", value: <Currency amount={loan.amountRepaid} /> },
  {
    key: "Outstanding Principal",
    // TODO: Fix these when adding repayment logic
    value: <Currency amount={loan.totalOutStandingDebt} />,
  },
  {
    key: "Outstanding Interest",
    value: <Currency amount={loan.interestAmount + 1} />,
  },
  { key: "Last Repayment Date", value: "30th October 2020" },
  {
    key: "Next Repayment Amount",
    value: <Currency amount={loan.nextPayment.amount} />,
    color: "red.500",
  },
  {
    key: "Next Repayment Due Date",
    value: "30th November 2020",
    color: "red.500",
  },
  {
    key: "Late Payment Fee",
    value: <Currency amount={200} />,
    color: "red.500",
  },
]

const BActiveLoan = ({ loan }: Params) => {
  const router = useRouter()
  const _loan = new LoanModel(loan)
  console.log('loan', _loan)
  const amt = _loan.amount
  return (
    <>
      <Stack>
        <Center>
          <Heading size="lg">Loan: {loan.state}</Heading>
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
                  <StatNumber>{_loan.purpose}</StatNumber>
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
                value={_loan.percRepaid}
                color="green.400"
              >
                <CircularProgressLabel maxW="80px" fontSize="20px">
                  {_loan.percRepaid}% Repaid
                </CircularProgressLabel>
              </CircularProgress>
            </Center>
          </Column>
        </Row>

        <Box h="30px" />
        <Details rows={getTableObjectFromLoanRequest(_loan)} />
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
