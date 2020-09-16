import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/core"
import { JStep } from "pages/demo/[userType]/[jstep]"

interface Props {
  journeySequence: JStep[]
  initPage?: number
}
export const DemoTabView = ({ journeySequence, initPage = 0 }: Props) => {
  const toast = useToast()

  return (
    <Tabs
      id="journeyStepsTabs"
      margin="0px"
      defaultIndex={initPage}
      // onChange={(idx) =>
      // toast({
      //   title: (idx + ". " + journeySequence[idx].title) as string,
      //   duration: 2000,
      //   isClosable: true,
      // })
      // }
    >
      <TabList className="demo-tablist">
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
