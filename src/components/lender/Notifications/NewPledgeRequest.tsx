import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
} from "@chakra-ui/core"
import { PledgeRequest, CalculatedRisk } from "../../../utils/types"
import { Currency } from "../../common/Currency"

interface Params {
  pledgeRequest: PledgeRequest
}

export const NewPledgeRequest = ({ pledgeRequest }: Params) => {
  const loanRequest = pledgeRequest.loan_request
  const riskCalcResult = loanRequest.risk_calc_result as CalculatedRisk

  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="280px"
      width="inherit"
      marginTop="20px"
      marginBottom="20px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        New Loan Request
      </AlertTitle>
      <AlertDescription>
        {loanRequest.user.name} ({loanRequest.user.email}) is requesting a loan
        for {loanRequest.purpose}
      </AlertDescription>
      <AlertDescription>
        Amount <Currency amount={loanRequest.amount} /> | Interest{" "}
        {riskCalcResult.interestRate}% | Loan Term {riskCalcResult.loanTerm}{" "}
        months
      </AlertDescription>
      <AlertDescription marginTop="20px" maxWidth="sm">
        <HStack>
          <Button>Invest</Button>
          <Button>Reject</Button>
        </HStack>
      </AlertDescription>
    </Alert>
  )
}
