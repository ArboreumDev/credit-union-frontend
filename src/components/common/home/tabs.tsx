import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import router from "next/router"
import { useState } from "react"
import {tabMap, inverseTabMap} from "../../lender/LenderHome"

export class TabComponent {
  constructor(public title: any, public component: any) {}
}

interface Props {
  tabs: TabComponent[]
  // initPanelIdx?: number
  // setPanelIndex: any
}

const TabHome = ({ tabs }: Props) => {
  const [tabIndex, setTabIndex] = useState(1)
  return (
    
    <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
      <Tabs onChange={(index) => setTabIndex(index)} index={tabIndex}>
      {/* <Tabs defaultIndex={initPanelIdx}> */}
      {/* <Tabs onChange={(index) => setPanelIndex(index)} index={initPanelIdx}> */}
        <TabList marginBottom={3}>
          {tabs.map((tab, idx) => (
            <Tab key={"t" + idx}>{tab.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab, idx) => (
            <TabPanel key={"tp" + idx} padding={3}>
              {tab.component}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default TabHome
