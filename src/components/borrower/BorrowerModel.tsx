import { Box, Container, Heading } from "@chakra-ui/core"
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
  get settledLoans() {
    return this.loans.filter((l) => l.status === LoanRequestStatus.settled)
  }
  get mainComponent() {
    return (
      <Container maxW="sm">
        {!this.hasActiveLoan && <CreateLoanForm user={this.user} />}
        {this.hasActiveLoan &&
          BorrowerModel.generateLoanComponent(this.ongoingLoan)}
        {this.settledLoans && (
          <>
            <Heading size="md">Settled Loans</Heading>
            {this.settledLoans.map((l) => (
              <>
                {l.purpose} | {l.amount} | Supported by:{" "}
                {l.supporters.map((s) => s.user.name).join(", ")}
              </>
            ))}
          </>
        )}
      </Container>
    )
  }
  get notification() {
    if (!(this.user.kyc_approved || this.hasLoanReq))
      return <ApplicationSubmitted />
    if (this.hasActiveLoan) return <UpcomingRepayment />
  }
}
