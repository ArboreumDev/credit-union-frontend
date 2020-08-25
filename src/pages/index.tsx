import { getSession } from "next-auth/client"
import AppBar from "../components/AppBar"
import { UserType, Session } from "../utils/types"
import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { getSessionAsProps } from "../utils/ssr"
import Onboarding from "./onboarding"
import LenderDashboard from "../components/dashboard/lender"
import BorrowerDashboard from "../components/dashboard/borrower"
import Video from "../components/video"
import FrontPage from "./frontpage"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import KYCCompleted from "../components/borrower/Notifications/KYCCompleted"
import { Center } from "@chakra-ui/core"
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
}

const getUIState = (session: Session) => {
  if (!session) return UIState.Landing

  return UIState.BLoanDashboard
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
  return { state: getUIState(await getSessionAsProps(context)) }
}

export default Page
