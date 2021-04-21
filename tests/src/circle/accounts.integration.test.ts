import CircleClient, { CIRCLE_BASE_URL } from "gql/wallet/circle_client"
import { uuidv4 } from "../../../src/lib/scenario"

global.fetch = require("node-fetch")

export const circle = new CircleClient(CIRCLE_BASE_URL)

describe("Circle tests", () => {
  const idemKey = uuidv4()
  let walletId

  test("create account and get balance", async () => {
    const req = {
      idempotencyKey: idemKey,
      description: "lender-wallet",
    }
    const { walletId, entityId } = await circle.createAccount(req)
    expect(walletId).toBeTruthy
    expect(entityId).toBeTruthy

    // using the same key will not create a different wallet
    const res2 = await circle.createAccount(req)
    expect(res2.walletId).toBe(walletId)

    // check doesnt have any balance
    const balances = await circle.getBalance(walletId)
    expect(balances).toStrictEqual([])
  })
})
