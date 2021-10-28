import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { Session, UserType } from "lib/types"
import DbClient from "gql/db_client"

const dbClient = new DbClient()

const options = {
  // database: process.env.DATABASE_URL,
  // session: { jwt: true },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "email",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "" },
        // password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = {
          id: 1,
          name: "",
          email: credentials.username,
        }
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      },
    }),
  ],
  callbacks: {
    session: async (session) => {
      let s = session as Session
      const _user = await dbClient.getUserByEmail(s.user.email)

      if (_user) s = { ...s, user: _user }
      if (_user?.user_type === UserType.Lender) {
        const { borrowers } = await dbClient.sdk.GetBorrowers()
        s = { ...s, options: borrowers }
      }

      // if user is kyc'ed & has circle, fetch balance from circle
      if (
        s.user.kyc_approved &&
        s.user.account_details.circle &&
        s.user.account_details.circle.walletId
      ) {
        s.user.balance = await dbClient.getCircleBalance(s.user.id)
        // process new deposits if there are any & send them to the users account
        await dbClient.circleClient.processDeposits(
          s.user.account_details.circle.accountId,
          s.user.account_details.circle.walletId
        )
        s.user.account_details.circle.history = await dbClient.circleClient.getHistory(
          s.user.account_details.circle.walletId,
          s.user.account_details.circle.accountId
        )
      }

      return Promise.resolve(s)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
