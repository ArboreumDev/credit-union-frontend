import { DemoView } from "../../components/demo/DemoView"
import { Fixtures } from "../../utils/demo/fixtures"
import { UIState } from "../../utils/UIStateHelpers"
const journeySequence = {
  [UIState.Landing]: "Landing",
  [UIState.Onboarding]: "Onboarding",
  [UIState.KYCNotApprovedYet]: "Await KYC approval",
  [UIState.LDashboard]: "Lender Dashboard",
  LDashboardWithNotification: "Lender Dashboard With Notification",
  [UIState.Profile]: "Profile",
}

export default () => (
  <DemoView
    demoTitle="Lender Journey"
    user={Fixtures.Borrower}
    journeySequence={journeySequence}
  />
)
