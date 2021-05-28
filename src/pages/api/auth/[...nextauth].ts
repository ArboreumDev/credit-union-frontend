import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { Session, UserType } from "lib/types"
import DbClient from "gql/db_client"

const dbClient = new DbClient()

const options = {
  database: process.env.DATABASE_URL,
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: encodeURIComponent(process.env.EMAIL_SERVER_PASSWORD),
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
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

      return Promise.resolve(s)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
