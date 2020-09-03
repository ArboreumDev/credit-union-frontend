import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Box,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
} from "@chakra-ui/core"
import { getUIStateComponentMap } from "../../index"
import { UIState } from "../../../utils/UIStateHelpers"
import { useState } from "react"
import LenderDashboard from "../../../components/lender/LenderDashboard"
import { Fixtures } from "./fixtures"

const Page = () => {
  const journeySequence = {
    [UIState.Landing]: "Landing",
    [UIState.Onboarding]: "Onboarding",
    [UIState.KYCNotApprovedYet]: "Await KYC approval",
    [UIState.LDashboard]: "Lender Dashboard",
    LDashboardWithNotification: "Lender Dashboard With Notification",
    [UIState.Profile]: "Profile",
  }
  const componentMap = {
    ...getUIStateComponentMap(Fixtures.Lender),
    LDashboardWithNotification: (
      <LenderDashboard
        user={{
          ...Fixtures.Lender,
          loan_requests: Fixtures.LenderLoanRequests, // fix the key here after fixing the query
        }}
      />
    ),
  }

  const [stateIdx, setStateIdx] = useState(0)
  const [state, title] = Object.entries(journeySequence)[stateIdx]
  const component = componentMap[state]

  return (
    <Box>
      <Center>
        {stateIdx > 0 && (
          <Button onClick={() => setStateIdx(stateIdx - 1)}>&lt; </Button>
        )}
        <Box w="200px" marginBottom="20px">
          <Slider
            onChange={(v) => setStateIdx(v)}
            max={Object.keys(journeySequence).length - 1}
            step={1}
            value={stateIdx}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        {stateIdx < Object.keys(journeySequence).length - 1 && (
          <Button onClick={() => setStateIdx(stateIdx + 1)}>&gt; </Button>
        )}
      </Center>
      <Center>
        <Heading as="h1" size="md">
          Lender Journey | {stateIdx + 1}
        </Heading>
      </Center>
      <Center marginBottom="20px">{title}</Center>
      <Divider marginBottom="20px"></Divider>
      {component}
    </Box>
  )
}

export default Page
