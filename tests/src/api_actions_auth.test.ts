import { CreateUserMutation } from "gql/sdk"
import {
  ACTION_ERRORS,
  AddSupporter,
  CreateLoan,
  CreateUser,
  runAction,
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
      undefined,
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
  test("add supporter", async () => {
    const session = getMockSession(BORROWER1)
    const payload: typeof AddSupporter.InputType = {
      requestId: loanRequestId,
      amount: 20,
      email: SUPPORTER1.email,
      info: {
        supporter_relation: "manager",
        known_since: "Aug 2013",
      },
    }
    const res: typeof AddSupporter.ReturnType = (await runAction(
      AddSupporter.Name,
      session,
      payload,
      dbClient
    )) as typeof AddSupporter.ReturnType
    expect(res.insert_supporters_one.pledge_amount === payload.amount)
    expect(
      res.insert_supporters_one.info.supporter_relation ===
        payload.info.supporter_relation
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
