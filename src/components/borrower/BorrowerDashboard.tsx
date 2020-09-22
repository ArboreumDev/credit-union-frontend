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
import { AddFundsForm } from "components/lender/fund"
import { Profile } from "pages/profile"
import BActiveLoan from "components/borrower/BOngoingLoan"
import CreateLoanForm from "components/borrower/CreateLoan/CreateLoanForm"
import BLoanNeedsConfirmation from "components/borrower/LoanRequests/BLoanNeedsConfirmation"
import BLoanRequestInitiated from "components/borrower/LoanRequests/BLoanRequestInitiated"
import ApplicationSubmitted from "components/borrower/Notifications/ApplicationSubmitted"
import { LoanRequest, LoanRequestStatus, User } from "../../lib/types"

interface Props {
  user: User
}

const getRequestLoanComponent = (user: User) => {
  return (
    <Box>
      <Center>
        <Heading as="h1" size="lg">
          Request Loan
        </Heading>
      </Center>
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

const BorrowerDashboard = ({ user }: Props) => {
  const loanRequests = user.loan_requests

  return (
    <Box margin="20px">
      <Tabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Repayments</Tab>
          <Tab>Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {!user.kyc_approved && <ApplicationSubmitted />}
            {loanRequests.length === 0 && getRequestLoanComponent(user)}
            {loanRequests.length > 0 && getLoanRequest(loanRequests[0])}
          </TabPanel>
          <TabPanel>
            <AddFundsForm user={user} />
          </TabPanel>
          <TabPanel>
            <Profile user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default BorrowerDashboard
