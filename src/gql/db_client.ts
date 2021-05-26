import { GraphQLClient } from "graphql-request"
import {
  getSdk,
  Sdk,
  Loan_State_Enum,
  Action_Type_Enum,
  Update_Type_Enum,
} from "../../src/gql/sdk"

import {
  DEFAULT_RECOMMENDATION_RISK_PARAMS,
  LogEventTypes as LogEventType,
  MIN_SUPPORT_RATIO,
} from "../lib/constant"
import {
  createStartLoanInputVariables,
  generateUpdateAsSingleTransaction,
} from "../lib/loan_helpers"
import {
  BorrowerInfo,
  DemographicInfo,
  PortfolioUpdate,
  Scenario,
  SupporterInfo,
  SupporterStatus,
  UserInfo,
  LoanRequestInfo,
  LoanInfo,
  LoanOffer,
  LoanRequestStatus,
  SystemUpdate,
  UserType,
  LoanState,
} from "../lib/types"
import DecentroClient from "./wallet/decentro_client"
import { initializeGQL } from "./graphql_client"
import SwarmAIClient from "./swarmai_client"
import { uuidv4 } from "lib/scenario"
import {
  DEFAULT_APR,
  DEFAULT_LOAN_TENOR,
  DEFAULT_PENALTY_APR,
} from "lib/constant"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export default class DbClient {
  private static instance: DbClient

  public sdk: Sdk
  public gqlClient: GraphQLClient
  public swarmAIClient: SwarmAIClient
  public decentroClient: DecentroClient

  constructor(_client?: GraphQLClient, _swarmai_client?: SwarmAIClient) {
    if (DbClient.instance) {
      return DbClient.instance
    }
    this.gqlClient = _client || initializeGQL()
    this.swarmAIClient =
      _swarmai_client ||
      new SwarmAIClient(process.env.SWARMAI_URL || "http://localhost:3001")
    this.sdk = getSdk(this.gqlClient)
    DbClient.instance = this
  }

  getUserByEmail = async (email: string) => {
    const data = await this.sdk.GetUserByEmail({ email })
    const user = data.user[0]
    return user
  }

  /**
   * called with borrower Id to create loan-request also create entries for guarantor requests
   * (mark those confirmed for now, later this would then require an extra step)
   * NOTE: this assumes that the borrower has no other active request
   * @param borrower_id go
   * @param amount
   * @param purpose
   * @param msg
   */
  createLoanRequest = async (
    borrower_id: string,
    amount: number,
    purpose: string
  ) => {
    const { loanRequest } = await this.sdk.CreateLoanRequest({
      request: {
        borrower_id,
        amount,
        purpose,
      },
    })
    // potentially do other stuff here (notify us...)
    return { loanRequest }
  }

  /**
   * Finalize table entry in loan_request-table
   * create a new row in loan-table
   * mark lender as participant in loan_amounts-table
   * inititate fund transfer
   * @param requestId
   * @param lenderId
   */
  fundLoanRequest = async (requestId: string, lenderId: string) => {
    const { loanRequest } = await this.sdk.GetLoanRequest({ requestId })
    const newLoanId = uuidv4()

    // TODO actually fund request with amount, using loanId as reference

    // TODO get what needs to be repaid
    const schedule = {
      // DUMMY VALUES
      interest_paid: 0,
      interest_accrued: 0,
      next_payment_amount: loanRequest.amount / DEFAULT_LOAN_TENOR,
      // Note: this needs to be UTC
      next_payment_due_date: new Date(2021, 9, 1),
    }

    return this.sdk.FundLoanRequest({
      requestId,
      loan: {
        loan_id: newLoanId,
        borrower: loanRequest.borrowerInfo.id,
        state: Loan_State_Enum.Live,
        principal: loanRequest.amount,
        apr: DEFAULT_APR,
        penalty_apr: DEFAULT_PENALTY_APR,
        tenor: DEFAULT_LOAN_TENOR,
        principal_remaining: loanRequest.amount,
        loan_request: loanRequest.request_id,
        ...schedule,
      },
      lenderAmounts: [
        {
          loan_id: newLoanId,
          lender_id: lenderId,
          amount_lent: loanRequest.amount,
        },
      ],
    })
  }

  /**
   * execute payment on ledger provider
   * register in repayments_table
   * update loan-table entry
   * create update-log entry
   * @param loanId
   * @param amount
   * @returns
   */
  makeRepayment = async (loanId: string, amount: number) => {
    // TODO try execturing payment of 'amount' on circle
    const { loan } = await this.sdk.GetLoan({ loanId })
    // TODO get new loan state & split how the amount was used to repay
    const update = {
      newState: {
        newPrincipalRemaining: loan.principal_remaining - amount,
        newLoanState:
          loan.principal_remaining - amount > 0
            ? Loan_State_Enum.Live
            : Loan_State_Enum.Repaid,
      },
      paymentInfo: {
        repaidPrincipal: amount,
      },
    }
    const repaymentId = uuidv4()
    return this.sdk.RegisterRepayment({
      loanId,
      repayment: {
        repayment_id: repaymentId,
        loan_id: loanId,
        repaid_principal: update.paymentInfo.repaidPrincipal,
      },
      ...update,
      updateLog: {
        type: Update_Type_Enum.Repayment,
        loan_id: loanId,
        new_principal_remain: update.newState.newPrincipalRemaining,
        new_state: update.newState.newLoanState,
        repayment_id: repaymentId,
      },
    })
  }

  get allUsers() {
    return (async () => {
      const { user: allUsers } = await this.sdk.GetAllUsers()
      return allUsers
    })()
  }

  logEvent = async (
    eventType: LogEventType,
    eventData?: any,
    headers?: any,
    userId?: string
  ) => {
    const event = {
      headers: headers,
      data: eventData,
      user_id: userId,
      event_type: eventType,
    }
    const res = await this.sdk.InsertEvent({ event })
    return res.insert_events_one
  }
}
