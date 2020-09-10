import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { DemoTabView } from "../../components/demo/DemoViewTabs"
import { getDashboardComponent } from "../../pages/dashboard"
import LoginPage from "../../pages/login"
import { Profile } from "../../pages/profile"
import { Fixtures } from "../../utils/demo/fixtures"
import { UIState } from "../../utils/UIStateHelpers"
import LandingPage from "../common/landing"
import Onboarding from "../common/onboarding/onboarding"
import { AddFundsForm } from "pages/dashboard/fund"

export class JStep {
  constructor(public title: string, private component: any) {}
}

const bJourneySequence = [
  new JStep("Landing", <LandingPage />),
  new JStep("SignIn", <LoginPage />),
  new JStep("Onboarding", <Onboarding user={Fixtures.Borrower} />),
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

const lJourneySequence = [
  new JStep("Landing", <LandingPage />),
  new JStep("SignIn", <LoginPage />),
  new JStep("Onboarding", getDashboardComponent(Fixtures.Lender)),
  new JStep("Lender Dashboard", getDashboardComponent(Fixtures.Lender)),
  new JStep("Add funds", <AddFundsForm user={Fixtures.Lender} />),
  new JStep(
    "Lender Dashboard with Notification",
    getDashboardComponent(Fixtures.LenderWithPledgeRequest)
  ),
  new JStep("Profile", <Profile user={Fixtures.Lender} />),
]

const MainDemo = ({ tabView = false }: { tabView?: boolean }) => (
  <Tabs>
    <TabList>
      <Tab>Borrower</Tab>
      <Tab>Lender</Tab>
    </TabList>

    <TabPanels>
      <TabPanel padding="0">
        <DemoTabView journeySequence={bJourneySequence} />
      </TabPanel>
      <TabPanel padding="0">
        <DemoTabView journeySequence={lJourneySequence} />
      </TabPanel>
    </TabPanels>
  </Tabs>
)
export default MainDemo
