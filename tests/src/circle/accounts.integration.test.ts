import CircleClient, { CIRCLE_BASE_URL } from "gql/wallet/circle_client"
import { uuidv4 } from "../../../src/lib/scenario"

global.fetch = require("node-fetch")

export const circle = new CircleClient(CIRCLE_BASE_URL)

describe("Circle tests", () => {
  const idemKey = uuidv4()
  let walletId

  test("create account", async () => {
    const req = {
      idempotencyKey: idemKey,
      description: "lender-wallet",
    }
    const { data } = await circle.createAccount(req)
    walletId = data.walletId
    expect(walletId).toBeTruthy
    expect(data.entity).toBeTruthy

    // using the same key will not create a different wallet
    const res2 = await circle.createAccount(req)
    expect(res2.data.walletId).toBe(walletId)
  })
  test("get balance", async () => {
    const balances = await circle.getBalance(walletId)
    expect(balances).toStrictEqual([])
  })
})
