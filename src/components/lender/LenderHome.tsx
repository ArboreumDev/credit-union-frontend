import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import AddFundsForm from "./fund"
import { Profile } from "pages/profile"
import { User } from "../../lib/types"
import LenderDashboard from "./LenderDashboard"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"

interface Props {
  user: User
}

const LenderHome = ({ user }: Props) => (
  <Box margin="20px">
    <Tabs>
      <TabList>
        <Tab className="no-focus-outline">Dashboard</Tab>
        <Tab className="no-focus-outline">Invest</Tab>
        <Tab className="no-focus-outline">Account</Tab>
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
