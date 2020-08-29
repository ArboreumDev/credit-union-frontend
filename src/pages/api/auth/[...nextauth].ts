import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { initializeGQL } from "../../../gql/graphql_client"
import { JWTToken, UserRoles } from "../../../utils/types"
import { ADMIN_EMAILS, HASURA_CLAIMS_NAMESPACE } from "../../../utils/constants"
import { DbClient } from "../../../gql/db_client"

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
    // signin: async (profile, account, metadata) => { console.log(profile, account, metadata)},
    // redirect: async (url, baseUrl) => {
    //     console.log(url, baseUrl)
    //     url.startsWith(baseUrl)
    //         ? Promise.resolve(url)
    //         : Promise.resolve(baseUrl)
    //  },
    jwt: async (token: JWTToken) => {
      const _user = await dbClient.getUserByEmail(token.email)
      if (_user) {
        let hasulraAllowedRoles
        if (ADMIN_EMAILS.includes(_user.email))
          hasulraAllowedRoles = [UserRoles.Admin]
        else hasulraAllowedRoles = [UserRoles.User]

        token = {
          ...token,
          user: _user,
          [HASURA_CLAIMS_NAMESPACE]: {
            "x-hasura-default-role": hasulraAllowedRoles[0],
            "x-hasura-allowed-roles": hasulraAllowedRoles,
            "x-hasura-user-id": _user.id,
          },
        }
      }

      return Promise.resolve(token)
    },
    session: async (session) => {
      const _user = await dbClient.getUserByEmail(session.user.email)
      if (_user) {
        session = {
          ...session,
          user: _user,
        }
      }
      return Promise.resolve(session)
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
