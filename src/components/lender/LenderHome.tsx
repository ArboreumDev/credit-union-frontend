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
import WithdrawFundsForm from "components/lender/Withdraw"

interface Props {
  user: User
  options: InvestmentOptions
  initPanelIdx?: number
}

export const lenderTabMap = {
  invest: 1,
  account: 2,
}

const LenderHome = ({ user, initPanelIdx, options }: Props) => {
  const tabs = [
    new TabComponent(
      "Dashboard",
      (
        <Box>
          <LenderDashboard user={user} />
        </Box>
      )
    ),
    new TabComponent(
      // TODO so much boilerplate -> refactor this into a component
      "Funds",
      (
        <Accordion allowToggle defaultIndex={2}>
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
              <AddFundsForm user={user} />{" "}
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
              <WithdrawFundsForm user={user} />{" "}
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
              <InvestmentOverview user={user} options={options} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )
    ),
    new TabComponent(
      "Account",
      (
        <Box maxW="lg">
          <Profile user={user} />
        </Box>
      )
    ),
  ]

  return <TabHome tabs={tabs} initPanelIdx={initPanelIdx} />
}

export default LenderHome
