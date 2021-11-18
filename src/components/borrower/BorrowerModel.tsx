import { Box, Container, Heading } from "@chakra-ui/core"
import CreateLoanForm from "components/borrower/CreateLoan/CreateLoanForm"
import ApplicationSubmitted from "components/borrower/Notifications/ApplicationSubmitted"
import BActiveLoan from "components/borrower/LoanRequests/ActiveLoan"
import BLoanNeedsConfirmation from "components/borrower/LoanRequests/LoanNeedsConfirmation"
import BLoanRequestInitiated from "components/borrower/LoanRequests/LoanRequestInitiated"
import PendingReview from "pages/pending"
import { LoanRequest, Loan, User } from "../../lib/types"
import UpcomingRepayment from "./Notifications/UpcomingRepayment"
import { Loan_Request_State_Enum, Loan_State_Enum } from "../../gql/sdk"

export default class BorrowerModel {
  constructor(public user: User) {}

  static generateLoanComponent = (loanRequest: LoanRequest, loan: Loan) => {
    return {
      [Loan_Request_State_Enum.Active]: (
        <BLoanRequestInitiated loanRequest={loanRequest} />
      ),
      [Loan_Request_State_Enum.Fulfilled]: <BActiveLoan loanRequest={loanRequest} loan={loan}/>,
      // TODO
      // [Loan_Request_State_Enum.???]: (
      //   <BLoanNeedsConfirmation loanRequest={loanRequest} />
      // ),
      // [Loan_Request_State_Enum.Rejected]: TODO,
      // [Loan_Request_State_Enum.Expired]: TODO,
      // [Loan_Request_State_Enum.Withdrawn]: TODO,
    }[loanRequest.state]
  }

  get loanRequests() {
    return this.user.loan_requests
  }

  get loans() {
    return this.user.loans
  }

  /**
   * whether there is an active loan request (waiting to be fulfilled)
   */
  get hasLoanReq() {
    // TODO check for state === live
    return (
      this.loanRequests &&
      this.loanRequests.filter(
        (l) => l.state === Loan_Request_State_Enum.Active
      ).length > 0
    )
    // return this.loanRequests && this.loanRequests.length > 0
  }
  get activeRequest() {
    return this.loanRequests.filter(
      (l) => l.state === Loan_Request_State_Enum.Active
    )[0]
  }

  get ongoingLoan() {
    const tmp =
      this.hasActiveLoan &&
      this.loans.filter((ln) => Loan_State_Enum.Live === ln.state)[0]
    return tmp
  }

  get loanStatus() {
    return this.hasLoanReq && this.ongoingLoan.state
  }

  get hasActiveLoan() {
    return (
      this.loans.filter((ln) => Loan_State_Enum.Live === ln.state).length > 0
    )
  }

  get settledLoans() {
    return this.loans.filter((l) =>
      [Loan_State_Enum.Default, Loan_State_Enum.Repaid].includes(l.state)
    )
  }
  get mainComponent() {
    if (this.user.onboarded && !this.user.kyc_approved) return <></>
    return (
      <Container maxW="sm">
        {this.settledLoans.length > 0 && (
          <Box mb="50px">
            <Heading size="md">Fulfilled Loans</Heading>
            {this.settledLoans.map((l) => (
              <div key={l.loan_id + "_settled"}>
                {l.loanRequest.purpose} | {l.principal}| {l.state}
              </div>
            ))}
          </Box>
        )}
        {!this.hasLoanReq && !this.ongoingLoan && (
          <CreateLoanForm user={this.user} />
        )}
        {this.hasLoanReq && (
          <BLoanRequestInitiated loanRequest={this.activeRequest} />
        )}
        {this.ongoingLoan && <BActiveLoan loan={this.ongoingLoan} />}
      </Container>
    )
  }
  get notification() {
    if (!(this.user.kyc_approved || this.hasLoanReq))
      return <ApplicationSubmitted />
    if (this.hasActiveLoan) return <UpcomingRepayment />
  }
}
