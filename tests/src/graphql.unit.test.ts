import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { DbClient } from "../../src/gql/db_client"
import { EDGE_STATUS, LoanRequestStatus } from "../../src/utils/types"
import { USER1, USER3, USER2, EDGE1, EDGE2, USERS, EDGES, BASIC_NETWORK} from "./fixtures"
import { addUsers, addEdgesFromList, addNetwork, getNetwork } from "../../src/utils/network_helpers"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

beforeAll(async () => {
  // console.log('res', res)
  client = initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL)
  sdk = getSdk(client)
  dbClient = new DbClient(TEST_ADMIN_SECRET, TEST_API_URL)
  // reset
  await sdk.ResetDB()
})

afterAll(async () => {
  // reset
  // await sdk.ResetDB()
})

describe("Loan request with basic network", () => {
  const amount = 100
  const purpose = "go see the movies"
  let request_id;
  var testOutput;
  let borrower1;
  let lender1;
  let lender2;
  // let guarantor1;

  beforeAll(async () =>{
    await addNetwork(sdk, USERS, EDGES)
    // const {user} = await sdk.AllUsers()
    borrower1 = USERS.filter(x => x.user_type == "borrower")[0]
    const lenders = USERS.filter(x => x.user_type == "lender")
    lender1 = lenders[0]
    lender2 = lenders[1]
  })

  test("users from fixture have been added", async () => {
    const { user } = await sdk.GetAllUsers()
    let usermails = user.map(x => x.email)
    Object.values(USERS).forEach(user => {
      expect(usermails).toContain(user.email)
    })
  })

  test('the active network can be queried in network-x format', async () => {
    let network = await dbClient.getNetwork(EDGE_STATUS.active)
    expect(network.edges).toStrictEqual(BASIC_NETWORK.edges)
    expect(network.nodes).toStrictEqual(BASIC_NETWORK.nodes)
  })
    
  describe("A borrower user request a loan...", () => {
    test("A loan request with status 'initiated' is created", async () =>{
      const {request} = await dbClient.createLoanRequest(borrower1.id, amount, purpose)
      request_id = request.request_id
      expect(request.amount).toBe(amount)
      expect(request.purpose).toBe(purpose)
      expect(request.status).toBe(LoanRequestStatus.initiated)
      // TODO verify other auto-generated fields make sense
    })
    
    test("A loan offer is saved by the AI", async () => {
      const { updatedRequest } = await dbClient.calculateLoanRequestOffer(request_id)
      expect(updatedRequest.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)
      
      // verify the creation of input to the optimizer:
      // verify how the output of the optimizer is stored in DB:
      expect(updatedRequest.risk_calc_result).toHaveProperty("latestOffer") 
      expect(updatedRequest.risk_calc_result.latestOffer.amount).toBe(amount)
    })
      
      // test.skip("the borrower can see the parameters of the offer in their dashboard", async () => {
      //   const dashboard = await client.getBorrowerDashboardInfo(borrower1.id)
      //   expect(dashboard.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)
      //   expect(dashboard.principal).toBe(amount)
      // })
    })
    
    // describe("Approving a loan offer...", () => {
      
    //   test("triggers creation of payables, receivables", async () => {
    //     const res = await client.acceptLoanOffer(request.request_id, "latestOffer")
    //     // expect(res.update_loan_requests_by_pk.status).toBe(LoanRequestStatus.live)
    //     // TODO verify payables, encumbrances, receivables, ....
    //   })
      
    //   test("the users balances are updated accordingly", async () => {
    //     // const res = await client.updateBalancesAndCorpusShares()
    //     // console.log(res)
    //   })
      
    //   test("The borrower user can see their repayment plan in the frontend", async () => {
    //     const dashboard = await client.getBorrowerDashboardInfo(borrower1.id)
    //     expect(dashboard.amountRepaid).toBe(0)
    //     expect(dashboard.loanAmount).toBe(amount)
    //     expect(dashboard.outstanding.total).toBeGreaterThan(amount)
    //   })
      
    //   test.skip("Both lender and borrrower see the loan appearing in their loan history", async () => { })
      
    //   test("The lender sees an updated breakdown of their portfolio ", async () => { 
    //     const dashboard = await client.getLenderDashboadInfo(lender1.id)
    //     expect(dashboard.invested).toBeGreaterThan(0)
    //     expect(dashboard.interest.expected).toBeGreaterThan(dashboard.invested)
    //     console.log('dash', dashboard)
    //     // expect(dashboard.idle).toBeLessThan(lender1.balance) // TODO 
    //     // TODO check receivable
    //   })
    // })
})
