import { User_Insert_Input } from "gql/sdk"
import { Session } from "lib/types"

export function getMockSession(user: User_Insert_Input): Session {
  return {
    accessToken: null,
    expires: null,
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: null,
      user_type: null,
      balance: null,
      created_at: null,
      loan_requests: null,
      loans: [],
      approvedBorrowers: [],
      investedLoans: [],
      loansToRepay: [],
    },
  }
}
