import { Fetcher } from "lib/api"
import {
  CreateTransferPayload,
  WalletDestination,
  BlockchainDestination,
  Payment,
  Transfer,
  DepositInfo,
  CreatePayoutPayload,
  UserTransaction,
  CircleTransfer,
  CirclePayment,
  CirclePayout,
} from "lib/types"
import { instructionsToBankDetails } from "lib/bankAccountHelpers"
import { Bank } from "./bank"
import { CreateUserMutationVariables, User_Insert_Input } from "../sdk"
import { uuidv4 } from "lib/helpers"
import AmountInput from "components/common/AmountInput"

export enum CurrencyCode {
  INR = "INR",
}
export enum Notification {
  true = 1,
  false = 0,
}

export interface CreateWireAccountPayload {
  idempotencyKey: string
  accountNumber?: string
  routingNumber?: string
  iban?: string
  billingDetails: {
    name: string
    city: string
    country: string
    line1: string
    line2: string
    district: string
    postalCode: string
  }
  bankAddress: {
    bankName?: string
    city?: string
    country: string
    line1?: string
    line2?: string
    district?: string
    postalCode?: string
  }
}
export interface Address {
  city: string
  district: string
  // TODO: use enum with two-letter codes of accepted coutries here
  country: string
  line1: string
  line2: string
  postalCode: string
}

export interface BankDetails {
  bankName: string
  accountNumber?: string
  branchCode?: string
  routingNumber?: string
  accountType?: string
  iban?: string
  swiftCode?: string
  bankAddress: Address
}

export interface BankAccountDetails {
  owner: string
  billingAddress?: Address
  bankDetails: BankDetails
}

export interface CircleAccountInfo {
  accountId: string
  trackingRef: string
  walletId: string
  entityId: string
  ethAddress: string
  algoAddress: string
  wireDepositAccount: BankAccountDetails
  deposits?: DepositInfo
  history: any
}

export interface WithdrawalUserData {
  sourceWalletId: string
  targetAccountid: string
  email: string
}

const nullIfEmpty = (prop: string | undefined) => {
  if (prop !== undefined && prop.trim() === "") {
    return undefined
  }
  return prop
}

// helper function
const getTransferPurpose = (t, walletId) => {
  // withdrawal to blockchain address
  if (t.source.id === walletId && t.destination.type === "blockchain")
    return "Withdrawal"
  if (
    t.destination.type === "wallet" &&
    t.destination.id === walletId &&
    t.source.type === "blockchain"
  )
    return "Deposit"

  // TODO once those come from other wallets, we will have investments/pledges...
  return "Pledge"
}

export const paymentToUserTransaction = (payment: CirclePayment) => {
  return {
    type: "Deposit",
    amount: payment.amount.amount,
    status: payment.status,
    source: "BANK",
    destination: "WALLET",
    createDate: payment.createDate,
    details: { ...payment },
  } as UserTransaction
}

export const payoutToUserTransaction = (payout: CirclePayout) => {
  return {
    type: "Withdrawal",
    amount: payout.amount.amount,
    status: payout.status,
    destination: "BANK",
    source: "WALLET",
    createDate: payout.createDate,
    details: { ...payout },
  } as UserTransaction
}

export const transferToUserTransaction = (
  t: CircleTransfer,
  walletId: string
) => {
  const type = getTransferPurpose(t, walletId)
  return {
    type: type,
    amount: t.amount.amount,
    status: t.status,
    destination: type === "Deposit" ? "WALLET" : t.destination.chain,
    source: type === "Deposit" ? t.source.chain : "WALLET",
    createDate: t.createDate,
    details: { ...t },
  } as UserTransaction
}

export default class CircleClient extends Bank {
  private fetcher: Fetcher
  private masterWalletId: string

