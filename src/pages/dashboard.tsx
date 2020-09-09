import { Box, Center, Heading } from "@chakra-ui/core"
import { useSession } from "next-auth/client"
import dynamic from "next/dynamic"
import Head from "next/head"
import AppBar from "../components/common/AppBar"
import Contactus from "../components/common/ContactUs"
import {
  LoanRequest,
  LoanRequestStatus,
  Session,
  User,
  UserType,
} from "../utils/types"
import { getMostRecentLoanRequest, UIState } from "../utils/UIStateHelpers"
import LenderDashboard from "../components/lender/LenderDashboard"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import CreateLoanForm from "../components/borrower/CreateLoan/CreateLoanForm"
import BLoanRequestInitiated from "../components/borrower/LoanRequests/BLoanRequestInitiated"
import BLoanNeedsConfirmation from "../components/borrower/LoanRequests/BLoanNeedsConfirmation"
import BOngoingLoan from "../components/borrower/BOngoingLoan"

const getRequestLoanComponent = (user: User) => {
  return (
    <Box>
      <Center>
        <Heading as="h1" size="lg">
          Request Loan
        </Heading>
      </Center>
      <Box h="30px" />
      <CreateLoanForm user={user} />
    </Box>
  )
}

const getLoanRequest = (loanRequest: LoanRequest) => {
  return {
    [LoanRequestStatus.initiated]: (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [LoanRequestStatus.awaiting_borrower_confirmation]: (
      <BLoanNeedsConfirmation loanRequest={loanRequest} />
    ),
    [LoanRequestStatus.live]: <BOngoingLoan loanRequest={loanRequest} />,
  }[loanRequest.status]
}

export const getDashboardComponent = (user: User) => {
  if (user.user_type === UserType.Lender) return <LenderDashboard user={user} />
  else {
    const loanRequests = user.loan_requests
    return (
      <div>
        {!user.kyc_approved && <ApplicationSubmitted />}
        {user.loan_requests.length === 0 && getRequestLoanComponent(user)}
        {user.loan_requests.length > 0 && getLoanRequest(user.loan_requests[0])}
      </div>
    )
  }
}

const Dashboard = () => {
  const [session, loading]: [Session, any] = useSession()

  if (loading) return <AppBar />
  if (
    !session ||
    session.uiState === UIState.Landing ||
    session.uiState === UIState.Onboarding
  )
    location.replace("/")

  const mainComponent = getDashboardComponent(session.user)

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AppBar />
      {mainComponent}
      <Center margin="80px">
        <Contactus />
      </Center>
    </div>
  )
}

export default Dashboard
