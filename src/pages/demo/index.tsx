import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import BorrowerDemo from "./borrower"
import LenderDemo from "./lender"

export default () => (
  <Tabs>
    <TabList>
      <Tab>Borrower</Tab>
      <Tab>Lender</Tab>
    </TabList>

    <TabPanels margin="1px">
      <TabPanel>
        <BorrowerDemo />
      </TabPanel>
      <TabPanel>
        <LenderDemo />
      </TabPanel>
    </TabPanels>
  </Tabs>
)
