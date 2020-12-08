import { Container } from "@chakra-ui/react"
import CreateLoanForm from "components/borrower/CreateLoan/CreateLoanForm"
import BActiveLoan from "components/borrower/LoanRequests/ActiveLoan"
import BLoanNeedsConfirmation from "components/borrower/LoanRequests/LoanNeedsConfirmation"
import BLoanRequestInitiated from "components/borrower/LoanRequests/LoanRequestInitiated"
import ApplicationSubmitted from "components/borrower/Notifications/ApplicationSubmitted"
import { LoanRequest, LoanRequestStatus, User } from "../../lib/types"
import UpcomingRepayment from "./Notifications/UpcomingRepayment"

export default class BorrowerModel {
  constructor(public user: User) {}

  static generateLoanComponent = (loanRequest: LoanRequest) => {
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
          {BorrowerModel.generateLoanComponent(this.ongoingLoan)}
        </Container>
      )
  }
  get notification() {
    if (!this.user.kyc_approved) return <ApplicationSubmitted />
    if (this.hasActiveLoan) return <UpcomingRepayment />
  }
}
