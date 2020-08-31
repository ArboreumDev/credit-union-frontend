import { getSession } from "next-auth/client"
import AppBar from "../components/AppBar"
import { Session, LoanRequestStatus, UserType, User } from "../utils/types"
import { useRouter } from "next/dist/client/router"
import Onboarding from "../components/onboarding"
import { UIState, getUIState } from "../utils/UIStateHelpers"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import {
  BLoanRequestInitiated,
  BLoanRequestAwaitsConfirmation,
} from "../components/borrower/BLoanRequests"
import BLoanDashboard from "../components/borrower/BLoanDashboard"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import LandingPage from "../components/landing"

export function getUIStateComponentMap(user: User) {
  return {
    [UIState.Landing]: <LandingPage />,
    [UIState.Onboarding]: <Onboarding user={user} />,
    [UIState.KYCNotApprovedYet]: <ApplicationSubmitted />,
    [UIState.BReadyToMakeNewLoan]: <BReadyToMakeNewLoan user={user} />,
    [UIState.BLoanRequestInitiated]: (
      <BLoanRequestInitiated loanRequest={user.loan_requests[0]} />
    ),
    [UIState.BLoanRequestAwaitsConfirmation]: (
      <BLoanRequestAwaitsConfirmation loanRequest={user.loan_requests[0]} />
    ),
    [UIState.BLoanDashboard]: <div>Loan Dashboard</div>,
    [UIState.LDashboard]: <div>Lender Dashboard</div>,
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
