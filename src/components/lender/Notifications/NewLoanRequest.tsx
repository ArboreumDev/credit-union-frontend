import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
} from "@chakra-ui/core"
import { LoanRequest } from "../../../utils/types"

interface Params {
  loanRequest: LoanRequest
}

export const NewLoanRequest = ({ loanRequest }: Params) => (
  <Alert
    status="success"
    variant="subtle"
    flexDirection="column"
    justifyContent="center"
    textAlign="center"
    height="200px"
    width="inherit"
    marginTop="20px"
    marginBottom="20px"
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      New Loan Request
    </AlertTitle>
    <AlertDescription maxWidth="sm">
      Amount ₹{loanRequest.amount} | Interest{" "}
      {loanRequest.risk_calc_result.interestRate}% | Loan Term{" "}
      {loanRequest.risk_calc_result.loanTerm} months
    </AlertDescription>
    <AlertDescription marginTop="20px" maxWidth="sm">
      <HStack>
        <Button>Invest</Button>
        <Button>Reject</Button>
      </HStack>
    </AlertDescription>
  </Alert>
)
