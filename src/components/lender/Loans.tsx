import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/core"
import { LoanRequestStatus, RoI, InvestedLoan } from "../../lib/types"
import { Currency } from "../common/Currency"

interface Props {
  loans: InvestedLoan[]
  roi: RoI
}

const loanStatusToText = {
  [LoanRequestStatus.initiated]: "Processing",
  [LoanRequestStatus.awaiting_borrower_confirmation]: "Processing",
  [LoanRequestStatus.active]: "Active",
  [LoanRequestStatus.settled]: "Completed",
}

const roi_to_expected = (roi: RoI, loan_id: string) => {
  return (
    roi.apr_on_loans.loans[loan_id].principal.remain +
    roi.apr_on_loans.loans[loan_id].interest.remain
  )
}

const roi_to_paid = (roi: RoI, loan_id: string) => {
  return (
    roi.apr_on_loans.loans[loan_id].interest.paid +
    roi.apr_on_loans.loans[loan_id].interest.paid
  )
}

const InvestedLoans = ({ loans, roi }: Props) => (
  <Stack spacing="15px">
    <Box>
      <Heading size="md">Loans</Heading>
    </Box>
    <Flex fontWeight="semibold">
      <Box verticalAlign="center" flex="1">
        Amount
      </Box>
      <Box verticalAlign="center" flex="1">
        Status
      </Box>
      <Box flex="1">Exposure</Box>
      <Box flex="1">Maturity</Box>
      <Box flex="1">Earned Interest</Box>
      <Box flex="1">Expected Interest</Box>
    </Flex>
    {loans.map((loan) => (
      <Flex key={loan.loan_id}>
        <Box verticalAlign="center" flex="1">
          <Text>{loan.loan_request.amount}</Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{loanStatusToText[loan.loan_request.status]}</Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>
            {Math.round((100 * loan.lender_amount) / loan.loan_request.amount) +
              "%"}
          </Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{"TODO"}</Text>
        </Box>
        <Box flex="1">
          <Currency
            amount={roi.apr_on_loans.loans[loan.loan_id].interest.paid}
          />
        </Box>
        <Box flex="1">
          <Currency
            amount={roi.apr_on_loans.loans[loan.loan_id].interest.remain}
          />
        </Box>
      </Flex>
    ))}
  </Stack>
)

export default InvestedLoans
