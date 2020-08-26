import { getSession } from "next-auth/client"
import AppBar from "../components/AppBar"
import { Session, LoanRequestStatus, UserType } from "../utils/types"
import { useRouter } from "next/dist/client/router"
import Onboarding from "./onboarding"
import FrontPage from "./frontpage"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import BLoanRequestInProgress from "../components/borrower/BLoanRequestInProgress"
import BLoanDashboard from "../components/borrower/BLoanDashboard"
import { fetcher } from "../utils/api"
import { getSdk } from "../gql/sdk"
import { initializeGQL } from "../gql/graphql_client"
import { DbClient } from "../gql/db_client"

enum UIState {
  Landing,
  Onboarding,
  KYCNotApprovedYet,
  BReadyToMakeNewLoan,
  BLoanRequestInProgress,
  BLoanDashboard,
}

const getUIState = async (session: Session) => {
  console.log(session)
  if (!session) return UIState.Landing

  const user = session.user

  if (!session.user.user_type) return UIState.Onboarding

  const dbClient = new DbClient(getSdk(initializeGQL()))
  let dashboardInfo

  if (user.user_type == UserType.Borrower) {
    dashboardInfo = await dbClient.getBorrowerDashboardInfo(user.id)
    if (dashboardInfo.status === "readyForLoanRequest")
      return UIState.BReadyToMakeNewLoan
    if (
      dashboardInfo.status === LoanRequestStatus.awaiting_borrower_confirmation
    )
      return UIState.BReadyToMakeNewLoan
    if (dashboardInfo.status === LoanRequestStatus.live)
      return UIState.BLoanDashboard
  }
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
    </div>
  )
}

Page.getInitialProps = async (context) => {
  const session = (await getSession(context)) as Session
  const state = await getUIState(session)
  return { state }
}

export default Page
