import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/core"
import { RoI, InvestedLoan, LoanInfo } from "../../lib/types"
import { Currency } from "../common/Currency"
import { Loan_State_Enum } from "../../gql/sdk"

interface Props {
  loans: InvestedLoan[]
  roi: RoI
}

const loanStatusToText = {
  [Loan_State_Enum.Live]: "Live",
  [Loan_State_Enum.Repaid]: "Repaid",
  [Loan_State_Enum.Default]: "Defaulted",
}

// const roi_to_expected = (roi: RoI, loan_id: string) => {
//   return (
//     roi.apr_on_loans.loans[loan_id].principal.remain +
//     roi.apr_on_loans.loans[loan_id].interest.remain
//   )
// }

// const roi_to_paid = (roi: RoI, loan_id: string) => {
//   return (
//     roi.apr_on_loans.loans[loan_id].interest.paid +
//     roi.apr_on_loans.loans[loan_id].interest.paid
//   )
// }

const get_exposure = (roi: RoI, loan: LoanInfo) => {
  return 100
  // const totalOutstanding = loan.schedule.borrower_view.corpus_principal.remain
  // const expectedByUser =
  // roi.apr_on_loans.loans[loan.request_id].principal.remain
  // return expectedByUser ? expectedByUser / totalOutstanding : 0
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
          <Currency amount={loan.loan_request.amount} />
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{loanStatusToText[loan.loan_request.status]}</Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>
            {Math.round(
              100 * get_exposure(roi, loan.loan_request.loan as LoanInfo)
            ) + "%"}
          </Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{"July 2021"}</Text>
        </Box>
        <Box flex="1">
          <Currency
            amount={roi.apr_on_loans.loans[loan.loan_id]?.interest.paid || 0}
          />
        </Box>
        <Box flex="1">
          <Currency
            amount={
              Math.abs(roi.apr_on_loans.loans[loan.loan_id]?.interest.remain) ||
              0
            }
          />
        </Box>
      </Flex>
    ))}
  </Stack>
)

export default InvestedLoans
