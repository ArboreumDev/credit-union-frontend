import { tryGetPreviewData } from "next/dist/next-server/server/api-utils"

export type SessionUser = {
  name: string
  email: string
  image?: string
}

export type Session = {
    user: SessionUser
    accessToken: string
    expires: string
}

export enum UserType {
    Borrower="borrower",
    Lender="lender"
}

export type User = {
  name: string
  email: string
  phone: string
  user_type: UserType
  user_number?: number
  balance?: number
  demographic_info?: any
}

// TYPES FROM GRAPHQL
// TODO @PARUTHI, maybe those can be generated with: https://graphql-code-generator.com/docs/plugins/typescript
export enum EdgeStatus {
    active="active",
    awaiting_lender_confirmation="awaiting_lender_confirmation",
    rejected="rejected",
    historic="historic"
}

export enum LoanRequestStatus {
    initiated="initiated",
    // awaiting_guarantor_confirmation="awaiting_guarantor_confirmation",
    awaiting_borrower_confirmation="awaiting_borrower_confirmation",
    live="live",
    settled="settled"
    // TODO add more
}

// TODO map these into typescript
// borrower: {}
type LenderInfo = {
    lender_id: string
    amount: number
    interest_rate: number
}

type LenderInput = {
    request_id: string
    lender_id: string
    amount: number
    interest_rate: number

}

export type AiResult = {
    borrower: any
    lenders: [LenderInfo]
}