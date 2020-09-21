import { RiskParams } from "./types"

export const ANALYTICS_WEBSITE_IDS = {
  production: "de3e7d3b-c210-436b-a6ca-144fcc07a774",
  preview: "8c4e11cd-cd24-45a2-b33e-0f07da110e73",
}
export const USER_TYPE_KEY = "userType"
export const LAST_REDIRECT_PAGE = "lastPage"

export const DEFAULT_LOAN_TENOR = 6 // in months
export const DEFAULT_RISK_FREE_INTEREST_RATE = 0.5
export const DEFAULT_RECOMMENDATION_RISK_PARAMS: RiskParams = {
  beta_params: [5, 2],
  kumr_params: [4, 5],
}
