import { User_Insert_Input } from "gql/sdk"
import { Session } from "lib/types"

export function getMockSession(user: User_Insert_Input): Session {
  return {
    accessToken: null,
    expires: null,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: null,
      user_type: null,
      balance: null,
      corpus_share: null,
      created_at: null,
      loan_requests: null,
      pledge_requests: null,
    },
  }
}
