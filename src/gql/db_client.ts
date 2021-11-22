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
import { UserBaseInfo, Repayment, LoanState } from "../lib/types"
import CircleClient from "./wallet/circle_client"
import { initializeGQL } from "./graphql_client"
import SwarmAIClient from "./swarmai_client"
import { unixTimestampToDateString, uuidv4 } from "lib/helpers"
import {
  loanStateToLoanInput,
  loanStateToUpdateInput,
  getLoanState,
  getTotalOutstanding,
  getTotalPaid,
  loanToTerms,
  loanAndNewStateToUpdate,
  requestToTokenMetadataParams
} from "lib/loan_helpers"
import { UpdateRequestType } from "pages/api/reconcile"
import {
  DEFAULT_APR,
  DEFAULT_LOAN_TENOR,
  DEFAULT_PENALTY_APR,
  COMPOUNDING_FREQ,
} from "lib/constant"
import { sleep, dateStringToUnixTimestamp } from "lib/helpers"
import AlgoClient from "gql/algo_client"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export default class DbClient {
  private static instance: DbClient

  public sdk: Sdk
  public gqlClient: GraphQLClient
  public swarmAIClient: SwarmAIClient
  public circleClient: CircleClient
  public algoClient: AlgoClient

  constructor(
    _client?: GraphQLClient,
    _swarmai_client?: SwarmAIClient,
    _circleClient?: CircleClient,
    _algoClient?: AlgoClient
  ) {
    if (DbClient.instance) {
      return DbClient.instance
    }
    this.gqlClient = _client || initializeGQL()
    this.swarmAIClient =
      _swarmai_client ||
      new SwarmAIClient(process.env.SWARMAI_URL || "http://localhost:3002")
    this.circleClient =
      _circleClient ||
      new CircleClient(process.env.CIRCLE_BASE_URL, process.env.CIRCLE_API_KEY)
    this.sdk = getSdk(this.gqlClient)
    this.algoClient =
      _algoClient ||
      new AlgoClient(process.env.ALGO_BACKEND_URL || "http://localhost:8001/v1", "sWUCzK7ZaT5E8zgWY95wUL1e6cNpJli5DzcwAYXsRpw")
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

    // tokenize loan
    const terms = {
      apr: DEFAULT_APR,
      principal: loanRequest.amount,
      tenorInDays: DEFAULT_LOAN_TENOR,
      startDate: Math.floor( Date.now() / 1000),
      compounding_frequency: "daily", // TODO
    }
    const loanParams = requestToTokenMetadataParams(newLoanId, loanRequest, terms)
    const {assetId} = await this.algoClient.tokenizeLoan(loanParams)
    console.log('new asset ', assetId)

    // TODO store loan on borrower Profile
    if (loanRequest.borrowerInfo.account_details.algorand?.address) {
        const txId = await this.algoClient.createNewProfile(assetId, "live", loanRequest.borrowerInfo.account_details.algorand.address)
        console.log('profile created with:', txId)
    } else {
      console.log('borrower has not opted in to our app, so no profile will be created')
    }

    return await this.sdk.FundLoanRequest({
      requestId,
      loan: {
        loan_id: newLoanId,
        asset_id: assetId,
        wallet_id: walletId,
        borrower: loanRequest.borrowerInfo.id,
        state: Loan_State_Enum.Live,
        principal: terms.principal,
        // HARDCODED for now
        // TODO input start_date as well
        compounding_frequency: COMPOUNDING_FREQ.daily,
        apr: terms.apr,
        penalty_apr: DEFAULT_PENALTY_APR,
        tenor: terms.tenorInDays,
        // -end
        principal_remaining: terms.principal,
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
      loan.wallet_info.id,
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
      txHash: data.transactionHash
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
   * - call loan-api to learn the current outstanding amount
   * - if there is money on the loan, forward the money to lenders (capping to max outstanding amount)
   * - create a repayment entry & update the loan-table
   * - TODO notify users if the new-state differs from old (e.g. new tx, new-loan-state...)
   */
  processLoanRepayments = async (
    loanId: string,
    currentDateTimestampUTC: number = 0
    ) => {
    const { loan } = await this.sdk.GetLoan({ loanId })
    const latestTransfers = await this.circleClient.getTransfers(
      "",
      "",
      loan.wallet_info.id
    )
    const repayments = latestTransfers
      .filter((t) => t.status == "complete")
      .map((t) => {
        return {
          amount: parseFloat(t.amount.amount),
          date: dateStringToUnixTimestamp(t.createDate),
          // txHash: t.transactionHash
        } as Repayment
      })
      try {
        const latestLoanState = await this.swarmAIClient.getLoanState(
          loanToTerms(loan),
          repayments,
          currentDateTimestampUTC
        )
        const actuallyPaid = getTotalPaid(loan.principal, latestLoanState)
        const forwardedToLenders = getTotalPaid(loan.principal, loan)
        const amountToBeForwardedToLenders = actuallyPaid - forwardedToLenders
        
        if (amountToBeForwardedToLenders) {
        // make a payment
          // TODO is just taking the latest transfer here a dangerous assumption?
          // it means we rely on circle always returning them sorted!
          const latestTransfer = latestTransfers[latestTransfers.length - 1]
          console.log('late', latestTransfer)
          const repaymentIdemKey = latestTransfer.id
          const loanWalletBalance = await this.circleClient.getBalance(
            loan.wallet_info.id
          )
          const maxToRepay = getTotalOutstanding(loan)
          const amountToRepay = Math.min(maxToRepay, loanWalletBalance)
          const { status, repaidAmount, txHash } = await this.forwardRepayment(
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
            // log repayment on loan-asset
            // - create object to be stored in the transaction note-field
            const dataToBeLogged = {
              newLoanState: update.newState.newLoanState,
              ...update.paymentInfo,
              txHashes: {
                toLoan: latestTransfer.txHash, // originating from somewhere into the loan-account (by borrower)
                toLenders: [txHash] // from the loan-account to the lenders (by us)
                // NOTE: if they do multiple repayments before we call this even once, then we the sum of the 
                // toLoan-txs might not add up to the sum of the toLenders-txs (because we only use the 
                // txHash from the latest repayment)
              }
            }
            console.log('logged:', dataToBeLogged)
            const {txId} = await this.algoClient.logRepayment(loan.asset_id, dataToBeLogged)
            
            // if repaid, & borrower has a credit profile -> mark loan as repaid on contract
            if (
              update.newState.newLoanState === Loan_State_Enum.Repaid &&
              loan.borrowerInfo.account_details.algorand?.address
            ) {
              // NOTE: currently not implemented on the smart-contract
              // const txId = await this.algoClient.updateProfile(loan.asset_id, 'repaid', loan.borrowerInfo.account_details.algorand.address)
            }
            return this.sdk.RegisterRepayment({
              loanId,
              repayment: {
                repayment_id: repaymentIdemKey,
                loan_id: loanId,
                repaid_principal: update.paymentInfo.repaidPrincipal,
                repaid_interest: update.paymentInfo.repaidInterest,
                date: new Date().toUTCString(),
                algorand_tx_id: txId
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
            // TODO what do we do here? how can we be sure that the payment will be registered?
          }
        } else {
            console.log("no payment outstanding, latest loan state matches db-state")
          }
      } catch (error) {
        console.log('couldnt query loan state', error)
        return {}
    }
  }

  /**
   * update all live loan Terms with the latest state from the swarmAI-api
   * @param loanId
   */

  doCompoundingUpdates = async () => {
    const { loans } = await this.sdk.GetLiveLoans()
    console.log("liveloans ", loans)
    await Promise.all(
      loans.map(async (loan) => {
        const latestLoanStateRaw = await this.swarmAIClient.getLoanState(
          loanToTerms(loan),
          loan.repayments.map((r) => {
            return {
              amount: r.repaid_interest + r.repaid_principal,
              date: dateStringToUnixTimestamp(r.date),
            }
          }) // as processed repayments
        )
        console.log("got ", latestLoanStateRaw)
        const latestLoanState = {
          ...latestLoanStateRaw,
          next_payment_due_date: unixTimestampToDateString(
            latestLoanStateRaw.next_payment_due_date
          ),
        } as LoanState
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
        console.log("pos", possibleInvestors)
        if (possibleInvestors.length > 0) {
          await this.fundLoanRequest(
            request.request_id,
            possibleInvestors[0].investor_id
          )
        }
      })
    )
  }

  /**
   * update our local balances in the user table with the balances from the circle
   */
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
    // create transfers into user accounts for deposits made into our master account
    // TODO when we allow fiat-repayments, deposits from borrowers need to be transfered to the respective loan-account
    await this.processDeposits()
    console.log('processed deposits')

    // update loan data (outstanding amounts) for all loans
    await this.doCompoundingUpdates()
    console.log('processed compounding updates')

    // send money from loan-wallets to lenders (fetches loan-state again), create repayments
    await this.processRepayments()
    console.log('processed repayments')

    // see if as a result of the updated balances, new loans can be funded
    await this.processOpenRequests()
    console.log('processed open requests')

    await this.updateAccountBalances() // < we should never rely on our local table...if so we should pull right before
    console.log('updating local balances')
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
