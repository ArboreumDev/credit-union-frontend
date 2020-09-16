import { JStep } from "components/demo/Main"
import { UserType } from "lib/types"
import { useRouter } from "next/router"
import { AddFundsForm } from "pages/dashboard/fund"
import { Fixtures } from "lib/demo/fixtures"
import { getDashboardComponent } from "pages/dashboard"
import LoginPage from "pages/login"
import { Profile } from "pages/profile"
import LandingPage from "components/common/landing"
import Onboarding from "components/common/onboarding/onboarding"

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
  new JStep("Profile", <Profile user={Fixtures.Borrower} />),
]

export const lJourneySequence = [
  new JStep("Landing", <LandingPage />),
  new JStep("SignIn", <LoginPage />),
  new JStep(
    "Onboarding",
    <Onboarding user={Fixtures.Lender} userType={UserType.Lender} />
  ),
  new JStep("Lender Dashboard", getDashboardComponent(Fixtures.Lender)),
  new JStep("Add funds", <AddFundsForm user={Fixtures.Lender} />),
  new JStep(
    "Lender Dashboard with Notification",
    getDashboardComponent(Fixtures.LenderWithPledgeRequest)
  ),
  new JStep("Profile", <Profile user={Fixtures.Lender} />),
]

const Demo = () => {
  const router = useRouter()
  const { userType, jstep } = router.query
  if (userType == UserType.Borrower)
    return bJourneySequence[parseInt(jstep as string)].component
  if (userType == UserType.Lender)
    return lJourneySequence[parseInt(jstep as string)].component
  return (
    <div onKeyPress={(e) => console.log(e.keyCode)}>
      {userType} {jstep}
    </div>
  )
}
export default Demo
