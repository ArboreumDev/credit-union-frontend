import { GetUserByEmailQuery } from "../gql/sdk"
import { LogEventTypes } from "./constant"

export type Session = {
  user: User
  accessToken: string
  expires: string
}

export enum UserType {
  Borrower = "borrower",
  Lender = "lender",
}

export type User = GetUserByEmailQuery["user"][0]
export type LoanRequest = User["loan_requests"][0]
export type PledgeRequest = User["pledge_requests"][0]
export type InvestedLoan = User["active_loans"][0]

// TODO @djudjuu
export type CalculatedRisk = {
  latestOffer?: LoanInfo
  request_data?: any
}

type BetaParms = [number, number]
type KumrParams = [number, number]

// the types are snake_cased to mirror the naming in the DB
export type RiskParams = {
  beta_params: BetaParms
  kumr_params: KumrParams
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

// =========== the following types mirror the types expected by the swarmAI module ========
export type UserInfo = {
  id: string
  balance: number
  name: string
  email: string
  user_type: UserType
  phone: string
  demographic_info: DemographicInfo
  // those are only there if user is lender
  // ideally they would default to zero
  corpus_share?: number
  encumbered_cash?: number
  encumbered_portfolio?: number
  roi?: RoI
}

export type Scenario = {
  users: { [id: string]: UserInfo }
  loans: { [id: string]: LoanInfo }
  loan_requests: { [id: string]: LoanRequestInfo }
  loan_offers: { [id: string]: LoanInfo }
}

export type SupporterInfo = {
  supporter_id: string
  trust_amount: number
  recommendation_risk: RiskParams
  demographic_info?: DemographicInfo
  apr_delta?: number
}

// this type mirrors the type expected by the swarmAI module
export type BorrowerInfo = {
  borrower_id: string
  demographic_info: DemographicInfo
}

export type LiveLoanInfo = {
  // loan_id: string
  // interest: number
  // kumr_params: KumrParams
  // amount_owned_portfolio: number
  // amount_owned_supporters: number
  // time_remaining: number
  // loan_schedule: any
}

export type RequestedTerms = {
  request_id: string
  // filled by borrower
  borrower_info: BorrowerInfo
  tenor: number
  amount: number
  supporters: SupporterInfo[]
  // filled by system
  borrower_collateral: number
  num_annual_cmpnd_prds?: number
}

export type OfferedTerms = {
  request_id: string
  // original params from the borrower
  borrower_info: BorrowerInfo
  tenor: number
  amount: number
  supporters: SupporterInfo[]
  num_annual_cmpnd_prds: number
  borrower_collateral: number
  // offered by system in response
  corpus_share: number
  corpus_apr: number
  supporter_share: number
  supporter_apr: number
  borrower_apr: number
  penalty_apr: number
  supporter_lag: number
}

// mathces LoanRequest in the swarmai-repo
export type LoanRequestInfo = {
  request_id: string
  terms: RequestedTerms
  risk_params?: RiskParams
}

export type LoanState = {
  request_id: string
  borrower_collateral: number
  supporter_cash_encumbered: number
  supporter_portfolio_encumbered: number
  repayments: number[]
  escrow: number
  // loan_schedule?: any
  // desired_irr?: number
}

export type LoanInfo = {
  request_id: string
  terms: OfferedTerms
  state: LoanState
  schedule: LoanScheduleSummary
}

export type LoanOffer = LoanInfo

export type RiskInput = {
  central_risk_info: RiskParams
}

export type OptimizerContext = {
  supporter_corpus_share: number
  loans_in_corpus: LiveLoanInfo[]
  corpus_cash: number
  supporter_cash: number
  novation?: boolean
  risk_free_apr?: number
}

export type SwarmAiRequestMessage = {
  loan_request_info: LoanRequestInfo
  risk_assessment_context?: RiskInput
  optimizer_context?: OptimizerContext
}

export type PaidRemain = {
  paid: number
  remain: number
}

export type BorrowerView = {
  total_payments: PaidRemain
  corpus_principal: PaidRemain
  supporter_principal: PaidRemain
  corpus_interest: PaidRemain
  supporter_interest: PaidRemain
  borrower_collateral: PaidRemain
}

export type SupporterView = {
  total_receipts: PaidRemain
  supporter_principal: PaidRemain
  supporter_interest: PaidRemain
  receipts_in_escrow: PaidRemain
  receipts_rtrn_from_brw: PaidRemain
  cash_unencumbered: PaidRemain
  cash_rtrn_from_brw: PaidRemain
  ptfl_unencumbered: PaidRemain
  ptfl_rtrn_from_brw: PaidRemain
  principal_released: PaidRemain
  interest_released: PaidRemain
  total_released: PaidRemain
}

export type CorpusView = {
  total_receipts: PaidRemain
  principal: PaidRemain
  interest: PaidRemain
}

export type APR = {
  corpus: number
  supporter: number
}

export type LoanScheduleSummary = {
  borrower_view: BorrowerView
  next_borrower_payment: number
  supporter_view: SupporterView
  corpus_view: CorpusView
  apr: APR
  full_single_repay: number
}

// =========== End of risk module types ========

export enum EDGE_STATUS {
  active = "active",
  awaiting_lender_confirmation = "awaiting_lender_confirmation",
  awaiting_lender_signup = "awaiting_lender_signup",
  awaiting_borrower_signup = "awaiting_borrower_signup",
  historic = "historic",
}

// TODO even though I adjusted the codegen config, I cant get it to generate those for me...
export enum LoanRequestStatus {
  initiated = "initiated",
  // awaiting_guarantor_confirmation="awaiting_guarantor_confirmation",
  awaiting_borrower_confirmation = "awaiting_borrower_confirmation",
  active = "live",
  settled = "settled",
  defaulted = "defaulted",
}

export enum SupporterStatus {
  unknown = "unknown",
  rejected = "rejected",
  confirmed = "confirmed",
}

export type APRInfo = {
  apr: number
  interest: PaidRemain
  principal: PaidRemain
}

export type LoanSummary = {
  sum?: APRInfo
  loans?: any // is a object which maps loan_id => LoanSummary
}

export type RoI = {
  total_apr: APRInfo
  apr_on_pledges: LoanSummary
  apr_on_loans: LoanSummary
}

export type PortfolioUpdate = {
  userId: string
  balanceDelta: number
  shareDelta: number
  alias?: string
  newRoI: RoI
}

export type AccountsUpdate = {
  updates: any //PortfolioUpdate[]
  transactions?: any
  escrow_deltas: any
}

export type LoansUpdate = {
  loan_offers: any
  loan_requests: any
  loans: any
}

export type SystemUpdate = {
  loans: LoansUpdate
  accounts: AccountsUpdate
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
type Medium = "BANK" | "ETH" | "ALGO" | "Wallet"

export type UserTransaction = {
  type: TxType
  amount: string
  createDate: string
  status: string
  destination: Medium
  source: Medium
  details: any
}
