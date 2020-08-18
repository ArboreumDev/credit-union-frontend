import { initializeGQL } from "../utils/db/GQLClient";
import {USERS, USER4, basic_network} from "./fixtures/fixtures";
import { addNetwork, getAllUsers } from "./fixtures/fixture_helpers";
import { LoanRequestStatus, EdgeStatus } from "../utils/types";
import { DbClient } from "../utils/db/DBClient";
import {User} from "../utils/types"
import Helpers from "../utils/queries/helpers"
// import Accounts from "../utils/queries/accounts"
// import Network from "../utils/queries/network"

// require("dotenv").config({ path: ".env.local" });
global.fetch = require("node-fetch");

// REFACTOR this should be done with object destructuring....but somehow i fail at it :/
// const USER1 = USERS[1]
// const USER2 = USERS[2]
const nInitialUsers = Object.keys(USERS).length
const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: DbClient;
let borrower1;
let lender1;
// lender 2 is farther away from borrower
let lender2;
// let guarantor1;

beforeAll( async () => {
  // clear the DB and add basic network from fixture
  client = new DbClient(initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL))
  // await client.executeGQL(Network.DELETE_NETWORK)
  await client.executeGQL(Helpers.RESET_DB)
  let res = await addNetwork(client._fetcher, USERS, basic_network.edges)

  // set borrower and level1 and level2 lenders for basic network
  // i am using user_numbers here to make this understandable...alternatively we coudl user.name
  const active_users = await getAllUsers(client._fetcher)
  borrower1 = active_users.filter(x => x.user_type == "borrower")[0]
  const lenders = active_users.filter(x => x.user_type == "lender")
  lender1 = lenders[0]
  lender2 = lenders[1]
})

afterAll( async () => {
  // await client.executeGQL(DELETE_NETWORK)
  // await client.executeGQL(Helpers.RESET_DB)
})

describe("setting up the network from fixtures", () =>{
  test('fixture users have been added', async () => {
    let data = await getAllUsers(client._fetcher)
    let usermails = data.map(x => x.email)
    Object.values(USERS).forEach(user => {
      expect(usermails).toContain(user.email)
    })
  });

  test('the active network can be queried', async () => {
    let network = await client.getNetwork('active')
    expect(network.edges).toStrictEqual(basic_network.edges)
    expect(network.nodes).toStrictEqual(basic_network.nodes)
  })
})

describe("Adding connections and users from frontend", () => {
  // test.skip("A borrower save emails of lenders that are not signed up yet", async () =>{})

  test('a new lender-user can be onboarded', async () => {
    let created_user = await client.createUser(USER4 as User); // << TODO define helper function in client!!!
    Object.keys(USER4).forEach((key) => {
      expect(created_user[key]).toStrictEqual(USER4[key])
    })
    const data = await getAllUsers(client._fetcher)
    expect(data.length).toBe(nInitialUsers + 1)
  })  
})  


describe("A borrower user request a loan...", () => {
  const amount = 100
  const purpose = "go see the movies"
  var request;
  var testOutput;

  test("A loan request with status 'initiated' is created", async () =>{
    let data = await client.createLoanRequest(borrower1.id, amount, purpose)
    request = data.request
    // verify input-fields are there
    expect(request.amount).toBe(amount)
    expect(request.purpose).toBe(purpose)
    // TODO verify other auto-generated fields make sense
    expect(request.status).toBe(LoanRequestStatus.initiated)
  })

  test("A loan offer is saved by the AI", async () => {
    let data = await client.calculateLoanRequestOffer(request.request_id)
    request = data.request
    expect(request.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)

    // verify the creation of input to the optimizer:
    testOutput = data.testing
    expect(testOutput.ai_input).toHaveProperty("potential_lenders")
    expect(testOutput.ai_input.potential_lenders.includes(lender1.id)).toBeTruthy()
    
    // verify how the output of the optimizer is stored in DB:
    expect(request.risk_calc_result).toHaveProperty("latestOffer") // OR
  })
  
  test("the borrower can see the parameters of the offer in their dashboard", async () => {
    const dashboard = await client.getBorrowerDashboardInfo(borrower1.id)
    expect(dashboard.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)
    expect(dashboard.principal).toBe(amount)

  })

  test("Approving a loan offer triggers creation of payables, receivables", async () => {
    const res = await client.acceptLoanOffer(request.request_id, "latestOffer")
    expect(res.update_loan_requests_by_pk.status).toBe(LoanRequestStatus.live)
    // TODO verify payables, encumbrances, receivables, ....
  })

  describe("Viewing loan-info", () => {
    test("The borrower user can see their repayment plan in the frontend", async () => {
      const dashboard = await client.getBorrowerDashboardInfo(borrower1.id)
      expect(dashboard.amountRepaid).toBe(0)
      expect(dashboard.loanAmount).toBe(amount)
      expect(dashboard.outstanding.total).toBeGreaterThan(amount)
     })

    test.skip("Both lender and borrrower see the loan appearing in their loan history", async () => { })

    test("The lender sees an updated breakdown of their portfolio ", async () => { 
      const dashboard = await client.getLenderDashboadInfo(lender1.id)
      expect(dashboard.invested).toBeGreaterThan(0)
      expect(dashboard.interest.expected).toBeGreaterThan(dashboard.invested)
      // expect(dashboard.idle).toBeLessThan(lender1.balance) // TODO 
      // TODO check receivable
    })

  })
})
