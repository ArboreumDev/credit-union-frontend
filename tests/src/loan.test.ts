import { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { DbClient } from "../../src/gql/db_client"
import { EDGE_STATUS, LoanRequestStatus } from "../../src/utils/types"
import { BASIC_NETWORK} from "./fixtures"
import { addNetwork} from "../../src/utils/network_helpers"
import { User } from "../../src/gql/sdk"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk

beforeAll(async () => {
  client = initializeGQL(TEST_ADMIN_SECRET, TEST_API_URL)
  sdk = getSdk(client)
  // reset
  await sdk.ResetDB()
})

afterAll(async () => {
  // reset
  await sdk.ResetDB()
})

describe("Basic loan request flow for an accepted loan", () => {
  let dbClient: DbClient
  const amount = 100
  const purpose = "go see the movies"
  let request_id: string;
  // var testOutput;
  let borrower1: User;
  let lender1: User;
  let lender2: User;
  
  beforeAll(async () =>{
    // connect the client that manages user interactions to the test-DB
    dbClient = new DbClient(TEST_ADMIN_SECRET, TEST_API_URL)

    // add a basic network from a fixture and initialize pointers to
    // an exisiting borrower and two lenders
    let { addedUsers } = await addNetwork(sdk, BASIC_NETWORK)
    borrower1 = addedUsers.filter(x => x.user_type == "borrower")[0]
    const lenders = addedUsers.filter(x => x.user_type == "lender")
    lender1 = lenders[0]
    lender2 = lenders[1]
  })
    
  describe("A borrower user requests a loan...", () => {
    test("A loan request with status 'initiated' is created", async () =>{
      const {request} = await dbClient.createLoanRequest(borrower1.id, amount, purpose)
      request_id = request.request_id
      expect(request.amount).toBe(amount)
      expect(request.purpose).toBe(purpose)
      expect(request.status).toBe(LoanRequestStatus.initiated)
    })
    
    test("The AI collects the input and stores and provides possible terms of the loan", async () => {
      // upon certain conditions that are currently skipped for this initial version (e.g. when guarantors have confirmed)
      // we trigger the calculation of a loan offer. The flow is as follows:
      // - collecting inputs for the swarm-ai (risk-info, loan-amount, network-state...)
      // - formatting it such that the optimzer can use it and dropping it to the AWS-S3 bucket
      // - the bucket then calls back into our backend and stores the offer-parameters (interest, guarantor-breakdown,...)
      //    as a json on the loan_request entry (currently the call to the AI-container is mocked though)
      // - the loan-request status is updated to signal the borrower that they have a loan offer
      const { updatedRequest } = await dbClient.calculateLoanRequestOffer(request_id)
      expect(updatedRequest.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)
      
      // verify how the output of the optimizer is stored in DB:
      expect(updatedRequest.risk_calc_result).toHaveProperty("latestOffer") 
      expect(updatedRequest.risk_calc_result.latestOffer.amount).toBe(amount)
    })
      
      test("the borrower can see the parameters of the offer in their dashboard", async () => {
        const dashboard = await dbClient.getBorrowerDashboardInfo(borrower1.id)
        expect(dashboard.status).toBe(LoanRequestStatus.awaiting_borrower_confirmation)
        expect(dashboard.desired_principal).toBe(amount)
      })
    })
})
