import { Session, User, UserType, LoanRequestStatus } from "./types"

export enum UIState {
  Landing = "Landing",
  Login = "SignIn",
  Onboarding = "Onboarding",
  KYCNotApprovedYet = "KYCNotApprovedYet",
  KYCConfirmed = "BReadyToMakeNewLoan",
  BLoanRequestInitiated = "BLoanRequestInitiated",
  BLoanRequestAwaitsConfirmation = "BLoanRequestAwaitsConfirmation",
  BOngoingLoan = "BOngoingLoan",
  LDashboard = "LDashboard",
  LDashboardWithNotification = "LDashboardWithNotification",
  Profile = "Profile",
}

export const getMostRecentLoanRequest = (user: User) =>
  user.loan_requests.sort(
    (l1, l2) => Date.parse(l2.created_at) - Date.parse(l1.created_at)
  )[0]

export const getUIState = (user: User) => {
  if (!user) return UIState.Landing

  if (!user.user_type) return UIState.Onboarding
  if (!user.kyc_approved) return UIState.KYCNotApprovedYet
  if (user.kyc_approved) {
    if (user.user_type === UserType.Borrower) {
      if (user.loan_requests.length == 0) return UIState.KYCConfirmed
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
