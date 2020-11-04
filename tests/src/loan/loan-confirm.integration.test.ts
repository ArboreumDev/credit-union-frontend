import borrower from "components/dashboard/borrower"
import request from "graphql-request"
import { MIN_SUPPORT_RATIO } from "lib/constant"
import { LoanRequestStatus, CalculatedRisk, LoanInfo } from "lib/types"
import {
  BORROWER1,
  LENDER1,
  LENDER2,
  SUPPORTER1,
  SUPPORTER2,
} from "../../fixtures/basic_network"
import {
  addAndConfirmSupporter,
  getUserPortfolio,
} from "../common/test_helpers"
import { dbClient, sdk } from "../common/utils"

const amount = 100
const purpose = "go see the movies"
let requestId: string
let balancesBefore

beforeAll(async () => {
  // Add users
  await sdk.ResetDB()
  await sdk.CreateUser({ user: BORROWER1 })
  await sdk.CreateUser({ user: LENDER1 })
  await sdk.CreateUser({ user: LENDER2 })
  await sdk.CreateUser({ user: SUPPORTER2 })

  // Create loan request
  const { request } = await dbClient.createLoanRequest(
    BORROWER1.id,
    amount,
    purpose
  )
  requestId = request.request_id

  // confirm supporter and trigger the loan offer generation
  await addAndConfirmSupporter(
    dbClient,
    requestId,
    SUPPORTER2.id,
    amount * MIN_SUPPORT_RATIO
  )
  const allUsers = await dbClient.allUsers
  balancesBefore = getUserPortfolio(allUsers)
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("Loan Request Flow: confirm loan offer", () => {
  test("triggers creation of payables, receivables", async () => {
    const data = await dbClient.acceptLoanOffer(requestId, "latestOffer")

    // loan request status should be active
    expect(data.update_loan_requests_by_pk.status).toBe(
      LoanRequestStatus.active
    )

    // payable should make sense
    expect(data.insert_payables_one.amount_total).toBeGreaterThan(amount)
    expect(data.insert_payables_one.amount_paid).toBe(0)

    // receivable should match payable
    const totalRemainReceivable =
      data.corpus.amount_total + data.supporter.amount_total
    const totalReceivedOnReceivable =
      data.corpus.amount_received + data.supporter.amount_received

    expect(totalRemainReceivable).toBe(data.insert_payables_one.amount_total)
    expect(totalReceivedOnReceivable).toBe(data.insert_payables_one.amount_paid)
  })

  test.skip("The borrower user can see their repayment plan in the frontend", async () => {
    const user = await dbClient.getUserByEmail(BORROWER1.email)
    const loanRequest = user.loan_requests[0]
    // TODO check lr payables
  })

  test.skip("The lender sees an updated breakdown of their portfolio ", async () => {
    const user = await dbClient.getUserByEmail(LENDER1.email)
    const loanRequest = user.loan_requests[0]
  })

  test("the users balances are updated accordingly", async () => {
    const allUsers = await dbClient.allUsers
    const balancesAfter = getUserPortfolio(allUsers)

    // sanity-check that lender 2 has brought more than lender 1
    expect(LENDER1.balance).toBeGreaterThan(LENDER2.balance)

    // verify balances have been reduced
    expect(balancesBefore[LENDER1.id].cash).toBeGreaterThan(
      balancesAfter[LENDER1.id].cash
    )
    expect(balancesBefore[LENDER2.id].cash).toBeGreaterThan(
      balancesAfter[LENDER2.id].cash
    )

    // verify lender 1 has received a bigger share than lender 2, as they brought more cash
    expect(balancesAfter[LENDER1.id].share).toBeGreaterThan(
      balancesAfter[LENDER2.id].share
    )

    // verify that more cash has been taken from lender 1 than from lender 2
    const diffLender1 =
      balancesBefore[LENDER1.id].cash - balancesAfter[LENDER1.id].cash
    const diffLender2 =
      balancesBefore[LENDER2.id].cash - balancesAfter[LENDER2.id].cash
    expect(diffLender1).toBeGreaterThan(diffLender2)

    expect(SUPPORTER2.balance).toBeGreaterThan(
      balancesAfter[SUPPORTER2.id].cash
    )
  })

  // skipped until we have properly dealt with how exiting loans are stored
  test("the loan shows up in subsequent queries to the corpus Data", async () => {
    const system = await dbClient.getSystemSummary()
    expect(system.loans).toHaveProperty(requestId)
  })

  test("lenders and supporters are registered with the loan, their contributed amount and the apr", async () => {
    // verify both lender and supporter have an entry with the loan
    const lender = await dbClient.getUserByEmail(LENDER1.email)
    expect(lender.active_loans.map((l) => l.loan_id)).toContain(requestId)

    const supporter = await dbClient.getUserByEmail(SUPPORTER2.email)
    expect(supporter.active_loans.map((l) => l.loan_id)).toContain(requestId)
    console.log(supporter)
    console.log(lender.active_loans[0].loan_request.to_supporter)

    // verify their terms differ
    const lenderEntry = lender.active_loans.filter(
      (l) => l.loan_id == requestId
    )[0]
    const supporterEntry = supporter.active_loans.filter(
      (l) => l.loan_id == requestId
    )[0]
    expect(lenderEntry.percentage).not.toEqual(supporterEntry.percentage)

    // verify that amount is correct
    expect(supporterEntry.lender_amount).toBe(
      supporter.pledges.filter((p) => p.request_id == requestId)[0]
        .pledge_amount
    )
  })

  // describe("When the borrower makes a repayment", () => {
  test.skip("Make repayment", async () => {
    const repayment = 1000
    await sdk.ChangeUserCashBalance({ userId: BORROWER1.id, delta: repayment })
    const allUsers = await dbClient.allUsers
    balancesBefore = getUserPortfolio(allUsers)

    const request = await dbClient.make_repayment(requestId, repayment)

    const allUsersAfter = await dbClient.allUsers
    const balancesAfter = getUserPortfolio(allUsersAfter)
    expect(balancesBefore[LENDER1.id].cash).toBeLessThan(
      balancesAfter[LENDER1.id].cash
    )
    expect(balancesBefore[SUPPORTER2.id].cash).toBeLessThan(
      balancesAfter[SUPPORTER2.id].cash
    )
    expect(balancesBefore[BORROWER1.id].cash).toBeGreaterThan(
      balancesAfter[BORROWER1.id].cash
    )

    // verify that dbClient returns updated loan
    expect(
      request.loan.schedule.borrower_view["total_payments"]["remain"]
    ).toBeLessThan(amount)
    expect(request.loan["state"]["repayments"]).toStrictEqual([1000])

    // verify the DB is updated accordingly
    const { loanRequest } = await dbClient.sdk.GetLoanRequest({ requestId })
    const loan = loanRequest.loan as LoanInfo
    expect(loan.state.repayments).toStrictEqual([1000])
  })

  // test.skip(
  //   "all users see transactions related to the repayment in their transactionlist"
  // )
})
