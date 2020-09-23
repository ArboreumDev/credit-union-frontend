import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import AddFundsForm from "./fund"
import { Profile } from "pages/profile"
import { User } from "../../lib/types"
import LenderDashboard from "./LenderDashboard"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"

interface Props {
  user: User
  initPanelIdx?: number
}

const LenderHome = ({ user, initPanelIdx }: Props) => (
  <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
    <Tabs index={initPanelIdx}>
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Invest</Tab>
        <Tab>Account</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box maxW="100%">
            {user.pledge_requests.map((pr, idx) => (
              <NewPledgeRequest key={idx + `_nlr`} pledgeRequest={pr} />
            ))}
            <LenderDashboard user={user} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box maxW="lg">
            <AddFundsForm user={user} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box maxW="lg">
            <Profile user={user} />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <style jsx>
      {`
        .no-focus-outline button:focus {
          outline: none;
        }
      `}
    </style>
  </Box>
)

export default LenderHome
