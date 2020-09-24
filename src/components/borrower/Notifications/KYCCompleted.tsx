import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"

export default function KYCCompleted() {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="200px"
      marginBottom="20px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Congrats!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        KYC has been completed successfully
      </AlertDescription>
      <AlertDescription maxWidth="sm">
        You can now request a loan
      </AlertDescription>
    </Alert>
  )
}
