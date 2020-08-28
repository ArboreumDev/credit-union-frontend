import { getSession } from "next-auth/client"
import AppBar from "../components/AppBar"
import { Session, LoanRequestStatus, UserType, User } from "../utils/types"
import { useRouter } from "next/dist/client/router"
import Onboarding from "./onboarding"
import FrontPage from "./frontpage"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import BLoanRequestInProgress from "../components/borrower/BLoanRequestInProgress"
import BLoanDashboard from "../components/borrower/BLoanDashboard"

enum UIState {
  Landing,
  Onboarding,
  KYCNotApprovedYet,
  BReadyToMakeNewLoan,
  BLoanRequestInProgress,
  BLoanDashboard,
  LDashboard,
}

const checkForOngoingLoanRequests = (user: User) =>
  user.loan_requests.some((lr) =>
    [
      LoanRequestStatus.initiated,
      LoanRequestStatus.awaiting_borrower_confirmation,
    ].includes(lr.status)
  )

const getUIState = async (session: Session) => {
  if (!session) return UIState.Landing

  const user = session.user

  console.log("in index", user)

  if (!user.user_type) return UIState.Onboarding
  if (!user.kyc_approved) return UIState.KYCNotApprovedYet
  if (user.kyc_approved) {
    if (user.user_type === UserType.Borrower) {
      if (user.loan_requests.length == 0) return UIState.BReadyToMakeNewLoan
      if (checkForOngoingLoanRequests(user))
        return UIState.BLoanRequestInProgress
      else return UIState.BLoanDashboard
    }
    if (user.user_type === UserType.Lender) {
      return UIState.LDashboard
    }
  }

  return UIState.Landing
}

const Page = (params: { state: UIState }) => {
  const { state } = params
  const router = useRouter()

  if (state === UIState.Landing) return <FrontPage />
  if (state === UIState.Onboarding) return <Onboarding />

  return (
    <div>
      <AppBar />
      {state == UIState.KYCNotApprovedYet && <ApplicationSubmitted />}
      {state == UIState.BReadyToMakeNewLoan && <BReadyToMakeNewLoan />}
      {state == UIState.BLoanRequestInProgress && <BLoanRequestInProgress />}
      {state == UIState.BLoanDashboard && <BLoanDashboard />}
      {state == UIState.LDashboard && <div>Lender dashboard</div>}
    </div>
  )
}

Page.getInitialProps = async (context) => {
  const session = (await getSession(context)) as Session
  const state = await getUIState(session)
  return { state }
}

export default Page
