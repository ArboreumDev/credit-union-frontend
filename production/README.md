### To create the hasura folder with default config

hasura init

hasura migrate create "init" --from-server --endpoint http://localhost:8080 --admin-secret myadminsecretkey

hasura % hasura metadata export --endpoint http://localhost:8080 --admin-secret myadminsecretkey

Add .env file:

```
DATABASE_URL=postgres://<>
HASURA_GRAPHQL_ADMIN_SECRET=<>
HASURA_GRAPHQL_ENDPOINT=https://modern-terrapin-59.hasura.app
```

Run `make db`
