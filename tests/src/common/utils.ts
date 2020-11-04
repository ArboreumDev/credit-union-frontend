import DbClient from "gql/db_client"
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

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
