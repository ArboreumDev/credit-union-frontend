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
  Dashboard = "Dashboard",
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
  if (user.user_type === UserType.Borrower) return UIState.BDashboard
  if (user.user_type === UserType.Lender) return UIState.LDashboard

  return UIState.Landing
}
