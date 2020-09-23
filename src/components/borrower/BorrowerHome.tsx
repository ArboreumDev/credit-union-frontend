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

  return (
    <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
      <Tabs index={initPanelIdx}>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Account</Tab>
          {user.loan_requests.length > 0 && <Tab>Repayments</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            {!user.kyc_approved && <ApplicationSubmitted />}
            {!user.kyc_approved && <UpcomingRepayment />}

            <Box maxW="lg">
              {loanRequests.length === 0 && getRequestLoanComponent(user)}
              {loanRequests.length > 0 && getLoanRequest(loanRequests[0])}
            </Box>
          </TabPanel>
          <TabPanel>
            <Profile user={user} />
          </TabPanel>
          {user.loan_requests.length && (
            <TabPanel>
              <RepaymentsForm user={user} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default BorrowerHome
