import { initializeGQL } from "../utils/graphql_client";
import {INSERT_USER, DELETE_NETWORK, INSERT_EDGE, RESET_DB } from "../utils/queries";
import {USERS, USER4, basic_network} from "../utils/fixtures";
import { addNetwork, getUsers, addEdges, getNetwork } from "../utils/fixture_helpers";
import { RESET } from "@blueprintjs/icons/lib/esm/generated/iconContents";

global.fetch = require("node-fetch");

require("dotenv").config({ path: ".env.local" });

const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";
const USER1 = USERS[1]
const USER2 = USERS[2]
const nInitialUsers = Object.keys(USERS).length

const executeGQL = async (query, variables=null) => {
  let gqlClient = initializeGQL()
  let data = await gqlClient.request(query, variables);
  console.log(data)
  return data
}

beforeAll( async () => {
  // await executeGQL(DELETE_NETWORK)
  // await executeGQL(RESET_DB)
  // let res = await addNetwork(USERS, basic_network.edges)
  // console.log('res', res)
})

afterAll( async () => {
  // await executeGQL(DELETE_NETWORK)
  // await executeGQL(RESET_DB)
})

describe.skip("setting up the network from fixtures", () =>{
  test('fixture users have been added', async () => {
    let data = await getUsers()
    console.log('data', data.length)
    expect(data.length).toBe(nInitialUsers)
  });
  
  test('edges can be added', async () => {
    let data = await getUsers()
    await addEdges(data, basic_network.edges)
  })
  
  test('a user can be added', async () => {
    let gqlClient = initializeGQL()
    let data = await gqlClient.request(INSERT_USER, {user: USER4});
    const created_user = data.insert_user.returning[0]
    Object.keys(USER4).forEach((key) => {
      expect(created_user[key]).toStrictEqual(USER4[key])
    })
    data = await getUsers()
    expect(data.length).toBe(nInitialUsers + 1)
  })  

  test('the active network can be queried', async () => {
    let network = await getNetwork('active')
    expect(network.edges).toStrictEqual(basic_network.edges)
    expect(network.nodes).toStrictEqual(basic_network.nodes)
  })
})  

describe("When user is onboarded as lender", () => {
  test("they are asked to confirm existing borrower requests", async () =>{})
  // TODO add way more cases
})

describe("When user is onboarded as borrower", () => {
  test("they are extended credit from lenders that trust them", async () =>{})
  test.skip("they can add their trusted borrowers", async () =>{})
  // TODO add way more cases
})

describe("When a loan request is created ...", () => {
  test("network risk is updated", async () =>{})
  test("demand functions are generated", async () =>{})
  test("An offer is being made to them", async () =>{})
  // TODO add way more cases
})

describe("When a loan request is accepted ...", () => {
  test("Lenders are associated with the loan", async () =>{})
  test.skip("Loan request is marked as confirmed", async () =>{})
  test.skip("Lenders balances are reduced", async () =>{})
  test.skip("Borrower balances is increased", async () =>{})
  test.skip("payables and receivables are created", async () =>{})
  test.skip("supporters cash is encumbered", async () =>{})
})


describe("When a loan request is paid back ...", () => {
})


test.skip('if a user extends credit to an existing agent, an edge is added to the network', async () => {

})
