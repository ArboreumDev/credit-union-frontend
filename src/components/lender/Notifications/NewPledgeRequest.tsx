import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
  Text,
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
      // height="320px"
      width="inherit"
      marginTop="20px"
      marginBottom="20px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        New Pledge Request
      </AlertTitle>
      <AlertDescription>
        {loanRequest.user.name} ({loanRequest.user.email}) hase requested you to
        pledge <Currency amount={pledgeRequest.pledge_amount} /> for his loan
        request of amount <Currency amount={loanRequest.amount} />
      </AlertDescription>
      <AlertDescription>
        <Text>
          Total Amount <Currency amount={loanRequest.amount} />
        </Text>
        <Text>
          Your support: <Currency amount={pledgeRequest.pledge_amount} />
        </Text>
        <Text>Interest: {riskCalcResult.interestRate}%</Text>
        <Text>Loan Term: {riskCalcResult.loanTerm} months</Text>
        <Text>Repayments will be made at the end of every month</Text>
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
