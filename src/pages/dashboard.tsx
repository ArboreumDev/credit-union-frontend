import { Box, Center, Heading } from "@chakra-ui/core"
import { useSession } from "next-auth/client"
import dynamic from "next/dynamic"
import Head from "next/head"
import { Session, User, LoanRequest } from "../utils/types"
import { getMostRecentLoanRequest, UIState } from "../utils/UIStateHelpers"
import AppBar from "../components/common/AppBar"
import Contactus from "../components/common/ContactUs"

const getBOngoingLoan = (loanRequest: LoanRequest) => {
  const BLoanRequestInitiated = dynamic(() =>
    import("../components/borrower/LoanRequests/BLoanRequestInitiated")
  )
  return <BLoanRequestInitiated loanRequest={loanRequest} />
}
const getBLoanNeedsConfirmation = (loanRequest: LoanRequest) => {
  const BLoanNeedsConfirmation = dynamic(() =>
    import("../components/borrower/LoanRequests/BLoanNeedsConfirmation")
  )
  return <BLoanNeedsConfirmation loanRequest={loanRequest} />
}
const getBLoanRequestInitiated = (loanRequest: LoanRequest) => {
  const BOngoingLoan = dynamic(() =>
    import("../components/borrower/BOngoingLoan")
  )
  return <BOngoingLoan loan={loanRequest} />
}

const getKYCNotApprovedYetComponent = (user: User) => {
  const ApplicationSubmitted = dynamic(() =>
    import("../components/borrower/Notifications/ApplicationSubmitted")
  )
  const CreateLoanModal = dynamic(() =>
    import("../components/borrower/CreateLoan/CreateLoanModal")
  )

  return (
    <div>
      <ApplicationSubmitted />
      <Center>
        <CreateLoanModal user={user} />
      </Center>
    </div>
  )
}

const getKYCConfirmedComponent = (user: User) => {
  const KYCCompleted = dynamic(() =>
    import("../components/borrower/Notifications/KYCCompleted")
  )
  const CreateLoanForm = dynamic(() =>
    import("../components/borrower/CreateLoan/CreateLoanForm")
  )

  return (
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
  )
}

const getLenderDashboardComponent = (user: User) => {
  const LenderDashboard = dynamic(() =>
    import("../components/lender/LenderDashboard")
  )
  return <LenderDashboard user={user} />
}

export const getDashboardComponent = (user: User, uiState: UIState) => {
  const loanRequests = user.loan_requests
  let loanRequest
  if (loanRequests) loanRequest = getMostRecentLoanRequest(user)

  return {
    [UIState.KYCNotApprovedYet]: getKYCNotApprovedYetComponent(user),
    [UIState.KYCConfirmed]: getKYCConfirmedComponent(user),
    [UIState.BLoanRequestInitiated]: getBLoanNeedsConfirmation(loanRequest),
    [UIState.BLoanRequestAwaitsConfirmation]: getBLoanNeedsConfirmation(
      loanRequest
    ),
    [UIState.BOngoingLoan]: getBOngoingLoan(loanRequest),
    [UIState.LDashboard]: getLenderDashboardComponent(user),
  }[uiState]
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
