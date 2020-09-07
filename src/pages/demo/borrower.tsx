import { DemoView } from "../../components/demo/DemoView"
import { Fixtures } from "../../utils/demo/fixtures"
import { UIState } from "../../utils/UIStateHelpers"

const journeySequence = {
  [UIState.Landing]: "Landing",
  [UIState.Login]: "SignIn",
  [UIState.Onboarding]: "Onboarding",
  [UIState.KYCNotApprovedYet]: "Await KYC approval",
  [UIState.BReadyToMakeNewLoan]: "Make new loan",
  [UIState.BLoanRequestInitiated]: "Loan Initiated",
  [UIState.BLoanRequestAwaitsConfirmation]: "Loan needs borrower confirmation",
  [UIState.BOngoingLoan]: "Ongoing Loan",
  [UIState.Profile]: "Profile",
}

export default () => (
  <DemoView
    demoTitle="Borrower Journey"
    user={Fixtures.Borrower}
    journeySequence={journeySequence}
    initPage={1}
  />
)
