import { User_Insert_Input } from "../../src/gql/sdk"
import { MIN_SUPPORT_RATIO } from "../../src/lib/constant"
import { addNetwork } from "../../src/lib/network_helpers"
import { LoanRequestStatus } from "../../src/lib/types"
import {
  BASIC_NETWORK,
  BORROWER1,
  LENDER1,
  LENDER2,
  SUPPORTER1,
  SUPPORTER2,
} from "../fixtures/basic_network"
import { dbClient, sdk } from "./common/utils"
import { addAndConfirmSupporter, getUserPortfolio } from "./test_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Basic loan request flow for an accepted loan", () => {
  const amount = 100
  const pledgeAmount = amount * MIN_SUPPORT_RATIO
  const purpose = "go see the movies"
  let requestId: string
  // var testOutput;
  const borrower1: User_Insert_Input = BORROWER1
  const lender1: User_Insert_Input = LENDER1
  const lender2: User_Insert_Input = LENDER2
  let balancesBefore
  let balancesAfter

  beforeAll(async () => {
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
      requestId = request.request_id
      expect(request.amount).toBe(amount)
      expect(request.purpose).toBe(purpose)
      expect(request.status).toBe(LoanRequestStatus.initiated)
      expect(request.risk_calc_result.latestOffer).toBeUndefined
    })

    test("the swarmai module can respond to loan requests", async () => {
      const res = await dbClient.calculateLoanRequestOffer(requestId)
      expect(res.loan_request_info.request_id).toBe(requestId)
      expect(res).toHaveProperty("corpus_share")
      expect(res.corpus_share).toBe(1)
      expect(res).toHaveProperty("loan_info.borrower_apr")
    })

    test("When a supporter confirms and the total support amount is below 20%, no loan offer is made", async () => {
      await sdk.CreateUser({ user: SUPPORTER1 })
      await addAndConfirmSupporter(
        sdk,
        dbClient,
        requestId,
        SUPPORTER1.id,
        pledgeAmount / 2
      )
      const { loanRequest } = await sdk.GetLoanRequest({
        requestId: requestId,
      })
      expect(loanRequest.risk_calc_result.latestOffer).toBeUndefined
    })

    test("Any pledge that brings support above 20%, triggers a loan offer and advances the loan state", async () => {
      await sdk.CreateUser({ user: SUPPORTER2 })
      await addAndConfirmSupporter(
        sdk,
        dbClient,
        requestId,
        SUPPORTER2.id,
        pledgeAmount / 2
      )
      const { loanRequest } = await sdk.GetLoanRequest({
        requestId: requestId,
      })

      // The AI has collected the input and stores possible terms of the loan in the db
      expect(loanRequest.status).toBe(
        LoanRequestStatus.awaiting_borrower_confirmation
      )

      // verify how the output of the optimizer is stored in DB:
      expect(loanRequest.risk_calc_result).toHaveProperty("latestOffer")
      const loanOffer = loanRequest.risk_calc_result.latestOffer
      expect(loanOffer.loan_info.amount).toBe(amount)
      expect(loanOffer.corpus_share).toBe(1 - MIN_SUPPORT_RATIO)
      expect(loanOffer.loan_info.supporter_share).toBe(MIN_SUPPORT_RATIO)
    })
  })

  describe("When the borrower accepts a loan offer...", () => {
    test("triggers creation of payables, receivables", async () => {
      const data = await dbClient.acceptLoanOffer(requestId, "latestOffer")
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
      const { user: allUsers } = await sdk.GetAllUsers()
      balancesAfter = getUserPortfolio(allUsers)

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
      // const { optimizer_context } = await dbClient.getSwarmAiInput(requestId)
      // expect(
      //   optimizer_context.loans_in_corpus
      //     .map((x) => x.loanId)
      //     .includes(requestId)
      // ).toBeTruthy
    })
  })
  describe("When the borrower makes a repayment", () => {
    test.skip("balances of borrower is decreased and  supporter/lender balance is increased", async () => {
      const { user: allUsers } = await sdk.GetAllUsers()
      balancesBefore = getUserPortfolio(allUsers)

      const repayment = 1000
      await dbClient.make_repayment(requestId, repayment)

      balancesAfter = getUserPortfolio(allUsers)
      expect(balancesBefore[lender1.id]).toBeGreaterThan(
        balancesAfter[lender1.id]
      )
      expect(balancesBefore[SUPPORTER1.id]).toBeGreaterThan(
        balancesAfter[SUPPORTER1.id]
      )
      expect(balancesBefore[borrower1.id]).toBeLessThan(
        balancesAfter[borrower1.id]
      )
    })

    // test.skip(
    //   "all users see transactions related to the repayment in their transactionlist"
    // )
  })
})
