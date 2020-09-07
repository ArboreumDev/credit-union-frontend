import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { useState } from "react"
import { getUIStateComponentMap } from "../../pages/index"
import { Fixtures } from "../../utils/demo/fixtures"

interface Props {
  demoTitle: string
  user: typeof Fixtures.Borrower
  journeySequence: any
  componentMap?: any
  initPage?: number
}
export const DemoTabView = ({
  demoTitle,
  user,
  journeySequence,
  componentMap,
  initPage = 0,
}: Props) => {
  componentMap = componentMap || getUIStateComponentMap(user)
  const [stateIdx, setStateIdx] = useState(initPage)
  const [state, componentTitle] = Object.entries(journeySequence)[stateIdx]
  const component = componentMap[state]

  return (
    <Tabs margin="0px" defaultIndex={initPage}>
      <TabList>
        {Object.entries(journeySequence).map(([k, v], idx) => (
          <Tab key={"t" + idx}>{idx}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {Object.entries(journeySequence).map(([k, v], idx) => (
          <TabPanel key={"tp" + idx} padding="0px">
            {componentMap[k]}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
