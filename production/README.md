### To create the hasura folder with default config

```
hasura init
# Now update config (endpoint, adminsecret)

hasura migrate create "init" --from-server --endpoint http://localhost:8080 --admin-secret myadminsecretkey

hasura metadata export --endpoint http://localhost:8080 --admin-secret myadminsecretkey
```

```
hasura migrate apply
hasura metadata apply
```
