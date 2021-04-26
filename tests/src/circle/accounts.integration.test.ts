import CircleClient, { CIRCLE_BASE_URL } from "gql/wallet/circle_client"
import { uuidv4 } from "../../../src/lib/scenario"

global.fetch = require("node-fetch")

export const circle = new CircleClient(CIRCLE_BASE_URL)

describe("Circle tests", () => {
  const idemKey = uuidv4()

  describe("setup", () => {
    let walletId

    test("create account and get balance", async () => {
      const req = {
        idempotencyKey: idemKey,
        description: "lender-wallet",
      }
      const data = await circle.createAccount(req)
      walletId = data.walletId
      expect(walletId).toBeTruthy
      expect(data.entityId).toBeTruthy

      // using the same key will not create a different wallet
      const data2 = await circle.createAccount(req)
      expect(data2.walletId).toBe(walletId)
    })

    test("check balance", async () => {
      // check doesnt have any balance
      const balances = await circle.getBalance(walletId)
      expect(balances).toBe(0)
    })

    test("create an on-chain deposit address ", async () => {
      const address1 = await circle.createAddress(walletId, idemKey, "ETH")
      expect(address1).toBeTruthy
      const address2 = await circle.createAddress(walletId, uuidv4(), "ALGO")
      expect(address2).toBeTruthy
      expect(address1).not.toBe(address2)
    })
  })
})
