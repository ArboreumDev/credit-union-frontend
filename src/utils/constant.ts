import { RiskParams } from "../utils/types"

export const DEFAULT_LOAN_TENOR = 6 // in months
export const DEFAULT_RISK_FREE_INTEREST_RATE = 0.5
export const DEFAULT_RECOMMENDATION_RISK_PARAMS: RiskParams = {
  beta_params: [5, 2],
  kumr_params: [4, 5],
}
