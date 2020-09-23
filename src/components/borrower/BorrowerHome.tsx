import {
  Box,
  Center,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core"
import BActiveLoan from "components/borrower/BOngoingLoan"
import CreateLoanForm from "components/borrower/CreateLoan/CreateLoanForm"
import BLoanNeedsConfirmation from "components/borrower/LoanRequests/BLoanNeedsConfirmation"
import BLoanRequestInitiated from "components/borrower/LoanRequests/BLoanRequestInitiated"
import ApplicationSubmitted from "components/borrower/Notifications/ApplicationSubmitted"
import TabHome, { TabComponent } from "components/common/home/tabs"
import { Profile } from "pages/profile"
import { LoanRequest, LoanRequestStatus, User } from "../../lib/types"
import UpcomingRepayment from "./Notifications/UpcomingRepayment"
import RepaymentsForm from "./repayments"

interface Props {
  user: User
  initPanelIdx?: number
}

const getRequestLoanComponent = (user: User) => {
  return (
    <Box>
      <Heading as="h1" size="lg">
        Request a loan
      </Heading>

      <Box h="30px" />
      <CreateLoanForm user={user} />
    </Box>
  )
}

const getLoanRequest = (loanRequest: LoanRequest) => {
  return {
    [LoanRequestStatus.initiated]: (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [LoanRequestStatus.awaiting_borrower_confirmation]: (
      <BLoanNeedsConfirmation loanRequest={loanRequest} />
    ),
    [LoanRequestStatus.live]: <BActiveLoan loanRequest={loanRequest} />,
  }[loanRequest.status]
}

const BorrowerHome = ({ user, initPanelIdx }: Props) => {
  const loanRequests = user.loan_requests
  const tabs = [
    new TabComponent(
      "Dashboard",
      (
        <>
          {!user.kyc_approved && <ApplicationSubmitted />}
          {!user.kyc_approved && <UpcomingRepayment />}

          {loanRequests.length === 0 && getRequestLoanComponent(user)}
          {loanRequests.length > 0 && getLoanRequest(loanRequests[0])}
        </>
      )
    ),
    new TabComponent("Account", <Profile user={user} />),
  ]

  if (user.loan_requests.length)
    tabs.push(new TabComponent("Repay", <RepaymentsForm user={user} />))

  return <TabHome tabs={tabs} initPanelIdx={initPanelIdx} />
}

export default BorrowerHome
