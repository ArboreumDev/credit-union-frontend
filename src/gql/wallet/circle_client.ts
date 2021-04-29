import { Fetcher } from "lib/api"
import { instructionsToBankDetails } from "lib/bankAccountHelpers"
import { Bank } from "./bank"
import { CreateUserMutationVariables, User_Insert_Input } from "../sdk"
import { uuidv4 } from "../../lib/scenario"

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

// sandbox
const CIRCLE_API_KEY =
  "QVBJX0tFWTo1NWE2MDdjZDNjYjNjZjk0N2Q4MmU0MWFkNTEyYzIyYTo1NmEyY2NmZDAwYzIwNmY0ZWZhYTVkMzI3MTA4NmM3Yw"
export const CIRCLE_BASE_URL = "https://api-sandbox.circle.com/"

const nullIfEmpty = (prop: string | undefined) => {
  if (prop !== undefined && prop.trim() === "") {
    return undefined
  }
  return prop
}

export default class CircleClient extends Bank {
  private fetcher: Fetcher

  constructor(
    baseURL: string
    // api_secret: string,
  ) {
    super()
    this.fetcher = new Fetcher(
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${CIRCLE_API_KEY}`,
      },
      baseURL
    )
  }

  async createAccount(params: { idempotencyKey: string; description: string }) {
    const endpoint = "v1/wallets"
    const { data } = await this.fetcher.post(endpoint, params)
    return data
    // returns:
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
    return usdBalance
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
        name: user.name,
        ...user.demographic_info.address,
      },
      bankAddress: {
        bankName: user.account_details.bankDetails.bankName,
        ...user.account_details.bankDetails.bankAddress,
      },
    } as CreateWireAccountPayload
    const { accountId, trackingRef } = await this.createWireAccount(bankReq)

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
    }
  }
}

export const circle = new CircleClient(CIRCLE_BASE_URL)
