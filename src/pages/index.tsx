import { getSession } from "next-auth/client"
import AppBar from "../components/AppBar"
import { Session, LoanRequestStatus } from "../utils/types"
import { useRouter } from "next/dist/client/router"
import Onboarding from "./onboarding"
import FrontPage from "./frontpage"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import BLoanRequestInProgress from "../components/borrower/BLoanRequestInProgress"
import BLoanDashboard from "../components/borrower/BLoanDashboard"
import { fetcher } from "../utils/api"

enum UIState {
  Landing,
  Onboarding,
  KYCNotApprovedYet,
  BReadyToMakeNewLoan,
  BLoanRequestInProgress,
  BLoanDashboard,
}

const getUIState = (session: Session) => {
  if (!session) return UIState.Landing

  const payload = { user_email: session.user.email }
  fetcher("GetDashboardInfo", payload).then((dashboardInfo) => {
    console.log("dashboardInfo", dashboardInfo)
    if (dashboardInfo.status === "readyForLoanRequest") {
      return UIState.BReadyToMakeNewLoan
    } else if (
      dashboardInfo.status === LoanRequestStatus.awaiting_borrower_confirmation
    ) {
      // or is this state to be used when the ai-is running?
      return UIState.BLoanRequestInProgress
    } else if (dashboardInfo.status === LoanRequestStatus.live) {
      return UIState.BLoanDashboard
    }
  })
}

const Page = (props: { state: UIState }) => {
  const router = useRouter()
  const { state } = props

  if (state === UIState.Landing) return <FrontPage />
  if (state === UIState.Onboarding) return <Onboarding />

  return (
    <div>
      <AppBar />
      {state == UIState.KYCNotApprovedYet && <ApplicationSubmitted />}
      {state == UIState.BReadyToMakeNewLoan && <BReadyToMakeNewLoan />}
      {state == UIState.BLoanRequestInProgress && <BLoanRequestInProgress />}
      {state == UIState.BLoanDashboard && <BLoanDashboard />}
    </div>
  )
}

Page.getInitialProps = async (context) => {
  const session = (await getSession(context)) as Session
  return { state: getUIState(session) }
}

export default Page
