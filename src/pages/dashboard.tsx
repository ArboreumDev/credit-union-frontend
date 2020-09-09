import { Box, Center, Heading } from "@chakra-ui/core"
import { useSession } from "next-auth/client"
import dynamic from "next/dynamic"
import Head from "next/head"
const BOngoingLoan = dynamic(() =>
  import("../components/borrower/BOngoingLoan")
)
const CreateLoanForm = dynamic(() =>
  import("../components/borrower/CreateLoan/CreateLoanForm")
)
const CreateLoanModal = dynamic(() =>
  import("../components/borrower/CreateLoan/CreateLoanModal")
)
const BLoanNeedsConfirmation = dynamic(() =>
  import("../components/borrower/LoanRequests/BLoanNeedsConfirmation")
)
const BLoanRequestInitiated = dynamic(() =>
  import("../components/borrower/LoanRequests/BLoanRequestInitiated")
)
const ApplicationSubmitted = dynamic(() =>
  import("../components/borrower/Notifications/ApplicationSubmitted")
)
const KYCCompleted = dynamic(() =>
  import("../components/borrower/Notifications/KYCCompleted")
)
const AppBar = dynamic(() => import("../components/common/AppBar"))
const Contactus = dynamic(() => import("../components/common/ContactUs"))
import { Session, User } from "../utils/types"
import { getMostRecentLoanRequest, UIState } from "../utils/UIStateHelpers"

const getKYCNotApprovedYetComponent = (user: User) => (
  <div>
    <ApplicationSubmitted />
    <Center>
      <CreateLoanModal user={user} />
    </Center>
  </div>
)

const getKYCConfirmedComponent = (user: User) => (
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
    [UIState.BLoanRequestInitiated]: (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [UIState.BLoanRequestAwaitsConfirmation]: (
      <BLoanNeedsConfirmation loanRequest={loanRequest} />
    ),
    [UIState.BOngoingLoan]: <BOngoingLoan loan={loanRequest} />,
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
