import { initializeGQL, DbClient } from "../utils/db/graphql_client";

import {CREATE_USER, DELETE_NETWORK, INSERT_EDGE, RESET_DB } from "../utils/queries";
import {USERS, USER4, basic_network} from "./fixtures/fixtures";
import { addNetwork, getAllUsers } from "./fixtures/fixture_helpers";
import { getNetwork } from "../utils/network_helpers";
import { RESET } from "@blueprintjs/icons/lib/esm/generated/iconContents";
import { LoanRequestStatus, EdgeStatus } from "../utils/types";

// require("dotenv").config({ path: ".env.local" });
global.fetch = require("node-fetch");

// REFACTOR this should be done with object destructuring....but somehow i fail at it :/
// const USER1 = USERS[1]
// const USER2 = USERS[2]
const nInitialUsers = Object.keys(USERS).length
const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client;
let borrower1;
let lender1;
// lender 2 is farther away from 
let lender2;
// let guarantor1;

beforeAll( async () => {
  // clear the DB and add basic network from fixture
  client = new DbClient(initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET))
  // await client.executeGQL(DELETE_NETWORK)
  await client.executeGQL(RESET_DB)
  let res = await addNetwork(client.fetcher, USERS, basic_network.edges)

  // set borrower and level1 and level2 lenders for basic network
  // i am using user_numbers here to make this understandable...alternatively we coudl user.name
  const active_users = await getAllUsers(client.fetcher)
  borrower1 = active_users.filter(x => x.user_type = "borrower")[0]
  lender1 = active_users.filter(x => x.user_number = 2)[0]
  lender2 = active_users.filter(x => x.user_number = 1)[0]
})

afterAll( async () => {
  // await client.executeGQL(DELETE_NETWORK)
  await client.executeGQL(RESET_DB)
})

describe("setting up the network from fixtures", () =>{
  test('fixture users have been added', async () => {
    let data = await getAllUsers(client.fetcher)
    let usermails = data.map(x => x.email)
    Object.values(USERS).forEach(user => {
      expect(usermails).toContain(user.email)
    })
  });

  // TODO check only for existing network
  test('the active network can be queried', async () => {
    let network = await getNetwork(client.fetcher, 'active')
    expect(network.edges).toStrictEqual(basic_network.edges)
    expect(network.nodes).toStrictEqual(basic_network.nodes)
  })
})

describe("Adding connections and users from frontend", () => {
  test.skip("A borrower save emails of lenders that are not signed up yet", async () =>{
    const new_connection = USER4.email
    // TODO this could be a place to test subscriptions
  })

  test('a new lender-user can be onboarded', async () => {
    // TODO define input type in types.ts
    let data = await client.(CREATE_USER, {user: USER4}); // << TODO define helper function in client!!!
    const created_user = data.insert_user.returning[0]
    Object.keys(USER4).forEach((key) => {
      expect(created_user[key]).toStrictEqual(USER4[key])
    })
    data = await getAllUsers(client.fetcher)
    expect(data.length).toBe(nInitialUsers + 1)
  })  

  test.skip('borrower-users can add a trusted borrower', async () => {
    // TODO addEdge
    // await addEdges(data, basic_network.edges)
    // let data = await getUsers()
  })
  // test.skip('the  ')
 
})  

// describe.skip("When user is onboarded as lender", () => {
//   test("they are asked to confirm existing borrower requests", async () =>{})
//   // TODO write a mutation that the frontend can subscribe too
// })

// describe.skip("When user is onboarded as borrower", () => {
//   test("they are extended credit from lenders that trust them", async () =>{})
//   test.skip("they can add their trusted borrowers", async () =>{})
//   // TODO add way more cases
// })


describe("A borrower user request a loan...", () => {
  const amount = 20
  const purpose = "go see the movies"
  var request;
  var testVars;

  test("A loan request with status 'initiated' is created", async () =>{
    let data = await client.calculateLoanRequestOffer(borrower1.id, amount, purpose)
    request = data.request
    testVars = data.testing
    // console.log(request)

    expect(data.testing.pre_ai.status).toBe(LoanRequestStatus.initiated)
    // TODO verify other auto-generated fields
    expect(data.testing.pre_ai.amount).toBe(amount) // <- we could assume that those are there
    expect(data.testing.pre_ai.purpose).toBe(purpose)
  })

  test("A loan offer is saved by the AI", async () => {
    expect(request.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)
    
    // we could verify the input to the optimizer like this:
    // console.log(testVars.ai_input)
    expect(testVars.ai_input).toHaveProperty("potential_lenders")
    // expect(testVars.ai_input.potential_lenders.includes(lender1.id)).toBeTruthy() // <-- not sure why this fails
    
    // the optimizer output would be checked like this:
    expect(request.risk_calc_result).toHaveProperty("latestOffer") // OR
    expect(testVars.post_ai.risk_calc_result).toHaveProperty("latestOffer")
  })

  test("Approving a loan offer triggers creation of payables, receivables", async () => {
    const res = await client.acceptLoanOffer(borrower1.id, request.request_id, "latestOffer")
    // TODO verify payables, encumbrances, receivables, ....
  })
})


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
