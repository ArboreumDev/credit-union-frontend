// generted from simple.json -> https://jvilk.com/MakeTypes/ -> tweaks

export interface System {
  state: State
  actions?: Action[]
}
export interface State {
  users: Users
  loan_requests?: null[] | null
  loans?: null[] | null
  lenders?: string[] | null
  borrowers?: string[] | null
  supporters?: string[] | null
  loan_offers: any
}
export interface Users {
  [username: string]: User
}
export interface User {
  id: string
  balance: number
  name: string
  email: string
  user_type: string
  demographic_info: DemographicInfo
  corpus_share: number
  encumbered_cash: number
  encumbered_portfolio: number
}
export interface DemographicInfo {
  education_years?: null
  income?: null
  credit_score?: null
}

export interface DemographicInfoBorrower {
  education_years: number
  income: number
  credit_score: number
}
export interface Action {
  action_type: string
  payload: any
}
export interface Terms {
  request_id: string
  borrower_info: BorrowerInfo
  tenor: number
  amount: number
  borrower_collateral: number
  num_annual_cmpnd_prds: number
  supporters?: SupportersEntity[] | null
}
export interface BorrowerInfo {
  borrower_id: string
  demographic_info: DemographicInfoBorrower
}
export interface SupportersEntity {
  supporter_id: string
  recommendation_risk: RecommendationRisk
  demographic_info?: null
  trust_amount: number
  apr_delta: number
}
export interface RecommendationRisk {
  kumr_params?: number[] | null
  beta_params?: number[] | null
}
