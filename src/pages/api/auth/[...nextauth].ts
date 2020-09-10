import NextAuth from "next-auth"
import Providers from "next-auth/providers"

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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ]
}

export default (req, res) => NextAuth(req, res, options)
