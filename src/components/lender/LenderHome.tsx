import {
  Stack,
  Box,
  Text,
  Divider,
  Heading,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/core"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { Profile } from "pages/profile"
import { User, InvestmentOptions } from "../../lib/types"
import AddFundsForm from "./Fund"
import LenderDashboard from "./LenderDashboard"
import InvestmentOverview from "./InvestmentOverview"
import { useState } from "react"
import WithdrawFundsForm from "components/lender/Withdraw"
import useUser from "lib/useUser"

interface Props {
  // user: User
  // options: InvestmentOptions
  initPanelIdx?: number
  // setPanelIndex: any
}

const LenderHome = ({}: Props) => {
  const [accordionIndex, setAccordionIndex] = useState([0])
  const { user, options } = useUser()

  const tabs = [
    new TabComponent(
      "Dashboard",
      (
        <Box>
          {/* <div>LenderDashboard</div> */}
          <LenderDashboard />
        </Box>
      )
    ),
    new TabComponent(
      // TODO so much boilerplate -> refactor this into a component
      "Funding",
      (
        <Accordion allowToggle allowMultiple >
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {" "}
                <Heading size="sm">Deposit</Heading>{" "}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {" "}
              <AddFundsForm />{" "}
              {/* <div>Add funds form</div> */}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {" "}
                <Heading size="sm">Withdraw</Heading>{" "}
              </Box>{" "}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {" "}
              <WithdrawFundsForm  />{" "}
              <div>withdraw funds form</div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {" "}
                <Heading size="sm">Invest</Heading>{" "}
              </Box>{" "}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {" "}
              {/* <InvestmentOverview  /> */}
              <div>invest panel</div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )
    ),
    new TabComponent(
      "Account",
      (
        <Box maxW="lg">
          <Profile />
              {/* <div>Profile</div> */}
        </Box>
      )
    ),
  ]

  return <TabHome tabs={tabs} />
}

export default LenderHome
