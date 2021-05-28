import { notDeepEqual } from "assert"
import { CreateUserMutation } from "gql/sdk"
import {
  ACTION_ERRORS,
  CreateLoan,
  CreateUser,
  runAction,
  SetBorrowerApproval,
} from "lib/gql_api_actions"
import { BORROWER1, LENDER1, SUPPORTER1 } from "../fixtures/basic_network"
import { getMockSession } from "../fixtures/session"
import { dbClient, sdk } from "./common/utils"

beforeAll(async () => {
  await sdk.ResetDB()
})

describe("Create new user", () => {
  afterAll(async () => {
    await sdk.ResetDB()
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
  })
})

describe("Create new loan | user is Authorized", () => {
  let loanRequestId: string

  beforeAll(async () => {
    // add users
    await sdk.CreateUser({ user: BORROWER1 })
    await sdk.CreateUser({ user: SUPPORTER1 })
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
    const userBefore = await dbClient.getUserByEmail(SUPPORTER1.email)
    expect(
      userBefore.approvedBorrowers.map((b) => b.borrower_id)
    ).not.toContain(BORROWER1.id)

    const payload: typeof SetBorrowerApproval.InputType = {
      borrowerId: BORROWER1.id,
      approved: true,
    }
    const session = getMockSession(SUPPORTER1)

    // set approved
    const res: typeof SetBorrowerApproval.ReturnType = (await runAction(
      SetBorrowerApproval.Name,
      session,
      payload,
      dbClient
    )) as typeof SetBorrowerApproval.ReturnType
    expect(res).toBeTruthy
    let userAfter = await dbClient.getUserByEmail(SUPPORTER1.email)
    expect(userAfter.approvedBorrowers.map((b) => b.borrower_id)).toContain(
      BORROWER1.id
    )

    // remove approval
    payload.approved = false
    const res2: typeof SetBorrowerApproval.ReturnType = (await runAction(
      SetBorrowerApproval.Name,
      session,
      payload,
      dbClient
    )) as typeof SetBorrowerApproval.ReturnType
    expect(res).toBeTruthy
    userAfter = await dbClient.getUserByEmail(SUPPORTER1.email)
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
