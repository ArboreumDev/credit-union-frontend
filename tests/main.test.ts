import DbClient from "gql/db_client"
import { Sdk } from "gql/sdk"
import { GraphQLClient } from "graphql-request"

global.fetch = require("node-fetch")

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

// beforeAll(async () => {
// })

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Adding users", () => {
  test("add users", async () => {
    expect(1).toBe(1)
  })
})
