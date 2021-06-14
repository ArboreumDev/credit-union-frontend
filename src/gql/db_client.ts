import { GraphQLClient } from "graphql-request"
import {
  getSdk,
  Sdk,
  Loan_State_Enum,
  Update_Type_Enum,
  GetLoanQuery,
  Update_Log_Insert_Input,
} from "../../src/gql/sdk"

import { LogEventTypes as LogEventType } from "../lib/constant"
import { UserBaseInfo, Repayment } from "../lib/types"
import CircleClient from "./wallet/circle_client"
import { initializeGQL } from "./graphql_client"
import SwarmAIClient from "./swarmai_client"
import { uuidv4 } from "lib/helpers"
import {
  loanStateToLoanInput,
  loanStateToUpdateInput,
  getLoanState,
  getTotalOutstanding,
  getTotalPaid,
  loanToTerms,
  loanAndNewStateToUpdate,
} from "lib/loan_helpers"
import { UpdateRequestType } from "pages/api/reconcile"
import {
  DEFAULT_APR,
  DEFAULT_LOAN_TENOR,
  DEFAULT_PENALTY_APR,
  COMPOUNDING_FREQ,
} from "lib/constant"
import { sleep } from "../../tests/src/circle/transfer.integration.test"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export default class DbClient {
  private static instance: DbClient

  public sdk: Sdk
  public gqlClient: GraphQLClient
  public swarmAIClient: SwarmAIClient
  public circleClient: CircleClient

  constructor(
    _client?: GraphQLClient,
    _swarmai_client?: SwarmAIClient,
    _circleClient?: CircleClient
  ) {
    if (DbClient.instance) {
      return DbClient.instance
    }
    this.gqlClient = _client || initializeGQL()
    this.swarmAIClient =
      _swarmai_client ||
      new SwarmAIClient(process.env.SWARMAI_URL || "http://localhost:3001")
    this.circleClient =
      _circleClient ||
      new CircleClient(process.env.CIRCLE_BASE_URL, process.env.CIRCLE_API_KEY)
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

  doCircleTransfer = async (
    fromId: string,
    toId: string,
    amount: number,
    idemKey = ""
  ) => {
    const from = await this.sdk.GetAccountDetails({ id: fromId })
    const to = await this.sdk.GetAccountDetails({ id: toId })
    if (from.user.kyc_approved && to.user.kyc_approved) {
      return await this.circleClient.walletTransfer(
        from.user.account_details.circle.walletId,
        to.user.account_details.circle.walletId,
        amount,
        idemKey
      )
    } else {
      // handle htis more eelegantly
      throw "users not kyced!"
    }
  }

  getCircleBalance = async (userId: string) => {
    const { user } = await this.sdk.GetAccountDetails({ id: userId })
    return this.circleClient.getBalance(user.account_details.circle.walletId)
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
    // for now, just change the lender balance
    // await this.sdk.ChangeUserCashBalance({
    //   userId: lenderId,
    //   delta: -loanRequest.amount,
    // })
    const data = await this.doCircleTransfer(
      lenderId,
      loanRequest.borrowerInfo.id,
      loanRequest.amount,
      newLoanId
    )
    // How to only advance if this transfer actually went through?
    const res = await this.circleClient.getTransferById(data.id)
    if (res.status === "pending") {
      console.log("yay!")
    }

    // TODO get what needs to be repaid
    const schedule = {
      // DUMMY VALUES
      interest_paid: 0,
      interest_accrued: 0,
      next_payment_amount: loanRequest.amount / DEFAULT_LOAN_TENOR,
      // Note: this needs to be UTC
      next_payment_due_date: new Date(2021, 9, 1),
    }
    // create Circle-wallet for the loan
    const { walletId } = await this.circleClient.createAccount({
      idempotencyKey: newLoanId,
      description: "loan account",
    })

    return await this.sdk.FundLoanRequest({
      requestId,
      loan: {
        loan_id: newLoanId,
        wallet_id: walletId,
        borrower: loanRequest.borrowerInfo.id,
        state: Loan_State_Enum.Live,
        principal: loanRequest.amount,
        // HARDCODED for now
        compounding_frequency: COMPOUNDING_FREQ.monthly,
        apr: DEFAULT_APR,
        penalty_apr: DEFAULT_PENALTY_APR,
        tenor: DEFAULT_LOAN_TENOR,
        // -end
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
   * forward a repayment that happened on a loan to its lenders
   * register in repayments_table
   * update loan-table entry
   * create update-log entry
   * @param loanId
   * @param amount
   * @param idemKey
   * @returns
   */
  forwardRepayment = async (loanId: string, amount: number, _idemKey = "") => {
    const { loan }: GetLoanQuery = await this.sdk.GetLoan({ loanId })
    const idemKey = _idemKey || uuidv4()

    // TODO proportional to how the lenders funded it (for now: everything to first lender)
    await this.circleClient.walletTransfer(
      loan.wallet_id,
      loan.lender_amounts[0].lenderInfo.account_details.circle.walletId,
      amount,
      idemKey
    )
    // TODO this is inelegant
    sleep(200)
    const data = await this.circleClient.getTransferById(idemKey)
    return {
      status: data.status,
      repaidAmount: parseFloat(data.amount.amount),
    }
  }

  get allUsers() {
    return (async () => {
      const { user: allUsers } = await this.sdk.GetAllUsers()
      return allUsers
    })()
  }

  processUpdateRequest = async (
    updateType: UpdateRequestType,
    userId: string,
    payload: any
  ) => {
    switch (updateType) {
      case "BANKDEPOSIT": {
        this.processDeposits()
        break
      }
      case "BLOCKCHAINDEPOSIT":
      case "OPENREQUEST": {
        await this.processOpenRequests(userId)
        break
      }
      case "REPAYMENT": {
        await this.processRepayments()
        break
      }
      case "COMPOUND": {
        await this.doCompoundingUpdates()
        break
      }
    }
  }

  /**
   * - get all latest deposists into our circle masterwallet.
   * - credit the correct investor-wallet (identified by the source-id of the deposit)
   * NOTE:by default and without pagination managemnt from our side, it will only fetch the last 1000 or so
   * so for now we assume that we call this function daily and that we have <1000 deposits a day
   */
  processDeposits = async () => {
    (await this.allUsers).forEach(async (user: UserBaseInfo) => {
      await this.circleClient.processDeposits(
        user.account_details.circle.accountId,
        user.account_details.circle.walletId
      )
    })
  }

  /**
   * - process Repayments for all or one loan
   */
  processRepayments = async (loanId = "") => {
    const updated = []
    if (!loanId) {
      // run for all loans
      const { loans } = await this.sdk.GetLiveLoans()
      await Promise.all(
        loans.map(async (l) => {
          updated.push(await this.processLoanRepayments(l.loan_id))
        })
      )
    } else {
      updated.push(await this.processLoanRepayments(loanId))
    }
    return updated
  }

  /*
   * - figure out the new adjusted terms of the loan (taking the array of repayments as input)
   * - if there is money on the loan, forward the money to lenders (capping to max outstanding amount)
   * - TODO notify users if the new-state differs from old (e.g. new tx, new-loan-state...)
   */
  processLoanRepayments = async (loanId: string) => {
    const { loan } = await this.sdk.GetLoan({ loanId })
    const latestTransfers = await this.circleClient.getTransfers(
      "",
      "",
      loan.wallet_id
    )
    const repayments = latestTransfers
      .filter((t) => t.status == "complete")
      .map((t) => {
        return {
          amount: parseFloat(t.amount.amount),
          date: t.createDate,
        } as Repayment
      })
    const latestLoanState = await this.swarmAIClient.getLoanState(
      loanToTerms(loan),
      repayments
    )

    const actuallyPaid = getTotalPaid(loan.principal, latestLoanState)
    const forwardedToLenders = getTotalPaid(loan.principal, loan)
    const amountToBeForwardedToLenders = actuallyPaid - forwardedToLenders

    if (amountToBeForwardedToLenders) {
      // make a payment
      // TODO is just taking the latest transfer here a dangerous assumption?
      // it means we rely on circle always returning them sorted!
      const repaymentIdemKey = latestTransfers[latestTransfers.length - 1].id
      const loanWalletBalance = await this.circleClient.getBalance(
        loan.wallet_id
      )
      const maxToRepay = getTotalOutstanding(loan)
      const amountToRepay = Math.min(maxToRepay, loanWalletBalance)
      const { status, repaidAmount } = await this.forwardRepayment(
        loan.loan_id,
        amountToRepay,
        repaymentIdemKey
      )
      if (status == "complete") {
        // update loan entry in db & create repayment entry
        const update = {
          newState: {
            ...loanStateToLoanInput(latestLoanState),
            // should this maybe happen in the backend too? (once we nail down the states!!)
            newLoanState: getLoanState(latestLoanState),
          },
          paymentInfo: {
            // TODO how the amount was used to repay principal vs interest?
            repaidPrincipal: repaidAmount,
            repaidInterest: 0,
          },
        }
        return this.sdk.RegisterRepayment({
          loanId,
          repayment: {
            repayment_id: repaymentIdemKey,
            loan_id: loanId,
            repaid_principal: update.paymentInfo.repaidPrincipal,
            repaid_interest: update.paymentInfo.repaidInterest,
            date: new Date().toUTCString(),
          },
          ...update.newState,
          updateLog: {
            type: Update_Type_Enum.Repayment,
            loan_id: loanId,
            ...loanStateToUpdateInput(latestLoanState),
            // only add new state to update if there was a change
            ...(update.newState.newLoanState !== loan.state
              ? { new_state: update.newState.newLoanState }
              : {}),
            repayment_id: repaymentIdemKey,
          },
        })
      } else {
        console.log("payment is not yet complete, status: ", status)
      }
    } else {
      console.log("no payment outstanding, latest loan state matches db-state")
    }
  }

  /**
   * update all live loan Terms with the latest state from the swarmAI-api
   * @param loanId
   */

  doCompoundingUpdates = async () => {
    const { loans } = await this.sdk.GetLiveLoans()
    await Promise.all(
      loans.map(async (loan) => {
        const latestLoanState = await this.swarmAIClient.getLoanState(
          loanToTerms(loan),
          loan.repayments.map((r) => {
            return {
              amount: r.repaid_interest + r.repaid_principal,
              date: r.date,
            }
          }) // as processed repayments
        )
        const newLoanState = getLoanState(latestLoanState)
        await this.sdk.UpdateLoan({
          loanId: loan.loan_id,
          ...loanStateToLoanInput(latestLoanState),
          newLoanState,
        })
        await this.sdk.LogUpdate({
          update: loanAndNewStateToUpdate(
            loan,
            latestLoanState,
            Update_Type_Enum.Compound,
            newLoanState
          ),
        })
      })
    )
  }

  /**
   * go through all requests that are live and check if
   * - there is a lender that has approved the borrower AND who has sufficient balance
   * -> fund loan
   * NOTE: lets asssume we do this every 12h or every 24h
   */
  processOpenRequests = async (approvedByLender = "all") => {
    // update all users balances
    // ( while i think its better to use circle as source of truth, I thought in this case it would be better to do just fetch the
    // balance once per lender instead of redoing it for every open loan request
    await this.updateAccountBalances()
    const { activeRequests } = await this.sdk.GetOpenRequests()
    await Promise.all(
      activeRequests.map(async (request) => {
        const possibleInvestors = request.creditors.approved.filter(
          (c) => c.account.balance > request.amount
        )
        if (possibleInvestors.length > 0) {
          await this.fundLoanRequest(
            request.request_id,
            possibleInvestors[0].investor_id
          )
        }
      })
    )
  }

  updateAccountBalances = async () => {
    const { user } = await this.sdk.GetAllUsers()
    await Promise.all(
      user
        .filter((u) => u.kyc_approved && u.account_details?.circle?.walletId)
        .map(async (u) => {
          await this.sdk.UpdateUserBalance({
            userId: u.id,
            newBalance: await this.circleClient.getBalance(
              u.account_details.circle.walletId
            ),
          })
        })
    )
  }

  /**
   * balance increases can come from
   * - 1) repayments
   * - 2) deposits via master wallet (triggered by us)
   * - 3) direct deposits from external crypto accounts (see below)
   * TODO: notify User
   */
  processBalanceIncrease = async (lender = "all") => {
    // can by caused by a crypto-deposit, which will go directly into a lender Wallet
    // ?? when to trigger that?
    // processOpenRequests will ultimately have the same consequences, so
    console.log("todo")
  }

  /**
   * direct deposit into lender account
   * get transfer where lender wallet is target_id, see if they originate from a blockchain
   * BUT: how do we know that a transfer is newly credited? => maybe if its date is no older than 24?
   * @param lender
   */
  processDirectDeposits = async (lender = "all") => {
    console.log("todo")
  }

  /**
   * lets do a smart combination of the above functions
   */
  reconcile = async () => {
    console.log("todo")
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
