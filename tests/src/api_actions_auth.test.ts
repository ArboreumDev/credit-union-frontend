import { notDeepEqual } from "assert"
import { CreateUserMutation } from "gql/sdk"
import {
  ACTION_ERRORS,
  CreateLoan,
  CreateUser,
  Withdraw,
  WithdrawPayload,
  runAction,
  SetBorrowerApproval,
} from "lib/gql_api_actions"
import {
  BORROWER1,
  LENDER1,
  SUPPORTER1,
  LENDER2,
  SUPPORTER2,
  SUPPORTER3,
} from "../fixtures/basic_network"
import { getMockSession } from "../fixtures/session"
import { Fixtures } from "lib/demo/fixtures"
import { dbClient, sdk } from "./common/utils"
import { sampleEthAddress1 } from "../src/circle/transfer.integration.test"

beforeAll(async () => {
  await sdk.ResetDB()
})

describe("Create new user", () => {
  afterAll(async () => {
    // await sdk.ResetDB()
  })

  test("new user", async () => {
    const payload: typeof CreateUser.InputType = {
      user: BORROWER1,
    }
    const res: CreateUserMutation = (await runAction(
      CreateUser.Name,
      { user: { email: payload.user.email } },
      payload,
      dbClient
    )) as CreateUserMutation
    expect(res.insert_user_one.email === payload.user.email)
    expect(res.insert_user_one.account_details.circle.walletId).toBeTruthy
    expect(res.insert_user_one.account_details.circle.ethAddress).toBeTruthy
    expect(res.insert_user_one.account_details.circle.algoAddress).toBeTruthy
    expect(res.insert_user_one.account_details.circle.algoAddress).not.toBe(
      res.insert_user_one.account_details.circle.ethAddress
    )
    expect(res.insert_user_one.account_details.circle.trackingRef).toBeTruthy
    expect(res.insert_user_one.account_details.circle.accountId).toBeTruthy
    expect(res.insert_user_one.account_details.circle.wireDepositAccount)
      .toBeTruthy
  })
})

describe("Create Withdrawal", () => {
  const userData = Fixtures.Lender
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("crypto withdrawal", async () => {
    const payload: WithdrawPayload = {
      target: "ETH",
      address: sampleEthAddress1,
      amount: 1,
    }
    const { id, status, source, destination, amount } = await runAction(
      Withdraw.Name,
      { user: userData },
      payload,
      dbClient
    )
    expect(parseFloat(amount.amount)).toBe(1)
    expect(status).toBe("pending")
    expect(destination.chain).toBe("ETH")
    expect(destination.address).toBe(sampleEthAddress1)
    expect(destination.type).toBe("blockchain")
    expect(source.id).toBe(userData.account_details.circle.walletId)
  })

  test.skip("wire withdrawal", async () => {
    console.log("pass")
  })
})

describe("Create new loan | user is Authorized", () => {
  let loanRequestId: string

  beforeAll(async () => {
    // add users
    await sdk.CreateUser({ user: BORROWER1 })
    await sdk.CreateUser({ user: LENDER2 })
  })
  afterAll(async () => {
    await sdk.ResetDB()
  })
  test("new loan", async () => {
    const session = getMockSession(BORROWER1)

    const payload: typeof CreateLoan.InputType = {
      request: {
        amount: 100,
        borrower_id: BORROWER1.id,
      },
    }

    const res: typeof CreateLoan.ReturnType = (await runAction(
      CreateLoan.Name,
      session,
      payload,
      dbClient
    )) as typeof CreateLoan.ReturnType
    expect(res.loanRequest.amount === payload.request.amount)
    loanRequestId = res.loanRequest.request_id
  })
  test("set borrower approval", async () => {
    const userBefore = await dbClient.getUserByEmail(LENDER2.email)
    console.log(userBefore)
    expect(
      userBefore.approvedBorrowers.map((b) => b.borrower_id)
    ).not.toContain(BORROWER1.id)

    const payload: typeof SetBorrowerApproval.InputType = {
      borrowerId: BORROWER1.id,
      approved: true,
    }
    const session = getMockSession(LENDER2)

    // set approved
    const res: typeof SetBorrowerApproval.ReturnType = (await runAction(
      SetBorrowerApproval.Name,
      session,
      payload,
      dbClient
    )) as typeof SetBorrowerApproval.ReturnType
    expect(res).toBeTruthy
    let userAfter = await dbClient.getUserByEmail(LENDER2.email)
    expect(userAfter.approvedBorrowers.map((b) => b.borrower_id)).toContain(
      BORROWER1.id
    )

    // remove approval
    payload.approved = false
    const res2 = (await runAction(
      SetBorrowerApproval.Name,
      session,
      payload,
      dbClient
    )) as typeof SetBorrowerApproval.ReturnType
    expect(res2).toBeTruthy
    userAfter = await dbClient.getUserByEmail(LENDER2.email)
    expect(userAfter.approvedBorrowers.map((b) => b.borrower_id)).not.toContain(
      BORROWER1.id
    )
  })
})

describe("Create new loan | user is Unauthorized", () => {
  const payload: typeof CreateLoan.InputType = {
    request: {
      amount: 100,
      borrower_id: BORROWER1.id,
    },
  }

  beforeAll(async () => {
    // add users
    await sdk.CreateUser({ user: LENDER1 })
    await sdk.CreateUser({ user: BORROWER1 })
  })
  afterAll(async () => {
    await sdk.ResetDB()
  })
  test("no session | unauthorized loan", async () => {
    try {
      await runAction(CreateLoan.Name, undefined, payload, dbClient)
    } catch (e) {
      expect(e).toMatch(ACTION_ERRORS.Unauthorized)
    }
  })

  test("no session | invalid loan", async () => {
    try {
      // @ts-ignore
      await runAction("invalid", undefined, payload, dbClient)
    } catch (e) {
      expect(e).toMatch(ACTION_ERRORS.Invalid)
    }
  })

  test("illegal user | unauthorized loan", async () => {
    const session = getMockSession(LENDER1)

    try {
      await runAction(CreateLoan.Name, session, payload, dbClient)
    } catch (e) {
      expect(e).toMatch(ACTION_ERRORS.Unauthorized)
    }
  })
})
