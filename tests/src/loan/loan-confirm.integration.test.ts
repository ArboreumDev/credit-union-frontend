import borrower from "components/dashboard/borrower"
import request from "graphql-request"
import { MIN_SUPPORT_RATIO } from "lib/constant"
import { LoanRequestStatus, RoI, CalculatedRisk, LoanInfo } from "lib/types"
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
  const { loanRequest } = await dbClient.createLoanRequest(
    BORROWER1.id,
    amount,
    purpose
  )
  requestId = loanRequest.request_id

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

describe.skip("Loan Request Flow: confirm loan offer", () => {
  test("sets loans status to live/active", async () => {
    const data = await dbClient.acceptLoanOffer(requestId, "latestOffer")

    // loan request status should be active
    expect(data.update_loan_requests_by_pk.status).toBe(
      LoanRequestStatus.active
    )
  })

  test.skip("The borrower user can see their repayment plan in the frontend", async () => {
    const user = await dbClient.getUserByEmail(BORROWER1.email)
    const loanRequest = user.loan_requests[0]
  })

  test("The lender sees an updated breakdown of their portfolio ", async () => {
    const user = await dbClient.getUserByEmail(LENDER1.email)
    const loanRequest = user.loan_requests[0]
    const roi = user.roi as RoI

    // verify there is expected earnings
    expect(roi.total_apr.interest.remain).toBeGreaterThan(0)
    expect(roi.total_apr.principal.remain).toBeGreaterThan(0)
    expect(roi.total_apr.apr).toBeGreaterThan(0)

    expect(roi.apr_on_loans.sum.interest.remain).toBeGreaterThan(0)
    expect(roi.apr_on_loans.sum.principal.remain).toBeGreaterThan(0)

    // but no actual ones
    expect(roi.total_apr.interest.paid).toBe(0)
    expect(roi.total_apr.principal.paid).toBe(0)
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
    expect(supporter.pledges.map((l) => l.request_id)).toContain(requestId)

    // verify their terms differ
    const lenderEntry = lender.active_loans.filter(
      (l) => l.loan_id == requestId
    )[0]
    const supporterEntry = supporter.pledges.filter(
      (l) => l.request_id == requestId
    )[0]

    // verify that amount is correct
    expect(supporterEntry.pledge_amount).toBe(
      supporter.pledges.filter((p) => p.request_id == requestId)[0]
        .pledge_amount
    )
  })

  test("lenders and supporters see nonzero apr and expected returns", async () => {
    const lender = await dbClient.getUserByEmail(LENDER1.email)
    const lenderRoi = lender.roi as RoI
    expect(lenderRoi.total_apr.apr).toBeGreaterThan(0)
    expect(lenderRoi.total_apr.interest.remain).toBeGreaterThan(0)
    expect(lenderRoi.total_apr.interest.paid).toBe(0)

    const supporter = await dbClient.getUserByEmail(SUPPORTER2.email)
    const supporterRoI = supporter.roi as RoI
    expect(supporterRoI.total_apr.apr).toBeGreaterThan(0)
  })

  // describe("When the borrower makes a repayment", () => {
  test("Make first repayment", async () => {
    const data = await sdk.GetLoanRequest({ requestId })
    const ideal_repayment = data.loanRequest.loan.schedule.next_borrower_payment
    await sdk.ChangeUserCashBalance({
      userId: BORROWER1.id,
      delta: ideal_repayment,
    })
    const allUsers = await dbClient.allUsers
    balancesBefore = getUserPortfolio(allUsers)

    const updated_request = await dbClient.make_repayment(
      requestId,
      ideal_repayment
    )

    const allUsersAfter = await dbClient.allUsers
    const balancesAfter = getUserPortfolio(allUsersAfter)
    // lender should increase
    expect(balancesBefore[LENDER1.id].cash).toBeLessThan(
      balancesAfter[LENDER1.id].cash
    )
    // borrower should decrease
    expect(balancesBefore[BORROWER1.id].cash).toBeGreaterThan(
      balancesAfter[BORROWER1.id].cash
    )
    // supporter should stay same (first payment withheld)
    expect(balancesBefore[SUPPORTER2.id].cash).toBe(
      balancesAfter[SUPPORTER2.id].cash
    )
    // should be stored on loan
    expect(updated_request.balance).toBeGreaterThan(0)

    // verify that dbClient returns updated loan
    expect(
      updated_request.loan.schedule.borrower_view["total_payments"]["remain"]
    ).toBeLessThan(amount)
    expect(updated_request.loan["state"]["repayments"]).toStrictEqual([
      ideal_repayment,
    ])

    // verify the DB is updated accordingly
    const { loanRequest } = await dbClient.sdk.GetLoanRequest({ requestId })
    const loan = loanRequest.loan as LoanInfo
    expect(loan.state.repayments).toStrictEqual([ideal_repayment])

    // verify there is some interest shown as earned and some as outstanding
    const lender = await dbClient.getUserByEmail(LENDER1.email)
    const roi = lender.roi as RoI
    expect(roi.total_apr.interest.paid).toBeGreaterThan(0)
    expect(roi.total_apr.interest.remain).toBeGreaterThan(0)
  })

  test("make second repayment", async () => {
    const data = await sdk.GetLoanRequest({ requestId })
    const ideal_repayment = data.loanRequest.loan.schedule.next_borrower_payment // ['schedule']['next_borrower_payment']

    const allUsers = await dbClient.allUsers
    balancesBefore = getUserPortfolio(allUsers)

    const updated_request = await dbClient.make_repayment(
      requestId,
      ideal_repayment
    )
    const allUsersAfter = await dbClient.allUsers
    const balancesAfter = getUserPortfolio(allUsersAfter)
    // now supporter balance increases too
    expect(balancesBefore[SUPPORTER2.id].cash).toBeLessThan(
      balancesAfter[SUPPORTER2.id].cash
    )
    // escrow is again nonzero, as second payment is now being withheld
    expect(updated_request.balance).toBeGreaterThan(0)
  }, 10000)

  test("make full repayment", async () => {
    const data = await sdk.GetLoanRequest({ requestId })
    let loan = data.loanRequest.loan
    const ideal_repayment = loan.schedule.full_single_repay
    await sdk.ChangeUserCashBalance({
      userId: BORROWER1.id,
      delta: ideal_repayment,
    })
    const updated_request = await dbClient.make_repayment(
      requestId,
      ideal_repayment
    )
    loan = updated_request.loan
    // console.log(updated_request)
    expect(updated_request.status).toBe(LoanRequestStatus.settled)
  }, 10000)

  test.skip("make defaulting repayments", async () => {
    // # TODO make a new loan
    // will only work correctly once swarmai-pr to reduce shares is merged
    const data = await sdk.GetLoanRequest({ requestId })
    let loan = data.loanRequest.loan
    let ideal_repayment = loan.schedule.next_borrower_payment
    let updated_request
    while (loan.state.repayments.length < loan.terms.tenor) {
      await sdk.ChangeUserCashBalance({
        userId: BORROWER1.id,
        delta: ideal_repayment,
      })
      updated_request = await dbClient.make_repayment(
        requestId,
        ideal_repayment / 2
      )
      ideal_repayment = updated_request.loan.schedule.next_borrower_payment
      loan = updated_request.loan
    }
    console.log(updated_request)
    console.log(updated_request.loan.state.repayments)
    console.log(updated_request.loan.schedule.borrower_view)
    expect(updated_request.status).toBe(LoanRequestStatus.settled)
  })

  // test.skip(
  //   "all users see transactions related to the repayment in their transactionlist"
  // )
})
