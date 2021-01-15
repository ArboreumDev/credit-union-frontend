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
let loan: LoanInfo

const assert_no_outstanding_earnings = (roi: RoI) => {
  // verify there is no expected earnings
  expect(roi.total_apr.interest.remain).toBe(0)
  expect(roi.total_apr.principal.remain).toBe(0)
  expect(roi.total_apr.apr).toBe(0)

  expect(roi.apr_on_loans.sum.interest.remain).toBe(0)
  expect(roi.apr_on_loans.sum.principal.remain).toBe(0)

  // but some has been paid
  expect(roi.total_apr.interest.paid).toBeGreaterThan(0)
  expect(roi.total_apr.principal.paid).toBeGreaterThan(0)
}
const assert_outstanding_earnings = (roi: RoI) => {
  // verify there is expected earnings
  expect(roi.total_apr.interest.remain).toBeGreaterThan(0)
  expect(roi.total_apr.principal.remain).toBeGreaterThan(0)
  expect(roi.total_apr.apr).toBeGreaterThan(0)

  expect(roi.apr_on_loans.sum.interest.remain).toBeGreaterThan(0)
  expect(roi.apr_on_loans.sum.principal.remain).toBeGreaterThan(0)
}

const do_x_exact_repayments = async (loan: LoanInfo, x: number) => {
  let ideal_repayment = loan.schedule.next_borrower_payment
  let updated_request
  const b_id = loan.terms.borrower_info.borrower_id
  while (x > 0) {
    await sdk.ChangeUserCashBalance({
      userId: b_id,
      delta: ideal_repayment,
    })
    updated_request = await dbClient.make_repayment(requestId, ideal_repayment)
    ideal_repayment = updated_request.loan.schedule.next_borrower_payment
    loan = updated_request.loan
    x--
  }
  return updated_request
}

describe("Repayments", () => {
  beforeEach(async () => {
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

    await addAndConfirmSupporter(
      dbClient,
      requestId,
      SUPPORTER2.id,
      amount * MIN_SUPPORT_RATIO
    )
    const allUsers = await dbClient.allUsers
    balancesBefore = getUserPortfolio(allUsers)
    await dbClient.acceptLoanOffer(requestId, "latestOffer")
    const data = await sdk.GetLoanRequest({ requestId })
    expect(data.loanRequest.status).toBe(LoanRequestStatus.active)
    loan = data.loanRequest.loan
  })

  afterEach(async () => {
    await sdk.ResetDB()
  })

  test("exact repayment in installments shows loan status settled", async () => {
    const ideal_repayment = loan.schedule.next_borrower_payment
    const updated_request = await do_x_exact_repayments(loan, loan.terms.tenor)

    const user = await dbClient.getUserByEmail(LENDER1.email)
    assert_no_outstanding_earnings(user.roi)
    expect(updated_request.status).toBe(LoanRequestStatus.settled)
  })

  test("partial default in last installment shows status as default", async () => {
    let updated_request = await do_x_exact_repayments(
      loan,
      loan.terms.tenor - 1
    )
    const partial_payment =
      updated_request.loan.schedule.next_borrower_payment / 2
    updated_request = await dbClient.make_repayment(
      loan.request_id,
      partial_payment
    )

    expect(updated_request.status).toBe(LoanRequestStatus.default)

    const user = await dbClient.getUserByEmail(LENDER1.email)
    assert_outstanding_earnings(user.roi)
  })

  test("early exact repayment settles loan", async () => {
    const full_repayment = loan.schedule.borrower_view.total_payments.remain
    const updated_request = await dbClient.make_repayment(
      loan.request_id,
      full_repayment
    )
    expect(updated_request.status).toBe(LoanRequestStatus.settled)
  })
})
