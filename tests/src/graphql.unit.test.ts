import { GraphQLClient } from "graphql-request";
import { Sdk, getSdk } from "../../src/gql/sdk";
import { initializeGQL } from "../../src/gql/graphql_client";
import { USER1, USER3, USER2, EDGE1, EDGE2 } from "./fixtures";

global.fetch = require("node-fetch");

const TEST_API_URL = "http://localhost:8080/v1/graphql";
const TEST_ADMIN_SECRET = "myadminsecretkey";

let client: GraphQLClient;
let sdk: Sdk;

beforeAll(async () => {
  // console.log('res', res)
  client = initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL);
  sdk = getSdk(client);

  // reset
  await sdk.ResetDB();
});

afterAll(async () => {
  // reset
  await sdk.ResetDB();
});

describe("setting up the network from fixtures", () => {
  test("fixture add users", async () => {
    // add users
    await sdk.CreateUser({ user: USER1 });
    await sdk.CreateUser({ user: USER2 });
    await sdk.CreateUser({ user: USER3 });

    const { user } = await sdk.AllUsers();

    expect(user.length).toBe(3);
  });
  test("fixture add edges", async () => {
    // add edges
    sdk.InsertEdge({ edge: EDGE1 });
    sdk.InsertEdge({ edge: EDGE2 });

    // const { user } = await sdk.AllUsers()
    // expect(user.length).toBe(3)
  });

  test("the active network can be queried", async () => {
    // check number of edges and nodes
  });
});
