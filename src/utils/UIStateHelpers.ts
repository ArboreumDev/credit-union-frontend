import { Session, User, UserType, LoanRequestStatus } from "./types"

export enum UIState {
  Landing = "Landing",
  Onboarding = "Onboarding",
  KYCNotApprovedYet = "KYCNotApprovedYet",
  BReadyToMakeNewLoan = "BReadyToMakeNewLoan",
  BLoanRequestInitiated = "BLoanRequestInitiated",
  BLoanRequestAwaitsConfirmation = "BLoanRequestAwaitsConfirmation",
  BOngoingLoan = "BLoanDashboard",
  LDashboard = "LDashboard",
  Profile = "Profile",
}

export const getMostRecentLoanRequest = (user: User) =>
  user.loan_requests.sort(
    (l1, l2) => Date.parse(l2.created_at) - Date.parse(l1.created_at)
  )[0]

export const getUIState = async (session: Session) => {
  if (!session) return UIState.Landing

  const user = session.user

  console.log("in index", user)

  if (!user.user_type) return UIState.Onboarding
  if (!user.kyc_approved) return UIState.KYCNotApprovedYet
  if (user.kyc_approved) {
    if (user.user_type === UserType.Borrower) {
      if (user.loan_requests.length == 0) return UIState.BReadyToMakeNewLoan
      if (user.loan_requests[0].status === LoanRequestStatus.initiated)
        return UIState.BLoanRequestInitiated
      else return UIState.BOngoingLoan
    }
    if (user.user_type === UserType.Lender) {
      return UIState.LDashboard
    }
  }

  return UIState.Landing
}
