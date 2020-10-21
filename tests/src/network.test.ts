import { DEFAULT_RECOMMENDATION_RISK_PARAMS } from "../../src/lib/constant"
import { addNetwork, setupScenario } from "../../src/lib/network_helpers"
import { EDGE_STATUS } from "../../src/lib/types"
import { BASIC_NETWORK } from "../fixtures/basic_network"
import { sdk } from "./common/utils"

beforeAll(async () => {
  await sdk.ResetDB()
})

afterAll(async () => {
  await sdk.ResetDB()
})

describe("An entire network can be added from a fixture", () => {
  beforeAll(async () => {
    await addNetwork(sdk, BASIC_NETWORK)
  })

  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("users from fixture have been added", async () => {
    const { user } = await sdk.GetAllUsers()
    const usermails = user.map((x) => x.email)
    Object.values(BASIC_NETWORK.nodes).forEach((user) => {
      expect(usermails).toContain(user.email)
    })
  })

  test("users are initialized with a default recommendation risk", async () => {
    const { recommendation_risk } = await sdk.GetCorpusRecommendationRisks({
      userIds: [BASIC_NETWORK.nodes[0].id],
    })
    expect(recommendation_risk[0].risk_params).toStrictEqual(
      DEFAULT_RECOMMENDATION_RISK_PARAMS
    )
  })

  test("all edges have been added", async () => {
    const { edges } = await sdk.GetEdgesByStatus({ status: EDGE_STATUS.active })
    expect(edges.length).toBe(BASIC_NETWORK.edges.length)
  })
})

describe("An entire network can be added from a JSON output by the simulator", () => {
  beforeAll(async () => {
    await sdk.ResetDB()
  })

  afterAll(async () => {
    await sdk.ResetDB()
  })

  test("add scenraio", async () => {
    await setupScenario(sdk, "basicCorpus")
    const { user } = await sdk.GetAllUsers()
    expect(user.length).toBe(30)
  })
})
