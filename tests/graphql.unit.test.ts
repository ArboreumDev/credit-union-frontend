import { GraphQLClient } from "graphql-request";
import { Sdk, getSdk } from "../src/gql/sdk";
import { initializeGQL } from "../src/gql/graphql_client";

global.fetch = require("node-fetch");

// REFACTOR this should be done with object destructuring....but somehow i fail at it :/
// const USER1 = USERS[1]
// const USER2 = USERS[2]

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk

beforeAll( async () => {
  // console.log('res', res)
  client = initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL)
  sdk = getSdk(client)

  // delete network

  // add network

})

afterAll( async () => {
  // await client.executeGQL(DELETE_NETWORK)
  // await client.executeGQL(RESET_DB)
})

describe("setting up the network from fixtures", () =>{
  test('fixture users have been added', async () => {
  //  check number of users
  });

  test('the active network can be queried', async () => {
    // check number of edges and nodes
  })
})
