import KYCCompleted from "./Notifications/KYCCompleted"
import {
  Container,
  Stack,
  Center,
  Button,
  Spinner,
  Box,
  Text,
  ListIcon,
  ListItem,
  List,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/core"
import { useSession } from "next-auth/client"
import { Session, LoanRequestStatus } from "../../utils/types"
import { bool } from "aws-sdk/clients/signer"
import { CgFileDocument } from "react-icons/cg"
import { FaCheckCircle } from "react-icons/fa"

export default function BLoanRequestInProgress() {
  const [session, loading]: [Session, bool] = useSession()
  if (loading) return <Spinner />

  const user = session.user
  console.log(user)
  const loanRequest = session.user.loan_requests.sort(
    (l1, l2) => Date.parse(l2.created_at) - Date.parse(l1.created_at)
  )[0]
  return (
    <Container maxW="400px" bg="white">
      <Stack spacing={1}>
        <Center>
          <Text padding="0px" margin="0px" fontSize="100px">
            <CgFileDocument />
          </Text>
        </Center>
        <Center>
          <Text>Your loan request is being processed.</Text>
        </Center>
        <Box>
          <StatGroup>
            <Stat>
              <StatLabel>Amount</StatLabel>
              <StatNumber>INR {loanRequest.amount}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Purpose</StatLabel>
              <StatNumber>{loanRequest.purpose}</StatNumber>
            </Stat>
          </StatGroup>
        </Box>
      </Stack>
    </Container>
  )
}
