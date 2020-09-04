import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import BorrowerDemo from "./borrower"
import LenderDemo from "./lender"

export default () => (
  <Tabs>
    <TabList>
      <Tab>Borrower</Tab>
      <Tab>Lender</Tab>
    </TabList>

    <TabPanels>
      <TabPanel padding="0">
        <BorrowerDemo />
      </TabPanel>
      <TabPanel padding="0">
        <LenderDemo />
      </TabPanel>
    </TabPanels>
  </Tabs>
)
