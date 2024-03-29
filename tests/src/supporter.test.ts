import { addNetwork } from "../../src/lib/network_helpers"
import { SupporterStatus } from "../../src/lib/types"
import {
  BASIC_NETWORK,
  BORROWER1,
  SUPPORTER1,
  SUPPORTER2,
  SUPPORTER3,
} from "../fixtures/basic_network"
import { dbClient, sdk } from "./common/utils"
import { getUserPortfolio } from "./common/test_helpers"

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  // reset
  await sdk.ResetDB()
})

describe.skip("Basic loan request flow for an accepted loan", () => {
  const amount = 100
  const pledgeAmount1 = amount / 2
  const pledgeAmount2 = amount / 4
  const pledgeAmount3 = 10
  const purpose = "go see another movie"
  let requestId: string
  let balancesBefore

  beforeAll(async () => {
    // add a basic network from a fixture and initialize pointers to
    // an exisiting borrower and two lenders
    await addNetwork(sdk, BASIC_NETWORK)
    const allUsers = await dbClient.allUsers
    balancesBefore = getUserPortfolio(allUsers)
    const { loanRequest } = await dbClient.createLoanRequest(
      BORROWER1.id,
      amount,
      purpose
    )
    requestId = loanRequest.request_id
  })

  test("suppporters that exist on the network can be added to the loan", async () => {
    await sdk.CreateUser({ user: SUPPORTER1 })
    await sdk.CreateUser({ user: SUPPORTER2 })
    await dbClient.sdk.AddSupporter({
      supporter: {
        request_id: requestId,
        supporter_id: SUPPORTER1.id,
        pledge_amount: pledgeAmount1,
      },
    })
    await dbClient.sdk.AddSupporter({
      supporter: {
        request_id: requestId,
        supporter_id: SUPPORTER2.id,
        pledge_amount: pledgeAmount2,
      },
    })

    const { loanRequest } = await sdk.GetLoanRequest({ requestId: requestId })
    expect(loanRequest.supporters[0].supporter_id).toBe(SUPPORTER1.id)
    expect(loanRequest.supporters[0].status).toBe(SupporterStatus.unknown)
    expect(loanRequest.supporters[0].pledge_amount).toBe(pledgeAmount1)
  })

  test("users can register supporters that are not on the network yet", async () => {
    await dbClient.addSupporter(
      requestId,
      SUPPORTER3.email,
      pledgeAmount3,
      "SomeName"
    )
    // new user signs up
    await sdk.CreateUser({ user: SUPPORTER3 })

    // verify user is registered with the correct name
    const user = await dbClient.getUserByEmail(SUPPORTER3.email)
    expect(user.name).toBe(SUPPORTER3.name)

    // verify user sees the pledge-request
    expect(user.pledge_requests[0].pledge_amount).toBe(pledgeAmount3)
  })

  test("supporters see the request for a pledge with basic info in their dashboard", async () => {
    const user = await dbClient.getUserByEmail(SUPPORTER1.email)

    expect(user.pledge_requests[0].pledge_amount).toBe(pledgeAmount1)
    expect(user.pledge_requests[0].loan_request.user.email).toBe(
      BORROWER1.email
    )
    expect(user.pledge_requests[0].loan_request.user.name).toBe(BORROWER1.name)
    expect(user.pledge_requests[0].loan_request.amount).toBe(amount)
  })

  test("supporters can accept (or reject) a pledge-request", async () => {
    const { supporter } = await sdk.UpdateSupporter({
      request_id: requestId,
      supporter_id: SUPPORTER1.id,
      pledge_amount: 40,
      status: SupporterStatus.confirmed,
    })
    expect(supporter.status).toBe(SupporterStatus.confirmed)
    expect(supporter.pledge_amount).toBe(40)
  })

  test("only confirmed supporters are included in the loan-request-calculation", async () => {
    const { loanRequest } = await dbClient.sdk.GetLoanRequest({ requestId })
    const riskInfo = await dbClient.getRiskInput(requestId)
    const {
      loan_request_info,
    } = await dbClient.swarmAIClient.generateLoanOfferRequest({
      requestId: loanRequest.request_id,
      loanAmount: loanRequest.amount,
      supporters: riskInfo.supporterInfo,
      borrowerInfo: riskInfo.borrowerInfo,
    })

    const loanSupporters = loan_request_info.terms.supporters.map(
      (x) => x.supporter_id
    )
    expect(loanSupporters).toContain(SUPPORTER1.id)
    expect(loanSupporters).not.toContain(SUPPORTER2.id)
  })
})
