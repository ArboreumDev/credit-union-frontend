import { useEventListener } from "@chakra-ui/core"
import LandingPage from "components/common/landing"
import Onboarding from "components/common/onboarding/onboarding"
import { Fixtures } from "lib/demo/fixtures"
import { UserType } from "lib/types"
import { useRouter } from "next/router"
import { getDashboardComponent } from "pages/dashboard"
import { AddFundsForm } from "components/lender/fund"
import LoginPage from "pages/login"
import { Profile } from "pages/profile"
import AppBar from "components/common/nav/AppBar"
import LenderHome from "components/lender/LenderHome"

export class JStep {
  constructor(public title: string, public component: any) {}
}

export const bJourneySequence = [
  new JStep("Landing", <LandingPage />),
  new JStep("SignIn", <LoginPage />),
  new JStep(
    "Onboarding",
    <Onboarding user={Fixtures.Borrower} userType={UserType.Borrower} />
  ),
  new JStep("KYC needs approval", getDashboardComponent(Fixtures.Borrower)),
  new JStep(
    "KYC Confirmed",
    getDashboardComponent(Fixtures.BorrowerKYCConfirmed)
  ),
  new JStep(
    "Loan request initiated",
    getDashboardComponent(Fixtures.BorrowerLoanInitiated)
  ),
  new JStep(
    "Loan request needs approval",
    getDashboardComponent(Fixtures.BorrowerLoanNeedsConfirmation)
  ),
  new JStep("Loan is live", getDashboardComponent(Fixtures.BorrowerLoanLive)),
  new JStep("Profile", getDashboardComponent(Fixtures.BorrowerLoanLive, 2)),
]

export const lJourneySequence = [
  new JStep("Landing", <LandingPage />),
  new JStep("SignIn", <LoginPage />),
  new JStep(
    "Onboarding",
    <Onboarding user={Fixtures.Lender} userType={UserType.Lender} />
  ),
  new JStep("Add funds", getDashboardComponent(Fixtures.Lender, 1)),
  new JStep("Lender Dashboard", getDashboardComponent(Fixtures.Lender)),
  new JStep(
    "Lender Dashboard with Notification",
    getDashboardComponent(Fixtures.LenderWithPledgeRequest)
  ),
  new JStep("Profile", getDashboardComponent(Fixtures.Lender, 2)),
]

const getStepMax = (userType: UserType) => {
  if (userType === UserType.Borrower) return bJourneySequence.length
  if (userType === UserType.Lender) return lJourneySequence.length
}

const Demo = () => {
  const router = useRouter()
  const { userType, jstep } = router.query
  console.log(userType, jstep)
  const jstepInt = parseInt(jstep as string)

  function redirectJStep(isPrev?: boolean, toggleUserType?: boolean) {
    let nUserType = userType
    if (toggleUserType)
      nUserType =
        userType === UserType.Borrower ? UserType.Lender : UserType.Borrower

    const nstep = isPrev ? jstepInt - 1 : jstepInt + 1
    if (nstep >= 0 && nstep < getStepMax(userType as UserType)) {
      const href = `/demo/${nUserType}/${nstep}`
      router.push(href, href)
    }
  }
  // function handler({ key }) {
  //   console.log(key)
  //   if (key == "n") redirectJStep()
  //   if (key == "p") redirectJStep(true)
  // }
  function mouseHandler({ clientX, clientY }) {
    console.log(clientX, clientY)
    if (clientX === 0 || clientY === 0) return

    const mid = window.innerWidth / 2
    const toggleUserType = clientY < 120 ? true : false
    if (clientX > mid) redirectJStep(false, toggleUserType)
    if (clientX < mid) redirectJStep(true, toggleUserType)
  }

  // useEventListener("keydown", handler)
  useEventListener("click", mouseHandler)

  return (
    <div>
      {userType === UserType.Borrower && bJourneySequence[jstepInt].component}
      {userType === UserType.Lender && lJourneySequence[jstepInt].component}
    </div>
  )
}
export default Demo
