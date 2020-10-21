import DbClient from "gql/db_client"
import { initializeGQL } from "gql/graphql_client"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

const client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
export const dbClient = new DbClient(client)
export const sdk = dbClient.sdk
