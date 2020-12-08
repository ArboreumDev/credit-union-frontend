import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

export default function UpcomingRepayment() {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="200px"
      marginBottom="20px"
    >
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Upcoming Repayment!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Your installment is expected by 30 November, 2020. If not received, this
        amount will be deducted from your salary.
      </AlertDescription>
    </Alert>
  )
}
