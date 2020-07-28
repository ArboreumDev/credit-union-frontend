import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


const options = {
    site: process.env.VERCEL_URL || 'http://mywebsite.com:3000',

    // Configure one or more authentication providers
    providers: [
        // Providers.GitHub({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET
        // }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
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
        signin: async(message) => {},
        signout: async(message) => { console.log('sign out successful') },
        createUser: async(message) => { /* user created */ },
        linkAccount: async(message) => { /* account linked to a user */ },
        session: async(message) => { /* session is active */ },
        error: async(message) => { /* error in authentication flow */ }
    }
}

export default (req, res) => NextAuth(req, res, options)