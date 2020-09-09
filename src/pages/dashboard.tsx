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

export const getDashboardComponent = (user: User, uiState: UIState) => {
  const loanRequests = user.loan_requests
  let loanRequest
  if (loanRequests) loanRequest = getMostRecentLoanRequest(user)
  switch (uiState) {
    case UIState.KYCNotApprovedYet:
      return (
        <div>
          <ApplicationSubmitted />
          <Center>
            <CreateLoanModal user={user} />
          </Center>
        </div>
      )
    case UIState.KYCConfirmed:
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
    case UIState.BLoanRequestInitiated:
      return <BLoanRequestInitiated loanRequest={loanRequest} />
    case UIState.BLoanRequestAwaitsConfirmation:
      return <BLoanNeedsConfirmation loanRequest={loanRequest} />
    case UIState.BOngoingLoan:
      return <BOngoingLoan loan={loanRequest} />
    case UIState.LDashboard: {
      const LenderDashboard = dynamic(() =>
        import("../components/lender/LenderDashboard")
      )
      return <LenderDashboard user={user} />
    }
    default:
      return <div></div>
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
