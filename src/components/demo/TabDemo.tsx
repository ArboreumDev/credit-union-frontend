import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { AddFundsForm } from "components/lender/fund"
import { UserType } from "lib/types"
import { DemoTabView } from "./DemoViewTabs"
import { getDashboardComponent } from "../../pages/dashboard"
import LoginPage from "../../pages/login"
import { Profile } from "../../pages/profile"
import { Fixtures } from "../../lib/demo/fixtures"
import LandingPage from "../common/landing"
import Onboarding from "../common/onboarding/onboarding"
import {
  bJourneySequence,
  lJourneySequence,
} from "pages/demo/[userType]/[jstep]"

const TabDemo = () => (
  <Tabs>
    <TabList className="demo-tablist">
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
export default TabDemo
