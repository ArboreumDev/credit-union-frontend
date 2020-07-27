# Frontend 

React + Typescript + Next.js

## Features
- Graphql API using Apollo and Hasura
- Auth using NextAuth
    - It creates all the necessary tables and schema for you.


## Development
1. Edit copy example.env.local to .env.local
2. Add postgres and auth variables

.env should have:
```
DATABASE_URL=""
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
3. Make sure to edit `hosts` file http://mywebsite.com/ to point to 127.0.0.1
4. npm run dev
