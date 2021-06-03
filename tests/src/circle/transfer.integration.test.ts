import { WithdrawalUserData } from "gql/wallet/circle_client"
import { uuidv4 } from "lib/helpers"
import { exampleWireAccounts } from "../../fixtures/exampleWireAccounts"
import { exampleCircleAccounts } from "../../fixtures/exampleCircleAccounts"
import { instructionsToBankDetails } from "lib/bankAccountHelpers"
import { UserTransaction } from "lib/types"
import { circle } from "../common/utils"
import { time } from "console"

global.fetch = require("node-fetch")

export const sampleEthAddress1 = "0x2Db98f725Ce52ddAf5dC8c87d3b32b258DE8117b"

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe("Circle tests", () => {
  test("circle client knows master wallet id", async () => {
    expect(circle.initialized).toBeTruthy
  })
  describe("basic transfers", () => {
    const w1 = exampleCircleAccounts[0].walletId
    const acc1 = exampleCircleAccounts[0].accountId
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

    test("master transfers do NOT appear in transfer history", async () => {
      const history = await circle.getHistory(w1, acc1)
      const txs: UserTransaction = history.filter(
        (x) => x.details.id === transferId1
      )
      expect(txs).not.toBeTruthy
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

    test("from wallet to external ethereum blockchain address", async () => {
      const before = await circle.getBalance(w1)

      const { id } = await circle.walletToBlockchainTransfer(
        w1,
        "ETH",
        sampleEthAddress1,
        1
      )
      sleep(1000)

      expect(await circle.getBalance(w1)).toBe(before - 1)

      // and are shown in history
      const history = await circle.getHistory(w1, acc1)
      const tx: UserTransaction = history.filter((x) => x.details.id === id)[0]
      expect(tx).toBeTruthy
      expect(tx.type).toBe("Withdrawal")
      expect(tx.destination).toBe("ETH")
    })

    test("from wallet to external algorand blockchain address", async () => {
      const sampleAlgoAddress1 =
        "FEIYSKZZKP6LIZW7FTQSLTIHZTYTPI2MEW3R3BBSWWCRPJNJWWCMH2YWOY"
      const before = await circle.getBalance(w1)

      const { id } = await circle.walletToBlockchainTransfer(
        w1,
        "ALGO",
        sampleAlgoAddress1,
        1
      )
      sleep(2000)

      expect(await circle.getBalance(w1)).toBe(before - 1)

      // and are shown in history
      const history = await circle.getHistory(w1, acc1)
      const tx: UserTransaction = history.filter((x) => x.details.id === id)[0]
      expect(tx).toBeTruthy
      expect(tx.type).toBe("Withdrawal")
      expect(tx.destination).toBe("ALGO")
    })
  })

  describe("withdrawals", () => {
    const user1 = exampleCircleAccounts[0]
    let withdrawalId
    test("creating a wire withdrawal", async () => {
      const before = await circle.getBalance(user1.walletId)
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

      const after = await circle.getBalance(user1.walletId)
      const updatedPayout = await circle.getPayoutById(id)
      if (updatedPayout.status === "pending") {
        // somehow we get .2000000000002 here Less
        expect(Math.abs(after - (before - 1.1))).toBeLessThan(0.1)
      } else {
        console.log("unexpected status: ", updatedPayout)
        expect(false).toBeTruthy
      }
    })

    test("get payouts", async () => {
      const payout = await circle.getPayoutById(withdrawalId)
      expect(payout).toBeTruthy

      const payouts = await circle.getPayouts("", user1.accountId)
      expect(payouts.map((x) => x.id)).toContain(withdrawalId)
    })
    test("withdrawal shows up in history", async () => {
      const history = await circle.getHistory(user1.walletId, user1.accountId)
      const tx: UserTransaction = history.filter(
        (t) => t.details.id === withdrawalId
      )[0]
      expect(tx).toBeTruthy
      expect(tx.destination).toBe("BANK")
      expect(tx.type).toBe("Withdrawal")
    })
  })

  describe("process Deposits", () => {
    // TODO in other order these tests were flaky, reversing the order here solved it
    // maybe we can find a more robust solution
    const user1 = exampleCircleAccounts[0]
    test("completed deposits are transfered to user accounts", async () => {
      const deposits = await circle.processDeposits(
        user1.accountId,
        user1.walletId
      )
      // NOTE: i manually did four wire deposits so I expect those to show up
      expect(deposits.total).toBe(4)
    })

    test("deposits show in history", async () => {
      const history = await circle.getHistory(user1.walletId, user1.accountId)
      // check for the one deposit over 300
      const txs = history.filter(
        (x: UserTransaction) =>
          x.type === "Deposit" && x.details.amount.amount === "300.00"
      )
      expect(txs.length).toBe(1)
      expect(txs[0].destination).toBe("WALLET")
      expect(txs[0].source).toBe("BANK")
      expect(txs[0].type).toBe("Deposit")
    })
  })
})
