import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { useState } from "react"
import { getUIStateComponentMap } from "../../pages/index"
import { Fixtures } from "../../utils/demo/fixtures"
import { useToast } from "@chakra-ui/core"

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
  const toast = useToast()
  componentMap = componentMap || getUIStateComponentMap(user)
  const tabEntries = Object.entries(journeySequence)

  return (
    <Tabs
      margin="0px"
      defaultIndex={initPage}
      onChange={(idx) =>
        toast({
          title: tabEntries[idx][1] as string,
          duration: 2000,
          isClosable: true,
        })
      }
    >
      <TabList>
        {tabEntries.map(([k, v], idx) => (
          <Tab key={"t" + idx}>{idx}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabEntries.map(([k, v], idx) => (
          <TabPanel key={"tp" + idx} padding="0px">
            {componentMap[k]}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
