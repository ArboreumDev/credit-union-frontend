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
  Onboarding,
  KYCNotApprovedYet,
  BReadyToMakeNewLoan,
  BLoanRequestInProgress,
  BLoanDashboard,
}

const Page = (props: { session: Session; state: UIState }) => {
  const router = useRouter()
  const { session, state } = props

  if (!session) return <FrontPage />
  if (state === UIState.Onboarding) return <Onboarding />

  return (
    <div>
      <AppBar {...props} />
      {state == UIState.KYCNotApprovedYet && <ApplicationSubmitted />}
      {state == UIState.BReadyToMakeNewLoan && <BReadyToMakeNewLoan />}
      {state == UIState.BLoanRequestInProgress && <BLoanRequestInProgress />}
      {state == UIState.BLoanDashboard && <BLoanDashboard />}
    </div>
  )
}

Page.getInitialProps = async (context) => {
  const home_ui_state = UIState.BLoanDashboard
  const session = await getSessionAsProps(context)
  return { ...session, state: home_ui_state }
}

export default Page
