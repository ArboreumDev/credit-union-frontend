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

  test.skip("partial default in last installment shows status as default", async () => {
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
    console.log(updated_request.loan.schedule)
    // console.log(updated_request.loan.state.repayments)

    expect(updated_request.status).toBe(LoanRequestStatus.default)

    const user = await dbClient.getUserByEmail(LENDER1.email)
    assert_outstanding_earnings(user.roi)
  })

  test.skip("early exact repayment settles loan", async () => {
    //   full_repayment = loan.schedule.full_one_time_repayment
    const full_repayment = loan.schedule.borrower_view.total_payments.remain
    const updated_request = await dbClient.make_repayment(
      loan.request_id,
      full_repayment
    )
    expect(updated_request.status).toBe(LoanRequestStatus.settled)
  })
})

//   test.skip("the users balances are updated accordingly", async () => {
//     const allUsers = await dbClient.allUsers
//     const balancesAfter = getUserPortfolio(allUsers)

//     // sanity-check that lender 2 has brought more than lender 1
//     expect(LENDER1.balance).toBeGreaterThan(LENDER2.balance)

//     // verify balances have been reduced
//     expect(balancesBefore[LENDER1.id].cash).toBeGreaterThan(
//       balancesAfter[LENDER1.id].cash
//     )
//     expect(balancesBefore[LENDER2.id].cash).toBeGreaterThan(
//       balancesAfter[LENDER2.id].cash
//     )
//     // verify lender 1 has received a bigger share than lender 2, as they brought more cash
//     expect(balancesAfter[LENDER1.id].share).toBeGreaterThan(
//       balancesAfter[LENDER2.id].share
//     )

//     // verify that more cash has been taken from lender 1 than from lender 2
//     const diffLender1 =
//       balancesBefore[LENDER1.id].cash - balancesAfter[LENDER1.id].cash
//     const diffLender2 =
//       balancesBefore[LENDER2.id].cash - balancesAfter[LENDER2.id].cash
//     expect(diffLender1).toBeGreaterThan(diffLender2)

//     expect(SUPPORTER2.balance).toBeGreaterThan(
//       balancesAfter[SUPPORTER2.id].cash
//     )
//   })

//   // skipped until we have properly dealt with how exiting loans are stored
//   test.skip("lenders and supporters see nonzero apr and expected returns", async () => {
//     const lender = await dbClient.getUserByEmail(LENDER1.email)
//     const lenderRoi = lender.roi as RoI
//     expect(lenderRoi.total_apr.apr).toBeGreaterThan(0)
//     expect(lenderRoi.total_apr.interest.remain).toBeGreaterThan(0)
//     expect(lenderRoi.total_apr.interest.paid).toBe(0)

//     const supporter = await dbClient.getUserByEmail(SUPPORTER2.email)
//     const supporterRoI = supporter.roi as RoI
//     expect(supporterRoI.total_apr.apr).toBeGreaterThan(0)
//   })

//   // describe("When the borrower makes a repayment", () => {
//   test.skip("Make first repayment", async () => {
//     const data = await sdk.GetLoanRequest({ requestId })
//     const ideal_repayment = data.loanRequest.loan.schedule.next_borrower_payment
//     await sdk.ChangeUserCashBalance({
//       userId: BORROWER1.id,
//       delta: ideal_repayment,
//     })
//     const allUsers = await dbClient.allUsers
//     balancesBefore = getUserPortfolio(allUsers)

//     const updated_request = await dbClient.make_repayment(
//       requestId,
//       ideal_repayment
//     )

//     const allUsersAfter = await dbClient.allUsers
//     const balancesAfter = getUserPortfolio(allUsersAfter)
//     // lender should increase
//     expect(balancesBefore[LENDER1.id].cash).toBeLessThan(
//       balancesAfter[LENDER1.id].cash
//     )
//     // borrower should decrease
//     expect(balancesBefore[BORROWER1.id].cash).toBeGreaterThan(
//       balancesAfter[BORROWER1.id].cash
//     )
//     // supporter should stay same (first payment withheld)
//     expect(balancesBefore[SUPPORTER2.id].cash).toBe(
//       balancesAfter[SUPPORTER2.id].cash
//     )
//     // should be stored on loan
//     expect(updated_request.balance).toBeGreaterThan(0)

