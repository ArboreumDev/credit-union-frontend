import { DbClient } from "../gql/db_client"
import { GetUserByEmailQuery } from "../../src/gql/sdk"

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

// =========== the following types mirror the types expected by the swarmAI module ========
export type SupporterInfo = {
  supporter_id: string
  trust_amount: number
  recommendation_risk: RiskParams
}

// this type mirrors the type expected by the swarmAI module
export type BorrowerInfo = {
  borrower_id: string
  education_years: number
  income: number
  credit_score: number
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

export type RiskInput = {
  central_risk_info: RiskParams
}

export type OptimizerContext = {
  risk_free_interest_rate?: number
  supporter_corpus_share: number
  loans_in_corpus: LiveLoanInfo[]
  corpus_cash: number
  novation: boolean
}

export type LoanRequestInfo = {
  borrower_info: BorrowerInfo
  request_id: string
  tenor: number
  amount: number
  supporters: SupporterInfo[]
  risk_params?: RiskParams
}

export type SwarmAiRequestMessage = {
  loan_request_info: LoanRequestInfo
  risk_assessment_context: RiskInput
  optimizer_context: OptimizerContext
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
  live = "live",
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
