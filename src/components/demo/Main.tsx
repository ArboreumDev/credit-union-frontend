import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { DemoTabView } from "../../components/demo/DemoViewTabs"
import Dashboard, { getDashboardComponent } from "../../pages/dashboard"
import LoginPage from "../../pages/login"
import ProfilePage from "../../pages/profile"
import { Fixtures } from "../../utils/demo/fixtures"
import { UIState } from "../../utils/UIStateHelpers"
import LandingPage from "../common/landing"
import Onboarding from "../common/onboarding/onboarding"

export class JStep {
  constructor(
    public state: UIState,
    public title: string,
    public fixture: any,
    private _component?: any
  ) {}

  get component() {
    if (this.state === UIState.Onboarding)
      return <Onboarding user={this.fixture} />
    if (this.state === UIState.Profile)
      return <ProfilePage user={this.fixture} />
    if (this.state === UIState.Dashboard)
      return getDashboardComponent(this.fixture)
  }
}

class BJStep extends JStep {
  constructor(state: UIState, title: string, component?: any) {
    super(state, title, Fixtures.Borrower, component)
  }
}

class LJStep extends JStep {
  constructor(state: UIState, title: string, component?: any) {
    super(state, title, Fixtures.Lender, component)
  }
}

const bJourneySequence = [
  new BJStep(UIState.Landing, "Landing", <LandingPage />),
  new BJStep(UIState.Login, "SignIn", <LoginPage />),
  new BJStep(UIState.Onboarding, "Onboarding"),
  new BJStep(UIState.Dashboard, "KYC needs approval"),
  new JStep(UIState.Dashboard, "KYC Confirmed", Fixtures.BorrowerKYCConfirmed),
  new JStep(
    UIState.Dashboard,
    "Loan request initiated",
    Fixtures.BorrowerLoanInitiated
  ),
  new JStep(
    UIState.Dashboard,
    "Loan request needs approval",
    Fixtures.BorrowerLoanNeedsConfirmation
  ),
  new JStep(UIState.Dashboard, "Loan is live", Fixtures.BorrowerLoanLive),
  new BJStep(UIState.Profile, "Profile"),
]

const lJourneySequence = [
  new LJStep(UIState.Landing, "Landing", <LandingPage />),
  new LJStep(UIState.Login, "SignIn", <LoginPage />),
  new LJStep(UIState.Onboarding, "Onboarding"),
  new LJStep(UIState.Dashboard, "Lender Dashboard"),
  new JStep(
    UIState.Dashboard,
    "Lender Dashboard with Notification",
    Fixtures.LenderWithPledgeRequest
  ),
  new LJStep(UIState.Profile, "Profile"),
]

const MainDemo = ({ tabView = false }: { tabView?: boolean }) => (
  <Tabs>
    <TabList>
      <Tab>Borrower</Tab>
      <Tab>Lender</Tab>
    </TabList>

    <TabPanels>
      <TabPanel padding="0">
        <DemoTabView
          demoTitle="Borrower Journey"
          journeySequence={bJourneySequence}
        />
      </TabPanel>
      <TabPanel padding="0">
        <DemoTabView
          demoTitle="Lender Journey"
          journeySequence={lJourneySequence}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
)
export default MainDemo
