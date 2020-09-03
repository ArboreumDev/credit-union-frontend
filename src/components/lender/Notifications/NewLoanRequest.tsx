import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/core"

export default function NewLoanRequest() {
  return (
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
        Thanks for submitting your application. Our team will get back to you
        soon.
      </AlertDescription>
    </Alert>
  )
}
