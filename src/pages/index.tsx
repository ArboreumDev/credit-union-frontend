import { Center } from "@chakra-ui/core"
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
import Onboarding from "../components/common/onboarding/onboarding"
import LenderDashboard from "../components/lender/LenderDashboard"
import { Session, User } from "../utils/types"
import {
  getMostRecentLoanRequest,
  getUIState,
  UIState,
} from "../utils/UIStateHelpers"
import ProfilePage from "./profile"

export const getUIStateComponentMap = (user: User) => {
  const loanRequests = user.loan_requests
  let loanRequest
  if (loanRequests) loanRequest = getMostRecentLoanRequest(user)

  return {
    [UIState.Landing]: <LandingPage />,
    [UIState.Onboarding]: <Onboarding user={user} />,
    [UIState.KYCNotApprovedYet]: <BAwaitingKYCConfirmation user={user} />,
    [UIState.BReadyToMakeNewLoan]: <BReadyToMakeNewLoan user={user} />,
    [UIState.BLoanRequestInitiated]: loanRequest && (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [UIState.BLoanRequestAwaitsConfirmation]: (
      <BLoanNeedsConfirmation loanRequest={loanRequest} />
    ),
    [UIState.BOngoingLoan]: <BOngoingLoan loan={loanRequest} />,
    [UIState.LDashboard]: <LenderDashboard user={user} />,
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
      <Center margin="40px">
        <Contactus />
      </Center>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as Session
  const state = await getUIState(session)
  return { props: { state, session } }
}

export default Page
