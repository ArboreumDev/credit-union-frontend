import DbClient from "gql/db_client"
import DecentroClient from "gql/wallet/decentro_client"
import { initializeGQL } from "gql/graphql_client"
import SwarmAIClient from "gql/swarmai_client"

global.fetch = require("node-fetch")

// init gql client
const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"
const client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)

// init swarmai client
const swarmAIClient = new SwarmAIClient("http://0.0.0.0:3001")

export const dbClient = new DbClient(client, swarmAIClient)
export const sdk = dbClient.sdk
export const decentro = new DecentroClient(
  "https://in.staging.decentro.tech",
  "arboreum_staging",
  "5aoTBWhjzeOz4GNI7zocGXV3XgozyejA",
  "KDTtCWDkcIfVKEEZlYCNMljnFM8SwM0L"
)
