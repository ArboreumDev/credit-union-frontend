import request, { GraphQLClient } from "graphql-request"
import { Sdk, getSdk } from "../../src/gql/sdk"
import { initializeGQL } from "../../src/gql/graphql_client"
import { DbClient } from "../../src/gql/db_client"
import {
  EDGE_STATUS,
  LoanRequestStatus,
  SupporterStatus,
} from "../../src/lib/types"
import {
  BASIC_NETWORK,
  LENDER1,
  LENDER2,
  BORROWER1,
  SUPPORTER1,
  SUPPORTER2,
} from "../fixtures/basic_network"
import { addNetwork } from "../../src/lib/network_helpers"
import { addAndConfirmSupporter } from "../../src/lib/loan_helpers"
import { User_Insert_Input } from "../../src/gql/sdk"
import { getUserPortfolio } from "./test_helpers"
import { DEV_URL } from "../../src/lib/constant"
import lender from "../../src/components/dashboard/lender"
import { lastDayOfDecade } from "date-fns"
import { MIN_SUPPORT_RATIO } from "../../src/lib/constant"

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
  await sdk.ResetDB()
})

describe("Basic loan request flow for an accepted loan", () => {
  let dbClient: DbClient
  const amount = 100
  const pledgeAmount = amount * MIN_SUPPORT_RATIO
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
    test("A loan request with is created and the swarmai responds with an offer", async () => {
      const { request } = await dbClient.createLoanRequest(
        borrower1.id,
        amount,
        purpose
      )
      // const request = data.update_loan_requests_by_pk
      request_id = request.request_id
      expect(request.amount).toBe(amount)
      expect(request.purpose).toBe(purpose)
      expect(request.status).toBe(LoanRequestStatus.initiated)
      expect(request.risk_calc_result.latestOffer).toBeUndefined
    })

    test("the swarmai module can respond to loan requests", async () => {
      const url = DEV_URL + "/loan/request"
      const payload = await dbClient.getSwarmAiInput(request_id)
      const res = await dbClient.callSwarmAI(url, { request_msg: payload })
      expect(res.loan_request_info.request_id).toBe(request_id)
      expect(res).toHaveProperty("corpus_share")
      expect(res).toHaveProperty("loan_info.borrower_apr")
    })

    test("When a supporter confirms and the total support amount is below 20%, no loan offer is made", async () => {
      await sdk.CreateUser({ user: SUPPORTER1 })
      await addAndConfirmSupporter(
        dbClient,
        request_id,
        SUPPORTER1.id,
        pledgeAmount / 2
      )

      const { loanRequest } = await sdk.GetLoanRequest({
        requestId: request_id,
      })
      expect(loanRequest.risk_calc_result.latestOffer).toBeUndefined
    })

    test("Any pledge that brings support above 20%, triggers a loan offer and advances the loan state", async () => {
      await sdk.CreateUser({ user: SUPPORTER2 })
      await addAndConfirmSupporter(
        dbClient,
        request_id,
        SUPPORTER2.id,
        pledgeAmount / 2
      )

      const { loanRequest } = await sdk.GetLoanRequest({
        requestId: request_id,
      })

      // The AI has collected the input and stores possible terms of the loan in the db
      expect(loanRequest.status).toBe(
        LoanRequestStatus.awaiting_borrower_confirmation
      )

      // verify how the output of the optimizer is stored in DB:
      expect(loanRequest.risk_calc_result).toHaveProperty("latestOffer")
      expect(loanRequest.risk_calc_result.latestOffer.loan_info.amount).toBe(
        amount
      )
    })
  })

  describe("When the borrower accepts a loan offer...", () => {
    test("triggers creation of payables, receivables", async () => {
      const data = await dbClient.acceptLoanOffer(request_id, "latestOffer")
      expect(data.update_loan_requests_by_pk.status).toBe(
        LoanRequestStatus.active
      )

      // payable should make sense
      expect(data.insert_payables_one.amount_total).toBeGreaterThan(amount)
      expect(data.insert_payables_one.amount_paid).toBe(0)

      // receivable should match payable
      expect(data.insert_receivables_one.amount_total).toBe(
        data.insert_payables_one.amount_total
      )
      expect(data.insert_receivables_one.amount_received).toBe(
        data.insert_payables_one.amount_paid
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

      expect(SUPPORTER1.balance).toBeGreaterThan(
        balancesAfter[SUPPORTER1.id].cash
      )
    })

    // skipped until we have properly dealt with how exiting loans are stored
    test.skip("the loan shows up in subsequent queries to the corpus Data", async () => {
      const { optimizer_context } = await dbClient.getSwarmAiInput(request_id)
      expect(
        optimizer_context.loans_in_corpus
          .map((x) => x.loanId)
          .includes(request_id)
      ).toBeTruthy
    })
  })
})
