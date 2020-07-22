import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { rootStore } from '../../../stores/root';

const options = {
    site: process.env.SITE || 'http://mywebsite.com:3000',

    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
    events: {
        signin: async(message) => {},
        signout: async(message) => { console.log('sign out successful') },
        createUser: async(message) => { /* user created */ },
        linkAccount: async(message) => { /* account linked to a user */ },
        session: async(message) => { /* session is active */ },
        error: async(message) => { /* error in authentication flow */ }
    }
}

export default (req, res) => NextAuth(req, res, options)