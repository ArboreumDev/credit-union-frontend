# Vercel

Make json file like

- `production/.env.json`

```json
{
  "DATABASE_URL": "DATABASE_URL",
  "NEXTAUTH_URL": "NEXTAUTH_URL",
  "HASURA_ADMIN_SECRET": "HASURA_ADMIN_SECRET",
  "GRAPHQL_ENDPOINT": "GRAPHQL_ENDPOINT",
  "GOOGLE_CLIENT_ID": "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET": "GOOGLE_CLIENT_SECRET",
  "EMAIL_SERVER_PORT": "EMAIL_SERVER_PORT",
  "EMAIL_FROM": "EMAIL_FROM",
  "EMAIL_SERVER_USER": "EMAIL_SERVER_USER",
  "EMAIL_SERVER_PASSWORD": "EMAIL_SERVER_PASSWORD",
  "EMAIL_SERVER_HOST": "EMAIL_SERVER_HOST",
  "AWS_ACCESS_KEY_ID_APP": "AWS_ACCESS_KEY_ID_APP",
  "AWS_SECRET_ACCESS_KEY_APP": "AWS_SECRET_ACCESS_KEY_APP",
  "ENVIRONMENT": "ENVIRONMENT",
  "SWARMAI_URL": "SWARMAI_URL"
}
```

## Deploy to vercel

```bash
python production/setup_vercel.py
vercel --prod
```

# Hasura + PG

## Postgres init

Postgres is hosted on the AWS RDS server.

To create a new db, login to the server using a tool like `pgcli`

```
pgcli postgres://postgres:<pwd>@arboreum-sf2.cvdulo7qnwp6.us-west-1.rds.amazonaws.com
```

Create DB

```
create database test_prod_1;
```

## Hasura init

1. In `production/docker-compose.yml`, update `HASURA_GRAPHQL_DATABASE_URL` with your db string

2. Launch hasura on the machine

```
cd production
docker-compose up
```

3. use production config for migrations

```
cd hasura
mv config.production.yaml config.yaml
```

4. Run new migrations

```
yarn migrate
yarn metadata
```

Run step 4 on every update to production schema.

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
