import { GraphQLClient } from "graphql-request"
import { DbClient } from "../../src/gql/db_client"
import { initializeGQL } from "../../src/gql/graphql_client"
import {
  CreateLoanRequestMutation,
  CreateUserMutation,
  CreateUserMutationVariables,
  Loan_Requests_Insert_Input,
  Sdk,
} from "../../src/gql/sdk"
import {
  ACTION_ERRORS,
  CreateLoan,
  CreateUser,
  runAction,
} from "../../src/lib/gql_api_actions"
import { BORROWER1, LENDER1 } from "../fixtures/basic_network"
import { getMockSession } from "../fixtures/session"

global.fetch = require("node-fetch")

const TEST_API_URL = "http://localhost:8080/v1/graphql"
const TEST_ADMIN_SECRET = "myadminsecretkey"

let client: GraphQLClient
let sdk: Sdk
let dbClient: DbClient

beforeAll(async () => {
  client = initializeGQL(TEST_API_URL, TEST_ADMIN_SECRET)
  dbClient = new DbClient(client)
  sdk = dbClient.sdk
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
    const res: CreateUserMutation = await runAction(
      CreateUser.Name,
      undefined,
      payload,
      dbClient
    )
    expect(res.insert_user_one.email === payload.user.email)
  })
})

describe("Create new loan | user is Authorized", () => {
  const payload: typeof CreateLoan.InputType = {
    request: {
      amount: 100,
      borrower_id: BORROWER1.id,
    },
  }

  beforeAll(async () => {
    // add users
    await sdk.CreateUser({ user: BORROWER1 })
  })
  afterAll(async () => {
    await sdk.ResetDB()
  })
  test("new loan", async () => {
    const session = getMockSession(BORROWER1)

    const res: typeof CreateLoan.ReturnType = await runAction(
      CreateLoan.Name,
      session,
      payload,
      dbClient
    )
    expect(res.request.amount === payload.request.amount)
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
    expect(
      runAction(CreateLoan.Name, undefined, payload, dbClient)
    ).rejects.toEqual(ACTION_ERRORS.Unauthorized)
  })

  test("no session | invalid loan", async () => {
    expect(
      // @ts-ignore
      runAction("invalid", undefined, payload, dbClient)
    ).rejects.toEqual(ACTION_ERRORS.Invalid)
  })

  test("illegal user | unauthorized loan", async () => {
    const session = getMockSession(LENDER1)

    expect(
      runAction(CreateLoan.Name, session, payload, dbClient)
    ).rejects.toEqual(ACTION_ERRORS.Unauthorized)
  })
})
