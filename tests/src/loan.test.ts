import request, { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { DbClient } from "../../src/gql/db_client"
import {
  EDGE_STATUS,
  LoanRequestStatus,
  SupporterStatus,
} from "../../src/utils/types"
import {
  BASIC_NETWORK,
  LENDER1,
  LENDER2,
  BORROWER1,
  SUPPORTER1,
} from "../fixtures/basic_network"
import { addNetwork } from "../../src/utils/network_helpers"
import { addAndConfirmSupporter } from "../../src/utils/loan_helpers"
import { User_Insert_Input } from "../../src/gql/sdk"
import { getUserPortfolio } from "./test_helpers"
import lender from "../../src/components/dashboard/lender"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  sdk = getSdk(client)
  // reset
  await sdk.ResetDB()
})

afterAll(async () => {
  // reset
  // await sdk.ResetDB()
})

describe("Basic loan request flow for an accepted loan", () => {
  let dbClient: DbClient
  const amount = 100
  const pledgeAmount = amount / 2
  const purpose = "go see the movies"
  let request_id: string
  // var testOutput;
  const borrower1: User_Insert_Input = BORROWER1
  const lender1: User_Insert_Input = LENDER1
  const lender2: User_Insert_Input = LENDER2
  let balancesBefore
  let balancesAfter

  beforeAll(async () => {
    // connect the client that manages user interactions to the test-DB
    dbClient = new DbClient(client)

    // add a basic network from a fixture and initialize pointers to
    // an exisiting borrower and two lenders
    await addNetwork(sdk, BASIC_NETWORK)
    const { user } = await sdk.GetAllUsers()
    balancesBefore = getUserPortfolio(user)
  })

  describe("A borrower user requests a loan...", () => {
    test("A loan request with status 'initiated' is created", async () => {
      const { request } = await dbClient.createLoanRequest(
        borrower1.id,
        amount,
        purpose
      )
      request_id = request.request_id
      expect(request.amount).toBe(amount)
      expect(request.purpose).toBe(purpose)
      expect(request.status).toBe(LoanRequestStatus.initiated)
    })

    test("The AI collects the input and stores and provides possible terms of the loan", async () => {
      // lets add and confirm a supporter so that the loan is more interesting
      await sdk.CreateUser({ user: SUPPORTER1 })
      await addAndConfirmSupporter(sdk, request_id, SUPPORTER1.id, pledgeAmount)
      // upon certain conditions that are currently skipped for this initial version (e.g. when guarantors have confirmed)
      // we trigger the calculation of a loan offer. The flow is as follows:
      // - collecting inputs for the swarm-ai (risk-info, loan-amount, network-state...)
      // - formatting it such that the optimzer can use it and dropping it to the AWS-S3 bucket
      // - the bucket then calls back into our backend and stores the offer-parameters (interest, guarantor-breakdown,...)
      //    as a json on the loan_request entry (currently the call to the AI-container is mocked though)
      // - the loan-request status is updated to signal the borrower that they have a loan offer
      const { updatedRequest } = await dbClient.calculateLoanRequestOffer(
        request_id
      )
      expect(updatedRequest.status).toBe(
        LoanRequestStatus.awaiting_borrower_confirmation
      )

      // verify how the output of the optimizer is stored in DB:
      expect(updatedRequest.risk_calc_result).toHaveProperty("latestOffer")
      expect(updatedRequest.risk_calc_result.latestOffer.amount).toBe(amount)
    })
  })
  describe("When the borrower accepts a loan offer...", () => {
    test("triggers creation of payables, receivables", async () => {
      const { startedLoan } = await dbClient.acceptLoanOffer(
        request_id,
        "latestOffer"
      )
      expect(startedLoan.update_loan_requests_by_pk.status).toBe(
        LoanRequestStatus.live
      )

      // payable should make sense
      expect(startedLoan.insert_payables_one.amount_total).toBeGreaterThan(
        amount
      )
      expect(startedLoan.insert_payables_one.amount_paid).toBe(0)

      // receivable should match payable
      expect(startedLoan.insert_receivables_one.amount_total).toBe(
        startedLoan.insert_payables_one.amount_total
      )
      expect(startedLoan.insert_receivables_one.amount_received).toBe(
        startedLoan.insert_payables_one.amount_paid
      )
    })

    test("The borrower user can see their repayment plan in the frontend", async () => {
      const user = await dbClient.getUserByEmail(borrower1.email)
      const loanRequest = user.loan_requests[0]
      // TODO check lr payables
    })

    test("The lender sees an updated breakdown of their portfolio ", async () => {
      const user = await dbClient.getUserByEmail(lender1.email)
      const loanRequest = user.loan_requests[0]
    })

    test("the users balances are updated accordingly", async () => {
      const { user } = await sdk.GetAllUsers()
      balancesAfter = getUserPortfolio(user)

      // sanity-check that lender 2 has brought more than lender 1
      expect(lender1.balance).toBeGreaterThan(lender2.balance)

      // verify balances have been reduced
      expect(balancesBefore[lender1.id].cash).toBeGreaterThan(
        balancesAfter[lender1.id].cash
      )
      expect(balancesBefore[lender2.id].cash).toBeGreaterThan(
        balancesAfter[lender2.id].cash
      )

      // verify lender 1 has received a bigger share than lender 2, as they brought more cash
      expect(balancesAfter[lender1.id].share).toBeGreaterThan(
        balancesAfter[lender2.id].share
      )

      // verify that more cash has been taken from lender 1 than from lender 2
      const diffLender1 =
        balancesBefore[lender1.id].cash - balancesAfter[lender1.id].cash
      const diffLender2 =
        balancesBefore[lender2.id].cash - balancesAfter[lender2.id].cash
      expect(diffLender1).toBeGreaterThan(diffLender2)
    })

    test("the loan shows up in subsequent queries to the corpus Data", async () => {
      const input = await dbClient.getOptimizerInput(request_id)
      console.log(input)
      expect(input.corpus.map((x) => x.loanId).includes(request_id)).toBeTruthy
    })
  })
})
