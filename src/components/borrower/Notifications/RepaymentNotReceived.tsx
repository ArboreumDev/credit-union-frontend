import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"

export default function RepaymentNotReceived() {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="200px"
      width="inherit"
      marginTop="20px"
      marginBottom="20px"
    >
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Upcoming Repayment!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Your installment is expected by 30 September, 2020. If not received,
        this amount will be deducted from your salary.
      </AlertDescription>
    </Alert>
  )
}
