import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core"

export default function KYCCompleted() {
  return (
    <div>
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="200px"
        width="inherit"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Congrats!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          KYC has been completed successfully on 12 September 2020. You can now
          requests a loan.
        </AlertDescription>
      </Alert>
    </div>
  )
}
