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
import { User } from "../../lib/types"
import AddFundsForm from "./Fund"
import LenderDashboard from "./LenderDashboard"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"
import WithdrawFundsForm from "components/lender/Withdraw"

interface Props {
  user: User
  initPanelIdx?: number
}

export const lenderTabMap = {
  invest: 1,
  account: 2,
}

const LenderHome = ({ user, initPanelIdx }: Props) => {
  const tabs = [
    new TabComponent(
      "Dashboard",
      (
        <Box>
          {user.pledge_requests.map((pr, idx) => (
            <NewPledgeRequest
              key={idx + `_nlr`}
              pledgeRequest={pr}
              availableFunds={user.balance}
            />
          ))}
          <LenderDashboard user={user} />
        </Box>
      )
    ),
    new TabComponent(
      // TODO so much boilerplate
      "Funds",
      (
        <Accordion allowToggle>
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
