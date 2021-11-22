import { Box } from "@chakra-ui/core"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { Profile } from "pages/profile"
import { User } from "lib/types"
import BorrowerModel from "./BorrowerModel"
// import RepaymentsForm from "./repayments"
import RepaymentsForm from "./RepaymentsForm"

interface Props {
  user: User
  initPanelIdx?: number
}

const BorrowerHome = ({ user, initPanelIdx }: Props) => {
  console.log('borrower user', user)
  const borrower = new BorrowerModel(user)
  console.log("model is", borrower.mainComponent)
  const tabs = [
    // NOTE: comment this out for most basic experience
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
    tabs.push(new TabComponent("Repay", <RepaymentsForm loan={borrower.ongoingLoan} />))

  return <TabHome tabs={tabs} initPanelIdx={initPanelIdx} />
}

export default BorrowerHome
