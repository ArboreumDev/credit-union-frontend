import { Session, User, UserType, LoanRequestStatus } from "./types"

export enum UIState {
  Landing = "Landing",
  Login = "SignIn",
  Onboarding = "Onboarding",
  Dashboard = "Dashboard",
  Profile = "Profile",
}

export const getMostRecentLoanRequest = (user: User) =>
  user.loan_requests.sort(
    (l1, l2) => Date.parse(l2.created_at) - Date.parse(l1.created_at)
  )[0]
