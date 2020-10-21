import { RiskParams } from "./types"

// for local development
// export const DEV_URL = "http://127.0.0.1:3001"
export const ANALYTICS_WEBSITE_IDS = {
  production: "c0dca8db-6303-4e1b-bb29-3422514663e9",
  preview: "90f23cc8-c238-4f5c-876a-c83f66335036",
}

// Local Storage Keys
export const USER_TYPE_KEY = "userType"
export const LAST_REDIRECT_PAGE = "lastPage"
export const COMPANY_NAME = "companyName"

export const DEFAULT_COMPANY_NAME = "XCorp"

// Hardcoded loan vars. TODO: move to swarmai?
export const MIN_SUPPORT_RATIO = 0.2 // this will be pilot-specific -> refactor to pilot.env file
export const DEFAULT_LOAN_TENOR = 6 // in months
export const DEFAULT_RISK_FREE_INTEREST_RATE = 0.5
export const DEFAULT_RECOMMENDATION_RISK_PARAMS: RiskParams = {
  beta_params: [5, 2],
  kumr_params: [4, 5],
}

export enum LogEventTypes {
  ClientWebVitals = "client_web_vitals",
  ClientError = "client_error",
  ClientLog = "client_log",
  ClientFeedback = "client_feedback",
  FPPush = "fp_push",
}

export const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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"

// TODO: use actual user demographics when in production
export const USER_DEMOGRAPHIC = {
  yearsOfEducation: 3,
  income: 300,
  creditScore: 600,
}