//     // verify that dbClient returns updated loan
//     expect(
//       updated_request.loan.schedule.borrower_view["total_payments"]["remain"]
//     ).toBeLessThan(amount)
//     expect(updated_request.loan["state"]["repayments"]).toStrictEqual([
//       ideal_repayment,
//     ])

//     // verify the DB is updated accordingly
//     const { loanRequest } = await dbClient.sdk.GetLoanRequest({ requestId })
//     const loan = loanRequest.loan as LoanInfo
//     expect(loan.state.repayments).toStrictEqual([ideal_repayment])

//     // verify there is some interest shown as earned and some as outstanding
//     const lender = await dbClient.getUserByEmail(LENDER1.email)
//     const roi = lender.roi as RoI
//     expect(roi.total_apr.interest.paid).toBeGreaterThan(0)
//     expect(roi.total_apr.interest.remain).toBeGreaterThan(0)
//   })

//   test.skip("make second repayment", async () => {
//     const data = await sdk.GetLoanRequest({ requestId })
//     const ideal_repayment = data.loanRequest.loan.schedule.next_borrower_payment // ['schedule']['next_borrower_payment']

//     const allUsers = await dbClient.allUsers
//     balancesBefore = getUserPortfolio(allUsers)

//     const updated_request = await dbClient.make_repayment(
//       requestId,
//       ideal_repayment
//     )
//     const allUsersAfter = await dbClient.allUsers
//     const balancesAfter = getUserPortfolio(allUsersAfter)
//     // now supporter balance increases too
//     expect(balancesBefore[SUPPORTER2.id].cash).toBeLessThan(
//       balancesAfter[SUPPORTER2.id].cash
//     )
//     // escrow is again nonzero, as second payment is now being withheld
//     expect(updated_request.balance).toBeGreaterThan(0)
//   })

//   test.skip("make full repayment", async () => {
//     const data = await sdk.GetLoanRequest({ requestId })
//     let loan = data.loanRequest.loan
//     let ideal_repayment = loan.schedule.next_borrower_payment
//     let updated_request
//     while (loan.state.repayments.length < loan.terms.tenor) {
//       await sdk.ChangeUserCashBalance({
//         userId: BORROWER1.id,
//         delta: ideal_repayment,
//       })
//       updated_request = await dbClient.make_repayment(
//         requestId,
//         ideal_repayment
//       )
//       ideal_repayment = updated_request.loan.schedule.next_borrower_payment
//       loan = updated_request.loan
//     }
//     expect(updated_request.status).toBe(LoanRequestStatus.settled)
//   })

//   test.skip("make defaulting repayments", async () => {
//     // # TODO make a new loan
//     // will only work correctly once swarmai-pr to reduce shares is merged
//     const data = await sdk.GetLoanRequest({ requestId })
//     let loan = data.loanRequest.loan
//     let ideal_repayment = loan.schedule.next_borrower_payment
//     let updated_request
//     while (loan.state.repayments.length < loan.terms.tenor) {
//       await sdk.ChangeUserCashBalance({
//         userId: BORROWER1.id,
//         delta: ideal_repayment,
//       })
//       updated_request = await dbClient.make_repayment(
//         requestId,
//         ideal_repayment / 2
//       )
//       ideal_repayment = updated_request.loan.schedule.next_borrower_payment
//       loan = updated_request.loan
//     }
//     console.log(updated_request)
//     console.log(updated_request.loan.state.repayments)
//     console.log(updated_request.loan.schedule.borrower_view)
//     expect(updated_request.status).toBe(LoanRequestStatus.settled)
//   })

//   // test.skip(
//   //   "all users see transactions related to the repayment in their transactionlist"
//   // )
// // })
