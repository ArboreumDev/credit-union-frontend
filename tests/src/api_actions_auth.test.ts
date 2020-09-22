import { DbClient } from "../../src/gql/db_client"
import { GraphQLClient } from "graphql-request"
import { initializeGQL } from "../../src/gql/graphql_client"
import {
  CreateLoanRequestMutation,
  CreateUserMutation,
  CreateUserMutationVariables,
  Loan_Requests_Insert_Input,
  Sdk,
} from "../../src/gql/sdk"
import { LogEventTypes } from "../../src/lib/constant"
import { LogEvent, Session, UserType } from "../../src/lib/types"
import {
  ActionTypes,
  ACTION_ERRORS,
  runAction,
} from "../../src/lib/gql_api_actions"
import { BORROWER1, LENDER1 } from "../fixtures/basic_network"
import { getMockSession } from "../fixtures/session"
import { NextApiRequest } from "next"
import httpMocks from "node-mocks-http"

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

describe("Create new log event", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new log event", async () => {
    const event: LogEvent = {
      eventType: LogEventTypes.ClientLog,
      data: {
        userId: "UserId",
        test: "test",
      },
    }
    const payload = httpMocks.createRequest<NextApiRequest>({
      body: { payload: event },
      headers: {
        ip: "10.0.0.1",
      },
    })

    const res = await runAction(
      ActionTypes.LogEvent,
      undefined,
      null,
      dbClient,
      payload
    )
    expect(res.event.data.userId === event.data.userId)
  })
})

describe("Create new user", () => {
  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("new user", async () => {
    const payload: CreateUserMutationVariables = {
      user: BORROWER1,
    }
    const res: CreateUserMutation = await runAction(
      ActionTypes.CreateUser,
      undefined,
      payload,
      dbClient
    )
    expect(res.insert_user_one.email === payload.user.email)
  })
})

describe("Create new loan | user is Authorized", () => {
  beforeAll(async () => {
    // add users
    await sdk.CreateUser({ user: LENDER1 })
    await sdk.CreateUser({ user: BORROWER1 })
  })
  afterAll(async () => {
    await sdk.ResetDB()
  })
  test("new loan", async () => {
    const payload: Loan_Requests_Insert_Input = {
      amount: 100,
      borrower_id: BORROWER1.id,
    }
    const session = getMockSession(BORROWER1)

    const res: CreateLoanRequestMutation = await runAction(
      ActionTypes.CreateLoan,
      session,
      payload,
      dbClient
    )
    expect(res.insert_loan_requests_one.amount === payload.amount)
  })
})

describe("Create new loan | user is Unauthorized", () => {
  beforeAll(async () => {
    // add users
    await sdk.CreateUser({ user: LENDER1 })
    await sdk.CreateUser({ user: BORROWER1 })
  })
  afterAll(async () => {
    await sdk.ResetDB()
  })
  test("no session | unauthorized loan", async () => {
    const payload: Loan_Requests_Insert_Input = {
      amount: 100,
      borrower_id: BORROWER1.id,
    }

    expect(
      runAction(ActionTypes.CreateLoan, undefined, payload, dbClient)
    ).rejects.toEqual(ACTION_ERRORS.Unauthorized)
  })

  test("no session | invalid loan", async () => {
    const payload: Loan_Requests_Insert_Input = {
      amount: 100,
      borrower_id: BORROWER1.id,
    }

    expect(
      // @ts-ignore
      runAction("invalid", undefined, payload, dbClient)
    ).rejects.toEqual(ACTION_ERRORS.Invalid)
  })

  test("illegal user | unauthorized loan", async () => {
    const payload: Loan_Requests_Insert_Input = {
      amount: 100,
      borrower_id: BORROWER1.id,
    }
    const session = getMockSession(LENDER1)

    expect(
      runAction(ActionTypes.CreateLoan, session, payload, dbClient)
    ).rejects.toEqual(ACTION_ERRORS.Unauthorized)
  })
})
