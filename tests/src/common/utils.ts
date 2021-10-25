import DbClient from "gql/db_client"
import { initializeGQL } from "gql/graphql_client"
import SwarmAIClient from "gql/swarmai_client"
import CircleClient from "gql/wallet/circle_client"
import AlgoClient from "gql/algo_client"

global.fetch = require("node-fetch")

// init gql client
const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"
const client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)

// init swarmai client
// const swarmAIClient = new SwarmAIClient("http://0.0.0.0:3001")
const swarmAIClient = new SwarmAIClient("http://localhost:3002")
export const algoClient = new AlgoClient("http://localhost:8001")

// init circle client
const TEST_CIRCLE_BASE_URL = "https://api-sandbox.circle.com"
const TEST_CIRCLE_API_KEY =
  "QVBJX0tFWTo1NWE2MDdjZDNjYjNjZjk0N2Q4MmU0MWFkNTEyYzIyYTo1NmEyY2NmZDAwYzIwNmY0ZWZhYTVkMzI3MTA4NmM3Yw"

export const circleClient = new CircleClient(
  TEST_CIRCLE_BASE_URL,
  TEST_CIRCLE_API_KEY
)
export const dbClient = new DbClient(client, swarmAIClient, circleClient, algoClient)
export const circle = dbClient.circleClient
export const sdk = dbClient.sdk
