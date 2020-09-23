import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"

export class TabComponent {
  constructor(public title: string, public component: any) {}
}

interface Props {
  tabs: TabComponent[]
  initPanelIdx?: number
}

const TabHome = ({ tabs, initPanelIdx }: Props) => (
  <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
    <Tabs index={initPanelIdx}>
      <TabList>
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

export default TabHome
