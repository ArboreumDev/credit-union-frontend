import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import {
  bJourneySequence,
  lJourneySequence,
} from "pages/demo/[userType]/[jstep]"
import { DemoTabView } from "./DemoViewTabs"

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
