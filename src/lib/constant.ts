import { RiskParams } from "./types"

export const ANALYTICS_WEBSITE_IDS = {
  production: "c0dca8db-6303-4e1b-bb29-3422514663e9",
  preview: "90f23cc8-c238-4f5c-876a-c83f66335036",
}
export const USER_TYPE_KEY = "userType"

export const DEFAULT_LOAN_TENOR = 6 // in months
export const DEFAULT_RISK_FREE_INTEREST_RATE = 0.5
export const DEFAULT_RECOMMENDATION_RISK_PARAMS: RiskParams = {
  beta_params: [5, 2],
  kumr_params: [4, 5],
}
