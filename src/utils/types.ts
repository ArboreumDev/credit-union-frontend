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

export type JWTToken = {
  name: string
  email: string
  user?: User
}

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
