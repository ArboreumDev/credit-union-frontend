# Frontend

React + Typescript + Next.js

## Features

- Graphql API using Hasura
- Auth using NextAuth
  - It creates all the necessary tables and schema for you.

## Development

1. Rename `example.env.local` to `.env.local` and fill in the necessary env vars. Atleast one authentication provider is needed.
2. For local dev, edit [hosts](https://stackoverflow.com/questions/10456174/oauth-how-to-test-with-local-urls) file
3. `yarn dev` to start server

### Add graphql queries

- Add queries to `/src/gql/queries/<query_type>/<query_name>.graphql`
- To automatically generate the sdk: `yarn graphql-codegen`

## Testing

- CI like: `cd tests; make test`
- Watch/ Interactive tests: `cd tests; make test-watch`

## Lint

Linting automatically happen during commits. We use husky and lint-staged to achieve that. Configuration in `package.json`

To run manually:
`yarn eslint`

## Production

The hasura folder should contain postgres migrations and hasura schema. I used the following commands:

First time commands: (probably don't need these again)

```
### To create the hasura folder with default config
hasura init

### Test create first empty migration
hasura migrate create "init" --from-server

### To get postgres schema from a remote hasura (we are using hasura cloud to design the schema and queries)
hasura migrate create "first" --from-server --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_ADMIN_SECRET

### To get hasura metadata
hasura metadata export --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_ADMIN_SECRET

# To autmomatically generate schema migrations for updates to db (See [this](https://hasura.io/docs/1.0/graphql/manual/migrations/migrations-setup.html#step-4-use-the-console-from-the-cli))
hasura console
```

Since the free Hasura cloud only supports 1 req/s. It's best to use free Heroku as it can handle around 1000 requests/s. See [comment thread](https://www.reddit.com/r/graphql/comments/a84s22/graphile_vs_hasura/ec80n52/).

- [x] Create heroku nodes for hasura + postgres.

  Use this endpoint for production: https://hasura-prod.herokuapp.com/

- [ ] Deploy the schemas to production from hasura directory by using env file. See [documentation.](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/config-reference.html#environment-variables)

```
    hasura migrate apply --endpoint <server-endpoint>
    hasura metadata apply --endpoint <server-endpoint>
```
