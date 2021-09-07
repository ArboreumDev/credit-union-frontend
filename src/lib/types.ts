import {
  GetUserByEmailQuery,
  GetBorrowersQuery,
  GetAllUsersQuery,
  FundLoanRequestMutation,
  GetLiveLoansQuery,
  GetLoanStateQuery,
} from "../gql/sdk"
import { LogEventTypes } from "./constant"

export type Session = {
  user: User
  accessToken: string
  expires: string
  options?: InvestmentOptions
}

export enum UserType {
  Borrower = "borrower",
  Lender = "lender",
}

export type InvestmentOptions = GetBorrowersQuery["borrowers"]
export type InvestmentOptionInfo = GetBorrowersQuery["borrowers"][0]
export type User = GetUserByEmailQuery["user"][0]
export type LoanRequest = User["loan_requests"][0]
export type Loan = User["loans"][0]
export type LoanRepayInfo = User["loansToRepay"][0]
export type InvestedLoan = User["investedLoans"][0]
export type UserBaseInfo = GetAllUsersQuery["user"][0]
export type FundedLoan = FundLoanRequestMutation
export type LiveLoan = GetLiveLoansQuery["loans"][0]
export type LoanState = GetLoanStateQuery["loan"]

export type Repayment = {
  amount: number
  date: string
}

export type LoanTerms = {
  principal: number
  tenor: number
  penalty_apr: number
  apr: number
  compounding_frequency: number
  start_date: number // unix timestamp
}

export type JWTToken = {
  name: string
  email: string
  user?: User
}

export type DemographicInfo = {
  education_years: number
  income: number
  credit_score: number
}

export type PaidRemain = {
  paid: number
  remain: number
}

export const COMPOUNDING_FREQ = {
  monthly: 30,
  weekly: 51,
  daily: 1,
}

export interface BlockchainDestination {
  type: string
  address: string
  chain: string
  addressTag?: string
}

export interface WalletDestination {
  type: string
  id: string
}

export interface CreateTransferPayload {
  idempotencyKey: string
  source: {
    type: string // "wallet" | "blockchain"
    id: string
  }
  destination: BlockchainDestination | WalletDestination
  amount: {
    amount: string
    currency: string
  }
}

export interface Payment {
  id: string
  type: string
  merchantId: string
  merchantWalletId: string
  source: {
    id: string
    type: string
  }
  description: string
  amount: {
    amount: string
    currency: string
  }
  fees: {
    amount: string
    currency: string
  }
  status: string
  refunds: any
  createDate: string
  updateDate: string
}

export interface Transfer {
  id: string
  source: {
    type: string
    id: string
  }
  destination: {
    type: string
    id: string
  }
  amount: {
    amount: string
    currency: string
  }
  status: string
  createDate: string
}

export type DepositInfo = {
  pending: Array<Payment>
  settled: Array<Payment>
  total: number
}

export interface CreatePayoutPayload {
  idempotencyKey: string
  source?: {
    id: string
    type: string
  }
  destination: {
    id: string
    type: string // wire | ach
  }
  amount: {
    amount: string
    currency: string // USD
  }
  metadata: {
    beneficiaryEmail: string
  }
}

type TxType = "Deposit" | "Withdrawal" | "Investment" | "Pledge" | "Repayment"
type Medium = "BANK" | "ETH" | "ALGO" | "WALLET"

export type UserTransaction = {
  type: TxType
  amount: string
  createDate: string
  status: string
  destination: Medium
  source: Medium
  details: any
}

type Amount = {
  amount: string
  currency: string
}

type PaymentSource = {
  id: string
  type: string
}

export type CirclePayment = {
  id: string
  type: string
  merchantId: string
  merchantWalletId: string
  amount: Amount
  source: PaymentSource
  description: string
  status: string
  cancel?: any
  refunds: any[]
  createDate: string
  updateDate: string
}

export type PayoutDestination = {
  type: string
  id: string
  name: string
}
type CircleRiskEvaluation = {
  decision: string
  reason: string
}

export type CirclePayout = {
  id: string
  sourceWalletId: string
  destination: PayoutDestination
  amount: Amount
  fees: Amount
  status: string
  trackingRef: string
  errorCode: string
  riskEvaluation: CircleRiskEvaluation
  return: any
  createDate: string
  updateDate: string
}

type TransferSource = {
  type: string
  id: string
  chain?: string
}

type TransferDestination = {
  type: string
  address: string
  addressTag: string
  chain: string
}
export type CircleTransfer = {
  id: string
  source: TransferSource
  destination: TransferDestination

  amount: Amount
  transactionHash: string
  status: string
  errorCode: string
  createDate: string
}
