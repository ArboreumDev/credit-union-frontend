import { Box } from "@chakra-ui/react"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { Profile } from "pages/profile"
import { User } from "lib/types"
import BorrowerModel from "./BorrowerModel"
import RepaymentsForm from "./repayments"

interface Props {
  user: User
  initPanelIdx?: number
}

const BorrowerHome = ({ user, initPanelIdx }: Props) => {
  const borrower = new BorrowerModel(user)
  const tabs = [
    new TabComponent(
      "Dashboard",
      (
        <>
          {borrower.notification}
          {borrower.mainComponent}
        </>
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

  if (borrower.hasActiveLoan)
    tabs.push(new TabComponent("Repay", <RepaymentsForm user={user} />))

  return <TabHome tabs={tabs} initPanelIdx={initPanelIdx} />
}

export default BorrowerHome
