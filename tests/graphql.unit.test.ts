import { initializeGQL, DbClient } from "../src/utils/graphql_client";
import {INSERT_USER, DELETE_NETWORK, INSERT_EDGE, RESET_DB } from "../src/utils/queries";
import {USERS, USER4, basic_network} from "../src/utils/fixtures";
import { addNetwork, getAllUsers, getNetwork } from "../src/utils/fixture_helpers";
import { RESET } from "@blueprintjs/icons/lib/esm/generated/iconContents";

// require("dotenv").config({ path: ".env.local" });
global.fetch = require("node-fetch");

// REFACTOR this should be done with object destructuring....but somehow i fail at it :/
// const USER1 = USERS[1]
// const USER2 = USERS[2]
const nInitialUsers = Object.keys(USERS).length
const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client;

beforeAll( async () => {
  // console.log('res', res)
  client = new DbClient(TEST_ADMIN_SECRET, TEST_API_URL)
  await client.executeGQL(DELETE_NETWORK)
  // await client.executeGQL(RESET_DB)
  let res = await addNetwork(client, USERS, basic_network.edges)
})

afterAll( async () => {
  // await client.executeGQL(DELETE_NETWORK)
  // await client.executeGQL(RESET_DB)
})

describe("setting up the network from fixtures", () =>{
  test('fixture users have been added', async () => {
    let data = await getAllUsers(client)
    expect(data.length).toBe(nInitialUsers)
  });

  test('the active network can be queried', async () => {
    let network = await getNetwork(client, 'active')
    expect(network.edges).toStrictEqual(basic_network.edges)
    expect(network.nodes).toStrictEqual(basic_network.nodes)
  })
})

describe("Adding users and connections from frontend", () => {
  test.skip('user can add a trusted borrower', async () => {
    // TODO addEdge
    // await addEdges(data, basic_network.edges)
    // let data = await getUsers()
  })
  
  test.skip('a new user can be onboarded', async () => {
    let data = await client.executeGQL(INSERT_USER, {user: USER4});
    const created_user = data.insert_user.returning[0]
    Object.keys(USER4).forEach((key) => {
      expect(created_user[key]).toStrictEqual(USER4[key])
    })
    data = await client.getUsers()
    expect(data.length).toBe(nInitialUsers + 1)
  })  
})  

// describe.skip("When user is onboarded as lender", () => {
//   test("they are asked to confirm existing borrower requests", async () =>{})
//   // TODO add way more cases
// })

// describe.skip("When user is onboarded as borrower", () => {
//   test("they are extended credit from lenders that trust them", async () =>{})
//   test.skip("they can add their trusted borrowers", async () =>{})
//   // TODO add way more cases
// })

// describe.skip("When a loan request is created ...", () => {
//   test("network risk is updated", async () =>{})
//   test("demand functions are generated", async () =>{})
//   test("An offer is being made to them", async () =>{})
//   // TODO add way more cases
// })

// describe.skip("When a loan request is accepted ...", () => {
//   test("Lenders are associated with the loan", async () =>{})
//   test.skip("Loan request is marked as confirmed", async () =>{})
//   test.skip("Lenders balances are reduced", async () =>{})
//   test.skip("Borrower balances is increased", async () =>{})
//   test.skip("payables and receivables are created", async () =>{})
//   test.skip("supporters cash is encumbered", async () =>{})
//   test.skip("Borrowers can query how much they owe ", async () =>{})
//   test.skip("Lenders can see how much have invested", async () =>{})
//   test.skip("Lenders can see how much they are likely to earn", async () =>{})
//   test.skip("Supporters can see how much money they are guaranteeing", async () =>{})
// })


// describe.skip("When a loan request is paid back ...", () => {
// })


// test.skip('if a user extends credit to an existing agent, an edge is added to the network', async () => {

// })
