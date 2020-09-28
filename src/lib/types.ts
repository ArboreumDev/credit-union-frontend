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

// TODO @djudjuu
export type CalculatedRisk = {
  loanTerm: number
  interestRate: number
  totalDue: number
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
}

export type Scenario = {
  users: any // TODO should be Dict[str, UserInfo]
  loans: any // TODO
  loan_requests: any // TODO
}

export type SupporterInfo = {
  supporter_id: string
  trust_amount: number
  recommendation_risk: RiskParams
  demographic_info?: DemographicInfo
}

// this type mirrors the type expected by the swarmAI module
export type BorrowerInfo = {
  borrower_id: string
  demographic_info: DemographicInfo
}

export type LiveLoanInfo = {
  loan_id: string
  interest: number
  kumr_params: KumrParams
  amount_owned_portfolio: number
  amount_owned_supporters: number
  time_remaining: number
  loan_schedule: any
}

export type LoanInfo = {
  request_id: string
  tenor: number
  amount: number
  num_annual_cmpnd_prds: number
  borrower_apr: number
  borrower_collateral: number
  corpus_apr: number
  supporter_apr: number
  supporter_share: number
  supporter_cash_encumbered: number
  supporter_portfolio_encumbered: number
  supporter_lag: number
  penalty_apr: number
  repayments?: number[]
  loan_schedule?: any
  desired_irr?: number
}

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

export type LoanRequestInfo = {
  borrower_info: BorrowerInfo
  request_id: string
  tenor: number
  amount: number
  borrower_collateral: number
  supporters: SupporterInfo[]
  risk_params?: RiskParams
}

export type SwarmAiRequestMessage = {
  loan_request_info: LoanRequestInfo
  risk_assessment_context?: RiskInput
  optimizer_context?: OptimizerContext
}

export type SwarmAiResponse = {
  loan_request_info: LoanRequestInfo
  corpus_share: number
  loan_info: LoanInfo
  loan_schedule?: LoanSchedule
}

export type LoanSchedule = {
  borrower_view: any
  next_borrower_payment: number
  supporter_view?: any
  corpus_view?: any
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
}

export enum SupporterStatus {
  unknown = "unknown",
  rejected = "rejected",
  confirmed = "confirmed",
}

export type PortfolioUpdate = {
  userId: string
  balanceDelta: number
  shareDelta: number
  alias?: string
}

export type AccountsUpdate = {
  updates: any //PortfolioUpdate[]
  transactions: any
}
