import { getSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import AppBar from "../components/AppBar"
import { BOngoingLoan } from "../components/borrower/BLoan"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import LandingPage from "../components/landing"
import Onboarding from "../components/onboarding"
import { Session, User } from "../utils/types"
import {
  getMostRecentLoanRequest,
  getUIState,
  UIState,
} from "../utils/UIStateHelpers"
import ProfilePage from "./profile"
import { BLoanRequestInitiated } from "../components/borrower/LoanRequests/LoanRequestInitiated"
import { BLoanRequestAwaitsConfirmation } from "../components/borrower/LoanRequests/LoanNeedsConfirmation"

export const getUIStateComponentMap = (user: User) => {
  const loanRequests = user.loan_requests
  let loanRequest
  if (loanRequests) loanRequest = getMostRecentLoanRequest(user)

  return {
    [UIState.Landing]: <LandingPage />,
    [UIState.Onboarding]: <Onboarding user={user} />,
    [UIState.KYCNotApprovedYet]: <ApplicationSubmitted />,
    [UIState.BReadyToMakeNewLoan]: <BReadyToMakeNewLoan user={user} />,
    [UIState.BLoanRequestInitiated]: loanRequest && (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [UIState.BLoanRequestAwaitsConfirmation]: (
      <BLoanRequestAwaitsConfirmation loanRequest={loanRequest} />
    ),
    [UIState.BOngoingLoan]: <BOngoingLoan loan={loanRequest} />,
    [UIState.LDashboard]: <div>Lender Dashboard</div>,
    [UIState.Profile]: <ProfilePage user={user} />,
  }
}

interface Props {
  state: UIState
  session: Session
}

const Page = ({ state, session }: Props) => {
  const router = useRouter()

  if (state === UIState.Landing) return <LandingPage />

  const componentMap = getUIStateComponentMap(session.user)
  if (state === UIState.Onboarding) return componentMap[state]
  return (
    <div>
      <AppBar />
      {componentMap[state]}
    </div>
  )
}

Page.getInitialProps = async (context) => {
  const session = (await getSession(context)) as Session
  const state = await getUIState(session)
  return { state, session }
}

export default Page
