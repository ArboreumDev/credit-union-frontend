import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/core"

export default function ApplicationSubmitted() {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      height="200px"
      width="inherit"
      marginBottom="20px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Application submitted!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for submitting your documents. We will contact you if further
        information is needed
      </AlertDescription>
    </Alert>
  )
}
