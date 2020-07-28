import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
  site: process.env.SITE || "http://mywebsite.com:3000",

  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  callbacks: {
    // signin: async (profile, account, metadata) => { console.log(profile, account, metadata)},
    // redirect: async (url, baseUrl) => {
    //     console.log(url, baseUrl)
    //     url.startsWith(baseUrl)
    //         ? Promise.resolve(url)
    //         : Promise.resolve(baseUrl)
    //  },
    // jwt: async (token) => { }
  },
  events: {
    signin: async (message) => {},
    signout: async (message) => {
      console.log("sign out successful");
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
};

export default (req, res) => NextAuth(req, res, options)