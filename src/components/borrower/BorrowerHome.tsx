import {
  Box,
  Center,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core"
import BActiveLoan from "components/borrower/LoanRequests/ActiveLoan"
import CreateLoanForm from "components/borrower/CreateLoan/CreateLoanForm"
import BLoanNeedsConfirmation from "components/borrower/LoanRequests/LoanNeedsConfirmation"
import BLoanRequestInitiated from "components/borrower/LoanRequests/LoanRequestInitiated"
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

class Borrower {
  constructor(public user: User) {}

  static generateLoanComponent = (loanRequest: LoanRequest) => {
    console.log(loanRequest)
    return {
      [LoanRequestStatus.initiated]: (
        <BLoanRequestInitiated loanRequest={loanRequest} />
      ),
      [LoanRequestStatus.awaiting_borrower_confirmation]: (
        <BLoanNeedsConfirmation loanRequest={loanRequest} />
      ),
      [LoanRequestStatus.active]: <BActiveLoan loanRequest={loanRequest} />,
    }[loanRequest.status]
  }

  get loans() {
    return this.user.loan_requests
  }
  get hasLoanReq() {
    return this.loans && this.loans.length > 0
  }
  get ongoingLoan() {
    return this.hasLoanReq && this.loans[0]
  }
  get loanStatus() {
    return this.hasLoanReq && this.ongoingLoan.status
  }
  get hasActiveLoan() {
    return (
      this.hasLoanReq && this.ongoingLoan.status === LoanRequestStatus.active
    )
  }
  get mainComponent() {
    if (!this.hasLoanReq) return <CreateLoanForm user={this.user} />
    else
      return (
        <Container maxW="sm">
          {Borrower.generateLoanComponent(this.ongoingLoan)}
        </Container>
      )
  }
  get notification() {
    if (!this.user.kyc_approved) return <ApplicationSubmitted />
    if (this.hasActiveLoan) return <UpcomingRepayment />
  }
}

const BorrowerHome = ({ user, initPanelIdx }: Props) => {
  const borrower = new Borrower(user)
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
