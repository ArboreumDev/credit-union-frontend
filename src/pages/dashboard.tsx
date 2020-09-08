import Onboarding from "../components/common/onboarding/onboarding"
import { Center, Box, Heading } from "@chakra-ui/core"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import BAwaitingKYCConfirmation from "../components/borrower/BAwaitingKYCConfirmation"
import { BOngoingLoan } from "../components/borrower/BOngoingLoan"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import { BLoanNeedsConfirmation } from "../components/borrower/LoanRequests/BLoanNeedsConfirmation"
import { BLoanRequestInitiated } from "../components/borrower/LoanRequests/BLoanRequestInitiated"
import AppBar from "../components/common/AppBar"
import { Contactus } from "../components/common/ContactUs"
import LandingPage from "../components/common/landing"
import LenderDashboard from "../components/lender/LenderDashboard"
import { Session, User } from "../utils/types"
import {
  getMostRecentLoanRequest,
  getUIState,
  UIState,
} from "../utils/UIStateHelpers"
import ProfilePage from "./profile"
import LoginPage from "./login"

import { useSession } from "next-auth/client"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import CreateLoanModal from "../components/borrower/CreateLoan/CreateLoanModal"
import KYCCompleted from "../components/borrower/Notifications/KYCCompleted"
import CreateLoanForm from "../components/borrower/CreateLoan/CreateLoanForm"

export const getDashboardComponent = (user: User, uiState: UIState) => {
  const loanRequests = user.loan_requests
  let loanRequest
  if (loanRequests) loanRequest = getMostRecentLoanRequest(user)

  const dashboardComponentMap = {
    [UIState.KYCNotApprovedYet]: (
      <div>
        <ApplicationSubmitted />
        <Center>
          <CreateLoanModal user={user} />
        </Center>
      </div>
    ),
    [UIState.KYCConfirmed]: (
      <Box>
        <KYCCompleted />
        <Box h="30px" />
        <Center>
          <Heading as="h1" size="lg">
            Request Loan
          </Heading>
        </Center>
        <Box h="30px" />
        <CreateLoanForm user={user} />
      </Box>
    ),
    [UIState.BLoanRequestInitiated]: loanRequest && (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [UIState.BLoanRequestAwaitsConfirmation]: (
      <BLoanNeedsConfirmation loanRequest={loanRequest} />
    ),
    [UIState.BOngoingLoan]: <BOngoingLoan loan={loanRequest} />,
    [UIState.LDashboard]: <LenderDashboard user={user} />,
  }
  return dashboardComponentMap[uiState]
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

  const mainComponent = getDashboardComponent(session.user, session.uiState)

  return (
    <div>
      <AppBar />
      {mainComponent}
      <Center margin="80px">
        <Contactus />
      </Center>
    </div>
  )
}

export default Dashboard
