import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
} from "@chakra-ui/core"

export default function ApplicationSubmitted() {
  return (
    <Center>
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
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Application submitted!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Thanks for submitting your application. Our team will get back to you
          soon.
        </AlertDescription>
      </Alert>
    </Center>
  )
}
