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
import {
  Session,
  LoanRequestStatus,
  User,
  LoanRequest,
} from "../../utils/types"
import { bool } from "aws-sdk/clients/signer"
import { CgFileDocument } from "react-icons/cg"
import { AiOutlineFileDone } from "react-icons/ai"
import { Contactus } from "../ContactUs"

const LoanRequestInProcess = ({
  loanRequest,
}: {
  loanRequest: LoanRequest
}) => (
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
          <StatNumber>INR 6000</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Purpose</StatLabel>
          <StatNumber>Auto Loan</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  </Stack>
)

const LoanRequestAwaitingConfirmation = ({
  loanRequest,
}: {
  loanRequest: LoanRequest
}) => (
  <Stack spacing={2}>
    <Center>
      <Text padding="0px" margin="0px" fontSize="100px" color="green.500">
        <AiOutlineFileDone />
      </Text>
    </Center>
    <Center>
      <Text>Congratulations, your loan request is processed!</Text>
    </Center>
    <Box>
      <StatGroup>
        <Stat>
          <StatLabel>Amount</StatLabel>
          <StatNumber>INR 5000</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Purpose</StatLabel>
          <StatNumber>Home Loan</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Interest</StatLabel>
          <StatNumber>5.5%</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Due in 6 months</StatLabel>
          <StatNumber>INR 5,500</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Monthly Installments</StatLabel>
          <StatNumber>INR 500</StatNumber>
        </Stat>
      </StatGroup>
    </Box>

    <label>
      <input type="checkbox" name="user_type" value="borrower" />I understand I
      will have to repay this loan with interest in 6 monthly installments
    </label>
    <label>
      <input type="checkbox" name="user_type" value="borrower" />I understand if
      I am unable to repay an installment, the amount will be deducted from my
      monthly salary.
    </label>

    <Center>
      <Button>Confirm</Button>
      <Button>Reject</Button>
    </Center>
    <Center>
      <Contactus />
    </Center>
  </Stack>
)

export default function BLoanRequestInProgress() {
  const [session, loading]: [Session, bool] = useSession()
  if (loading) return <Spinner />

  const user = session.user
  console.log(user)
  const loanRequest = session.user.loan_requests.sort(
    (l1, l2) => Date.parse(l2.created_at) - Date.parse(l1.created_at)
  )[0]
  return (
    <Container minW="s" bg="white">
      {/* {(loanRequest.status===LoanRequestStatus.initiated) && <LoanRequestInProcess loanRequest={loanRequest} />} */}
      {loanRequest.status === LoanRequestStatus.initiated && (
        <LoanRequestAwaitingConfirmation loanRequest={loanRequest} />
      )}
    </Container>
  )
}
