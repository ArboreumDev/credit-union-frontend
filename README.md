# Frontend 

React + Typescript + Next.js

## Features
- Graphql API using Hasura
- Auth using NextAuth
    - It creates all the necessary tables and schema for you.

## Development
1. Rename `example.env.local` to `.env.local` and fill in the necessary env vars. Atleast one authentication provider is needed.
2. For local dev, edit [hosts](https://stackoverflow.com/questions/10456174/oauth-how-to-test-with-local-urls) file
3. `yarn dev`


## Production

The hasura folder should contain postgres migrations and hasura schema. I used the following commands:

First time, probably don't need these again
```
# To create the hasura folder with default config
hasura init

# Test create first empty migration
hasura migrate create "init" --from-server 

# To get schemas from a remote hasura (we are using hasura cloud to design the schema and queries)
hasura migrate create "first" --from-server --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_ADMIN_SECRET
```
Since the free Hasura cloud only supports 1 req/s. It's best to use free Heroku as it can handle around 1000 requests/s. See [comment thread](https://www.reddit.com/r/graphql/comments/a84s22/graphile_vs_hasura/ec80n52/). 

- [x] Create heroku nodes for hasura + postgres. 

    Use this endpoint for production: https://hasura-prod.herokuapp.com/

- [ ] Deploy the schemas from hasura directory by using env file. See [documentation.](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/config-reference.html#environment-variables)