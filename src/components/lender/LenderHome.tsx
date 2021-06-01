import { Box, Text, Divider } from "@chakra-ui/core"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { Profile } from "pages/profile"
import { User, InvestmentOptions } from "../../lib/types"
import AddFundsForm from "./Fund"
import LenderDashboard from "./LenderDashboard"
import InvestmentOverview from "./InvestmentOverview"

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
      user.balance <= 0 ? <Text fontWeight="bold">Invest</Text> : "Invest",
      (
        <Box maxW="lg">
          <AddFundsForm user={user} />
          <Divider />
          <InvestmentOverview user={user} options={options} />
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
