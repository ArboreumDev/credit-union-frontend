import { DemoView } from "../../components/demo/DemoView"
import { Fixtures } from "../../utils/demo/fixtures"
import { UIState } from "../../utils/UIStateHelpers"
import { getUIStateComponentMap } from ".."
import LenderDashboard from "../../components/lender/LenderDashboard"
const journeySequence = {
  [UIState.Landing]: "Landing",
  [UIState.Login]: "SignIn",
  [UIState.Onboarding]: "Onboarding",
  [UIState.KYCNotApprovedYet]: "Await KYC approval",
  [UIState.LDashboard]: "Lender Dashboard",
  LDashboardWithNotification: "Lender Dashboard With Notification",
  [UIState.Profile]: "Profile",
}

const componentMap = {
  ...getUIStateComponentMap(Fixtures.Lender),
  LDashboardWithNotification: (
    <LenderDashboard user={Fixtures.UserWithLenderLoanRequest} />
  ),
}

export default () => (
  <DemoView
    demoTitle="Lender Journey"
    user={Fixtures.Lender}
    journeySequence={journeySequence}
    componentMap={componentMap}
  />
)
