import CircleClient, {
  CIRCLE_BASE_URL,
  WithdrawalUserData,
} from "gql/wallet/circle_client"
import { uuidv4 } from "../../../src/lib/scenario"
import { exampleWireAccounts } from "../../fixtures/exampleWireAccounts"
import { exampleCircleAccounts } from "../../fixtures/exampleCircleAccounts"
import { instructionsToBankDetails } from "lib/bankAccountHelpers"

global.fetch = require("node-fetch")

export const circle = new CircleClient(CIRCLE_BASE_URL)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe("Circle tests", () => {
  test("circle client knows master wallet id", async () => {
    expect(circle.initialized).toBeTruthy
  })
  describe("basic transfers", () => {
    const w1 = exampleCircleAccounts[0].walletId
    const w2 = exampleCircleAccounts[1].walletId
    const idem1 = uuidv4()
    let transferId1

    test("from master wallet succeeds", async () => {
      const testAmount1 = 1
      const before = await circle.getBalance(w1)
      const masterBefore = await circle.masterBalance()
      const { status, id, amount } = await circle.fundFromMasterWallet(
        w1,
        testAmount1,
        idem1
      )
      transferId1 = id
      expect(status).toBe("pending")
      expect(masterBefore - testAmount1).toBe(await circle.masterBalance())
    })

    test("check status of transfer", async () => {
      await sleep(1000)
      const check = await circle.getTransferById(transferId1)
      expect(check.status).toBe("complete")
    })

    test("from master wallet can not be repeated with same idemKey", async () => {
      const masterBefore = await circle.masterBalance()
      const { status, id, amount } = await circle.fundFromMasterWallet(
        w1,
        1,
        idem1
      )
      expect(status).toBe("complete")
      expect(await circle.masterBalance()).toBe(masterBefore)
    })

    test("between wallets", async () => {
      const before1 = await circle.getBalance(w1)
      const before2 = await circle.getBalance(w2)

      // do transfer and wait a bit for it to settle
      const { status, id, amount } = await circle.walletTransfer(
        w1,
        w2,
        1,
        uuidv4()
      )
      await sleep(1000)
      const check = await circle.getTransferById(id)
      expect(check.status).toBe("complete")

      // check balances have changed accordingly
      const after1 = await circle.getBalance(w1)
      const after2 = await circle.getBalance(w2)
      expect(after1).toBe(before1 - 1)
      expect(after2).toBe(before2 + 1)
    }, 8000)
  })
  describe("process Deposits", () => {
    const user1 = exampleCircleAccounts[0]
    test("completed deposits are transfered to user accounts", async () => {
      const deposits = await circle.processDeposits(
        user1.accountId,
        user1.walletId
      )
      expect(deposits.total).toBe(2)
    })
  })
  describe("withdrawals", () => {
    const user1 = exampleCircleAccounts[0]
    let withdrawalId
    test("creating a wire withdrawal", async () => {
      const userData = {
        sourceWalletId: user1.walletId,
        targetAccountid: user1.accountId,
        email: "circle1@test.mail",
      } as WithdrawalUserData
      const {
        id,
        status,
        amount,
        sourceWalletId,
      } = await circle.createWireWithdrawal(userData, uuidv4(), 1.1)
      withdrawalId = id
      expect(sourceWalletId).toBe(userData.sourceWalletId)
      expect(status).toBe("pending")
      expect(amount.amount).toBe("1.10")
    })
    test("get payouts", async () => {
      const payout = await circle.getPayoutById(withdrawalId)
      console.log(payout)
      expect(payout).toBeTruthy

      const payouts = await circle.getPayouts("", user1.accountId)
      console.log(payouts)
      expect(payouts.map((x) => x.id)).toContain(withdrawalId)
    })
  })
})
