import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { useToast } from "@chakra-ui/core"
import { JStep } from "./Main"
import AppBar from "../common/AppBar"

interface Props {
  journeySequence: JStep[]
  initPage?: number
}
export const DemoTabView = ({ journeySequence, initPage = 0 }: Props) => {
  const toast = useToast()

  return (
    <Tabs
      margin="0px"
      defaultIndex={initPage}
      onChange={(idx) =>
        toast({
          title: (idx + ". " + journeySequence[idx].title) as string,
          duration: 2000,
          isClosable: true,
        })
      }
    >
      <TabList>
        {journeySequence.map((jstep, idx) => (
          <Tab key={"t" + idx}>{idx}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {journeySequence.map((jstep, idx) => (
          <TabPanel key={"tp" + idx} padding="0px">
            {jstep.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
