# Frontend

React + Typescript + Next.js

## Features

- Graphql API using Hasura
- Auth using NextAuth
  - It creates all the necessary tables and schema for you.

## Development

1. Rename `example.env.local` to `.env.local` and fill in the necessary env vars. At least one authentication provider is needed.
2. For local dev, edit [hosts](https://stackoverflow.com/questions/10456174/oauth-how-to-test-with-local-urls) file
3. `yarn dev` to start server

### debugging

Modify `package.json` to debug: `"dev": "NODE_OPTIONS='--inspect' next",`
Can't change source after debug has started.

### Add graphql queries

- Add queries to `/src/gql/queries/<query_type>/<query_name>.graphql`
- To automatically generate the sdk: `yarn graphql-codegen`

## Testing

- CI like: `cd tests; make test`
- Watch/ Interactive tests: `cd tests; make test-watch`

## Lint

Linting automatically happen during commits. We use husky and lint-staged to achieve that. Configuration in `package.json`

To run manually:
`yarn eslint .`

# For production

## Check if there are any build errors:

`yarn build`

## Migrations

If there are changes to migrations, make sure the down migration file works well.

## Seeds

To automatically create seeds from the current db state:
`hasura seeds create user_seed --from-table user`
`hasura seeds create loan_request_seeds --from-table loan_requests`
etc.
