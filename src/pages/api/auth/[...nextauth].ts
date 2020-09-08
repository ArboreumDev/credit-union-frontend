import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { DbClient } from "../../../gql/db_client"
import { JWTToken, Session } from "../../../utils/types"
import { getUIState } from "../../../utils/UIStateHelpers"

const dbClient = new DbClient()

const options = {
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  callbacks: {
    jwt: async (token: JWTToken) => {
      const _user = await dbClient.getUserByEmail(token.email)
      if (_user) token = { ...token, user: _user }

      return Promise.resolve(token)
    },
    session: async (session) => {
      let s = session as Session
      const _user = await dbClient.getUserByEmail(s.user.email)
      const uiState = getUIState(_user || session.user)

      s = { ...s, uiState: uiState }
      if (_user) s = { ...s, user: _user }

      // console.log("session ", s)
      return Promise.resolve(s)
    },
  },
  events: {
    signout: async (message) => {
      console.log("sign out successful")
    },
    createUser: async (message) => {
      /* user created */
    },
    linkAccount: async (message) => {
      /* account linked to a user */
    },
    session: async (message) => {
      /* session is active */
    },
    error: async (message) => {
      /* error in authentication flow */
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
