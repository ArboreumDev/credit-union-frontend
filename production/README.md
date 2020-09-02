# Steps to run a fresh production hasura

- Create pg db
- Create a new hasura project in the cloud
- Apply migrations:

```
yarn migrate --endpoint <HASURA_ENDPOINT> --admin-secret <admin_secret>
yarn metadata --endpoint <HASURA_ENDPOINT> --admin-secret <admin_secret>
```

- (optional) To squash from localhost:

```
### To create the hasura folder with default config
hasura init

### Test create first empty migration
hasura migrate create "init" --from-server

### To get postgres schema from a remote hasura (we are using hasura cloud to design the schema and queries)
hasura migrate create "init" --from-server --endpoint http://localhost:8080 --admin-secret myadminsecretkey

### To get hasura metadata
hasura metadata export --endpoint http://localhost:8080 --admin-secret myadminsecretkey

# To autmomatically generate schema migrations for updates to db (See [this](https://hasura.io/docs/1.0/graphql/manual/migrations/migrations-setup.html#step-4-use-the-console-from-the-cli))
hasura console
```

## Where to host hasura server?

~Since the free Hasura cloud only supports 1 req/s. It's best to use free Heroku as it can handle around 1000 requests/s. See [comment thread](https://www.reddit.com/r/graphql/comments/a84s22/graphile_vs_hasura/ec80n52/).~

Hasura cloud supports 60 reqs/min. Heroku free only allows 17h uptime per day.
When ready to scale, we can use AWS. Making it secure seemed like a hassle, so I didn't go through with it.

# Vercel

Make env files

- `production/.env.production`
- `production/.env.preview`

```
ENVIRONMENT=production sh production/setup_vercel.sh
```