  constructor(baseURL: string, api_secret: string) {
    super()
    this.fetcher = new Fetcher(
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_secret}`,
      },
      baseURL
    )
  }

  async init() {
    const { data } = await this.fetcher.get("/v1/configuration", {})
    this.masterWalletId = data.payments.masterWalletId
  }

  async masterBalance() {
    if (!this.initialized) await this.init()
    return this.getBalance(this.masterWalletId)
  }

  get initialized() {
    return this.masterWalletId !== undefined
  }

  async createAccount(params: { idempotencyKey: string; description: string }) {
    const endpoint = "/v1/wallets"
    const { data } = await this.fetcher.post(endpoint, params)
    return data
    // {
    //     "data":{
    //     "walletId":"434000"
    //     "entityId":"fc988ed5-c129-4f70-a064-e5beb7eb8e32"
    //     "type":"end_user_wallet"
    //     "description":"Treasury Wallet"
    //     "balances":[
    //     {
    //     "amount":"3.14"
    //     "currency":"USD"
    //     }
    //     ]
    //     }
    // }
  }

  async getBalance(walletId: string) {
    const endpoint = `/v1/wallets/${walletId}`
    const { data } = await this.fetcher.get(endpoint, {})
    const balances = data.balances
    const usdBalance = data.balances.length
      ? data.balances.filter((x) => x.currency === "USD").map((x) => x.amount)
      : 0
    return parseFloat(usdBalance)
    // returns
    // {
    //     "data":{
    //         "walletId":"434000"
    //         "entityId":"fc988ed5-c129-4f70-a064-e5beb7eb8e32"
    //         "type":"end_user_wallet"
    //         "description":"Treasury Wallet"
    //        "balances":[ {"amount":"3.14", "currency":"USD" } ]
    // } }
  }

  /**
   * Create Address
   * @param walletId (contains form data and encrypted Address details)
   * @param idempotencyKey
   * @param currency USD only (so far)
   * @param chain one of ETH/ALGO (SOL/XLM)
   */
  async createAddress(
    walletId: string,
    idempotencyKey: string,
    chain = "ETH",
    currency = "USD"
  ) {
    const url = `/v1/wallets/${walletId}/addresses`
    const payload = {
      idempotencyKey,
      currency,
      chain,
    }
    const { data } = await this.fetcher.post(url, payload)
    return data.address
  }

  /**
   * Create Wire Account
   * @param {*} payload (contains form data)
   */
  async createWireAccount(payload: CreateWireAccountPayload) {
    const url = "/v1/banks/wires"
    payload.accountNumber = nullIfEmpty(payload.accountNumber)
    payload.routingNumber = nullIfEmpty(payload.routingNumber)
    payload.iban = nullIfEmpty(payload.iban)
    payload.bankAddress.bankName = nullIfEmpty(payload.bankAddress.bankName)
    payload.bankAddress.city = nullIfEmpty(payload.bankAddress.city)
    payload.bankAddress.line1 = nullIfEmpty(payload.bankAddress.line1)
    payload.bankAddress.line2 = nullIfEmpty(payload.bankAddress.line2)
    payload.bankAddress.district = nullIfEmpty(payload.bankAddress.district)
    payload.bankAddress.postalCode = nullIfEmpty(payload.bankAddress.postalCode)
    const { data } = await this.fetcher.post(url, payload)
    // TODO handle failure
    return {
      trackingRef: data.trackingRef,
      accountId: data.id,
    }
  }

  /**
   * Get Wire Account Instructions
   * @param {String} accountId
   */
  async getWireAccountInstructions(accountId: string) {
    const url = `/v1/banks/wires/${accountId}/instructions`
    const { data } = await this.fetcher.get(url, {})
    return data
  }

  /**
   * Does all steps to setup user with circle account
   * 1.1) register bankaccount to allow accept wire deposits from & to make wire-withdrawals to
   * 1.2) query instructions where to wire deposits to
   * 2) create virtual wallet on circle backend
   * 3) create deposit address on wallet for USDC from ETH & Algo
   * 4) query deposit wire account
   * TODO how to deal with partial success?
   * @param userId  used as idempotencyKey
   * @param user all user data collected during signup (see onboarding)
   * @return circle account details to be stored on user
   */
  async setupUser(userId: string, user: User_Insert_Input) {
    // 0) Register bank account for wire deposits/withdrawals
    const bankReq = {
      idempotencyKey: userId,
      accountNumber: "",
      routingNumber: "",
      iban: user.account_details.bankDetails.iban,
      billingDetails: {
        name: `{$user.first_name} ${user.last_name}`,
        ...user.demographic_info.address,
      },
      bankAddress: {
        bankName: user.account_details.bankDetails.bankName,
        ...user.account_details.bankDetails.bankAddress,
      },
    } as CreateWireAccountPayload
    const { accountId, trackingRef } = await this.createWireAccount(bankReq)

    // 0.5) get target-bank acccount to which deposits from the above account shall be sent
    const {
      beneficiary,
      beneficiaryBank,
    } = await this.getWireAccountInstructions(accountId)
    const wireDepositAccount = {
      owner: beneficiary.name,
      bankDetails: instructionsToBankDetails(beneficiaryBank),
    } as BankAccountDetails

    // 1) create a digital account with circle, with user.id as idempotencyKey (has to be uuid-format)
    const req = {
      idempotencyKey: userId,
      description: "user wallet",
    }
    const { walletId, entityId } = await this.createAccount(req)

    // 2) create a deposit address for eth & algo
    const ethAddress = await this.createAddress(
      walletId,
      req.idempotencyKey,
      "ETH"
    )
    const algoAddress = await this.createAddress(walletId, uuidv4(), "ALGO")

    // return info on circle account
    return {
      accountId,
      trackingRef,
      walletId,
      entityId,
      ethAddress,
      algoAddress,
      wireDepositAccount,
    } as CircleAccountInfo
  }

  /**
   * Get transfers
   * @param {String} sourceWalletId
   * @param {String} destinationWalletId
   * @param {String} from
   * @param {String} to
   * @param {String} pageBefore
   * @param {String} pageAfter
   * @param {String} pageSize
   */
  async getTransfers(
    walletId = "",
    sourceWalletId = "",
    destinationWalletId = "",
    from = "",
    to = "",
    pageBefore = "",
    pageAfter = "",
    pageSize = ""
  ) {
    const queryParams = {
      walletId: nullIfEmpty(walletId),
      sourceWalletId: nullIfEmpty(sourceWalletId),
      destinationWalletId: nullIfEmpty(destinationWalletId),
      from: nullIfEmpty(from),
      to: nullIfEmpty(to),
      pageBefore: nullIfEmpty(pageBefore),
      pageAfter: nullIfEmpty(pageAfter),
      pageSize: nullIfEmpty(pageSize),
    }

    const url = "/v1/transfers"

    const { data } = await this.fetcher.get(url, { params: queryParams })
    return data
  }

  /**
   * helper to fund accounts from masterWallet
   * @param toWallet
   * @param amount
   * @param idemKey
   * @returns
   */
  async fundFromMasterWallet(
    toWallet: string,
    amount: number,
    idemKey: string
  ) {
    if (!this.initialized) await this.init()
    if (!idemKey)
      throw "idemKey can not be zero when funding from master wallet"
    return this.walletTransfer(this.masterWalletId, toWallet, amount, idemKey)
  }

  /**
   * helper to make an internal transfer between two wallets
   * @param fromWallet
   * @param toWallet
   * @param idemKey
   */
  async walletTransfer(
    fromWallet: string,
    toWallet: string,
    amount: number,
    idemKey = ""
  ) {
    if (!this.initialized) await this.init()
    const idempotencyKey = idemKey || uuidv4()
    const payload = {
      idempotencyKey,
      source: { type: "wallet", id: fromWallet },
      destination: { type: "wallet", id: toWallet } as WalletDestination,
      amount: {
        amount: "" + amount,
        currency: "USD",
      },
    } as CreateTransferPayload
    return this.internalCreateTransfer(payload)
  }

  /**
   * helper to make an internal transfer between two wallets
   * @param fromWallet
   * @param toWallet
   * @param idemKey
   */
  async walletToBlockchainTransfer(
    fromWallet: string,
    targetChain: string, // ETH or ALGO
    targetAddress: string,
    amount: number,
    idemKey = ""
  ) {
    if (!this.initialized) await this.init()
    const idempotencyKey = idemKey || uuidv4()
    const payload = {
      idempotencyKey,
      source: { type: "wallet", id: fromWallet },
      destination: {
        type: "blockchain",
        address: targetAddress,
        chain: targetChain,
      } as BlockchainDestination,
      amount: {
        amount: "" + amount,
        currency: "USD",
      },
    } as CreateTransferPayload
    return this.internalCreateTransfer(payload)
  }

  /**
   * Should not be called directly, instead use helpers to construct the payload correctly
   * Create Transfer
   * @param {*} payload (contains form data and encrypted transfer details)
   */
  async internalCreateTransfer(payload: CreateTransferPayload) {
    const url = "/v1/transfers"
    const { data } = await this.fetcher.post(url, payload)
    return data
  }

  /**
   * Get Transfer
   * @param {String} transferId
   */
  async getTransferById(transferId: string) {
    const url = `/v1/transfers/${transferId}`

    const { data } = await this.fetcher.get(url, {})
    return data
  }

  /**
   * Get payments
   * @param {String} settlementId
   * @param {String} from
   * @param {String} to
   * @param {String} pageBefore
   * @param {String} pageAfter
   * @param {String} pageSize
   */
  async getPayments(
    settlementId = "",
    from = "",
    to = "",
    pageBefore = "",
    pageAfter = "",
    pageSize = ""
  ) {
    const queryParams = {
      settlementId: nullIfEmpty(settlementId),
      from: nullIfEmpty(from),
      to: nullIfEmpty(to),
      pageBefore: nullIfEmpty(pageBefore),
      pageAfter: nullIfEmpty(pageAfter),
      pageSize: nullIfEmpty(pageSize),
    }

    const url = "/v1/payments"

    const { data } = await this.fetcher.get(url, { params: queryParams })
    return data
  }

  /**
   * fetch all payments and check whether there a deposits from the user
   * check all (recent) payments into the masterAccount and use their source-id to transfer funds into the
   * relevant user account
   * @param accountId the wire account a user can make deposits from
   * @param targetWalletId the wallet where deposits should be credited to
   * @returns a summary of deposits that ...
   * - have either arrived and have yet to settle (pending)
   * - have settled and will now be credited to the user wallet (intiated)
   // REFACTOR NOTE: while passing in the paymentId as idemKey prevents duplication, we still tell their api
   // to do it....if we want to prevent that, we have to store the transferId of newly initiated transfers
   // (maybe in the user.account_details? or should we do another tx-table?)
   */
  async processDeposits(accountId: string, targetWalletId: string) {
    // 1) get payments
    const payments = await this.getPayments()

    // 2) initiate transfers for all payments using the paymentId as idemKey (will not be executed twice)
    // NOTE: if we want to avoid that we have to inteliggently use the dates on the payments & transfers
    const completedDeposits = payments.filter(
      (p: Payment) => p.status === "paid" && p.source.id === accountId
    )
    const settled = []
    await Promise.all(
      // e.g. here we could check success and store the last-updated on deposits info
      completedDeposits.map(async (d: Payment) => {
        await this.fundFromMasterWallet(
          targetWalletId,
          parseFloat(d.amount.amount),
          d.id
        )
        settled.push(d)
      })
    )
    const pending = payments.filter(
      (p: Payment) => p.status === "pending" && p.source.id === accountId
    )
    return {
      settled,
      pending,
      total: pending.length + settled.length,
    } as DepositInfo
  }

  async getHistory(walletId: string, accountId: string) {
    // get Transfers caused by
    // 1) deposits from fiat
    // 2) deposits from blockchain addresses
    // 3) withdrawals to blockchain addresses
    // 4) withdrawals to bank accounts

    // 1) fiat deposits
    const deposits = (await this.getPayments())
      .filter((p) => p.source.id === accountId)
      .map((p) => paymentToUserTransaction(p))

    // 2-3) deposits & withdrawals from/to blockchains
    const payoutsBlockchain = (await this.getTransfers(walletId))
      // ignore transfers from our masterWallet
      .filter((t) => t.source.id !== this.masterWalletId)
      .map((t) => transferToUserTransaction(t, walletId))

    // 4) withdrawals from wallet to wire account
    const payoutsWire = (await this.getPayouts(walletId)).map((p) =>
      payoutToUserTransaction(p)
    )

    return payoutsWire.concat(payoutsBlockchain).concat(deposits)
  }

  /**
   * Get payouts
   * @param {String} source
   * @param {String} destination
   * @param {String} from
   * @param {String} to
   * @param {String} pageBefore
   * @param {String} pageAfter
   * @param {String} pageSize
   */
  async getPayouts(
    source = "",
    destination = "",
    from = "",
    to = "",
    pageBefore = "",
    pageAfter = "",
    pageSize = ""
  ) {
    const queryParams = {
      source: nullIfEmpty(source),
      destination: nullIfEmpty(destination),
      from: nullIfEmpty(from),
      to: nullIfEmpty(to),
      pageBefore: nullIfEmpty(pageBefore),
      pageAfter: nullIfEmpty(pageAfter),
      pageSize: nullIfEmpty(pageSize),
    }

    const url = "/v1/payouts"

    const { data } = await this.fetcher.get(url, { params: queryParams })
    return data
  }

  /**
   * Get Payout
   * @param {String} payoutId
   */
  async getPayoutById(payoutId: string) {
    const url = `/v1/payouts/${payoutId}`

    const { data } = await this.fetcher.get(url, {})
    return data
  }

  /**
   *  helper-function to be called when creating a withdrawal
   * @param user
   * @param idemKey
   * @param amount
   * @returns
   */
  async createWireWithdrawal(
    user: WithdrawalUserData,
    idemKey: string,
    amount: number
  ) {
    return this.internalCreatePayout({
      idempotencyKey: idemKey,
      source: {
        type: "wallet",
        id: user.sourceWalletId,
      },
      destination: {
        type: "wire",
        id: user.targetAccountid,
      },
      amount: {
        amount: "" + amount,
        currency: "USD",
      },
      metadata: {
        beneficiaryEmail: user.email,
      },
    } as CreatePayoutPayload)
  }

  /**
   * Create Payout
   * @param {*} payload
   */
  async internalCreatePayout(payload: CreatePayoutPayload) {
    const url = "/v1/payouts"
    const { data } = await this.fetcher.post(url, payload)
    return data
  }
}

// export const circleClient = new CircleClient(CIRCLE_BASE_URL, Ci)
