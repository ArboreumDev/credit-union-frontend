# Credit Union as a Service

React + Typescript + Next.js

Frontend that allows borrowers to apply for loans from a pool of lenders, if they can bring one or more supporters willing
to derisk the loan by lending at less favorable terms and taking the first loss in case of partial defaults
[Product Demo](https://www.youtube.com/watch?v=iN3Bl4Xchwg)

![output](https://user-images.githubusercontent.com/1958947/188734379-b07e70a6-b28f-415b-9aee-9fe388746f95.gif)


Check out branch [/algorandCore](https://github.com/ArboreumDev/frontend/tree/algorandCore) for our algorand-integration:

- onboarding process includes creating an account on circle (to create deposit addresses for fiat, eth-USDC, & algorand-USDC)
- allow manual deposits into user-accounts with algoConnect wallet

(DEPRECATED:)

## Features

- Graphql API using Hasura
  - auto-generating typescript classes with [graphql-codegen](https://www.youtube.com/watch?v=iN3Bl4Xchwg)
- Auth using NextAuth
  - It creates all the necessary tables and schema for you.
- testing with jest

## Architecture

![overview](/docs/architecture_snap.png)

full diagram here [diagram](/docs/Arboreum_Architecture.pdf)

## Development

1. Rename `example.env.local` to `.env.local` and fill in the necessary env vars. At least one authentication provider is needed.
2. For local dev, edit [hosts](https://stackoverflow.com/questions/10456174/oauth-how-to-test-with-local-urls) file
3. `yarn dev` to start server

### debugging

Modify `package.json` to debug: `"dev": "NODE_OPTIONS='--inspect' next",`
Can't change source after debug has started.

Debugging test example:

`node --inspect node_modules/.bin/jest "--testPathIgnorePatterns=[]" --watch --runInBand tests/src/scenarios/simple.integration.test.ts`

# With custom swarmai

`docker-compose stop swarmai`

and run the usual `make dev-api`

### Add graphql queries

- Add queries to `/src/gql/queries/<query_type>/<query_name>.graphql`
- To automatically generate the sdk: `yarn graphql-codegen`

## Testing

- CI like: `cd tests; make test`
- Watch/ Interactive tests: `cd tests; make test-watch`

To use the swarmai docker, you will first need to login to github package repository as described [here](https://docs.github.com/en/packages/guides/configuring-docker-for-use-with-github-packages).

`cat ~/TOKEN.txt | docker login https://docker.pkg.github.com -u USERNAME --password-stdin`

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

## Deploy

[Deployment Readme](production/README.md)
