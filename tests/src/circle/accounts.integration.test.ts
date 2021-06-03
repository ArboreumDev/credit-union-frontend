import CircleClient, {
  CreateWireAccountPayload,
} from "gql/wallet/circle_client"
import { uuidv4 } from "lib/helpers"
import { exampleWireAccounts } from "../../fixtures/exampleWireAccounts"
import { instructionsToBankDetails } from "lib/bankAccountHelpers"
import { circle } from "../common/utils"

global.fetch = require("node-fetch")

describe("Circle tests", () => {
  const idemKey = uuidv4()

  describe("setup", () => {
    let walletId
    let accountId: string

    test("circle client knows master wallet id", async () => {
      expect(circle.initialized).toBeTruthy
    })

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

    test("register wire Account", async () => {
      const wire = exampleWireAccounts[1]
      const data = await circle.createWireAccount({
        idempotencyKey: uuidv4(),
        accountNumber: wire.bankDetails.accountNumber,
        routingNumber: wire.bankDetails.routingNumber,
        iban: wire.bankDetails.iban,
        billingDetails: {
          name: wire.name,
          ...wire.billingAddress,
        },
        bankAddress: {
          bankName: wire.bankDetails.bankName,
          ...wire.bankDetails.bankAddress,
        },
      } as CreateWireAccountPayload)
      accountId = data.accountId
      expect(data.trackingRef).toBeTruthy
      expect(accountId).toBeTruthy
    })

    test("get deposit instructions", async () => {
      const {
        beneficiary,
        beneficiaryBank,
      } = await circle.getWireAccountInstructions(accountId)
      const bankDetails = instructionsToBankDetails(beneficiaryBank)
      expect(bankDetails).toBeTruthy
    })
  })
})
