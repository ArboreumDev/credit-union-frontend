import { Box, Text } from "@chakra-ui/core"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { useRouter } from "next/router"
import { Profile } from "pages/profile"
import { User } from "../../lib/types"
import AddFundsForm from "./fund"
import LenderDashboard from "./LenderDashboard"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"

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
      user.balance <= 0 ? (
        <Text as="mark" fontWeight="bold">
          Invest
        </Text>
      ) : (
        "Invest"
      ),
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
