# Steps to run a fresh production hasura

- Create pg db
- Create a new hasura project in the cloud
- Apply migrations:

```
yarn migrate --endpoint <HASURA_ENDPOINT> --admin-secret <admin_secret>
yarn metadata --endpoint <HASURA_ENDPOINT> --admin-secret <admin_secret>
```

- (optional) To squash:

```
hasura migrate create "init" --from-server --endpoint http://localhost:8080 --admin-secret myadminsecretkey
hasura metadata export --endpoint http://localhost:8080 --admin-secret myadminsecretkey
```

# Vercel

## Update all env vars to vercel

```
source .env.production
sh setup_vercel.sh
```
