import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import AddFundsForm from "./fund"
import { Profile } from "pages/profile"
import { User } from "../../lib/types"
import LenderDashboard from "./LenderDashboard"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { useRouter } from "next/router"

interface Props {
  user: User
  initPanelIdx?: number
}

const LenderHome = ({ user, initPanelIdx }: Props) => {
  const router = useRouter()
  const { route } = router.query

  const tabs = [
    new TabComponent(
      "Dashboard",
      (
        <Box>
          {user.pledge_requests.map((pr, idx) => (
            <NewPledgeRequest key={idx + `_nlr`} pledgeRequest={pr} />
          ))}
          <LenderDashboard user={user} />
        </Box>
      )
    ),
    new TabComponent(
      "Invest",
      (
        <Box maxW="lg">
          <AddFundsForm user={user} />
        </Box>
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
