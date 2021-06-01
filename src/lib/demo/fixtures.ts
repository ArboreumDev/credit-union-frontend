import {
  User,
  LoanRequest,
  InvestmentOptions,
  InvestmentOptionInfo,
  InvestedLoan,
} from "../types"
import { Loan_Request_State_Enum, Loan_State_Enum } from "gql/sdk"

export class Fixtures {
  static Lender: User = {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    first_name: "Deepika Padukone",
    last_name: "",
    email: "deepika@mail.com",
    phone: "+91 123-232-1231",
    user_type: "lender",
    balance: 0,
    created_at: "2020-08-29T04:12:17.878911+00:00",
    kyc_approved: false,
    onboarded: false,
    loan_requests: [],
    approvedBorrowers: [],
    investedLoans: [],
    loans: [],
    loansToRepay: [],
  }

  static LenderOnboarded: User = {
    ...Fixtures.Lender,
    onboarded: true,
  }

  static LenderKYCApproved: User = {
    ...Fixtures.LenderOnboarded,
    kyc_approved: true,
  }

  static InvestOptionAvailable: InvestmentOptionInfo = {
    first_name: "Amitabh",
    last_name: "Bachann",
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    loan_requests: [
      {
        amount: 90000,
        state: Loan_Request_State_Enum.Active,
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
        purpose: "Educational expense",
      },
    ],
  }

  static InvestOptionFulfilled: InvestmentOptionInfo = {
    ...Fixtures.InvestOptionAvailable,
    loan_requests: [
      {
        amount: 90000,
        state: Loan_Request_State_Enum.Fulfilled,
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
        purpose: "Educational expense",
      },
    ],
  }

  // static LenderWithInvestment: User = {
  //   ...Fixtures.LenderKYCApproved
  // }

  // static InvestOptions: InvestmentOptions = [ Fixtures.InvestOptionAvailable ]

  static Borrower: User = {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    first_name: "Amitabh",
    last_name: "Bachchan",
    email: "bigb@mail.com",
    phone: "+91 123-232-1231",
    user_type: "borrower",
    balance: 0,
    created_at: "2020-08-29T04:12:17.878911+00:00",
    kyc_approved: false,
    approvedBorrowers: [],
    investedLoans: [],
    loan_requests: [],
    loans: [],
    loansToRepay: [],
  }

  // TODO: think about when and how to make borrowers wait for kyc-appoval
  // current decision is to let them request a loan immediately
  static BorrowerOnboarded: User = {
    ...Fixtures.Borrower,
    onboarded: true,
  }

  static BorrowerKYCConfirmed: User = {
    ...Fixtures.BorrowerOnboarded,
    kyc_approved: true,
  }

  // TODO make these fixtures more modular by resuing them
  //   request_id: "2466df66-ef1c-4e82-ad21-70943dcecaf6",
  //   purpose: "Home Repair",
  //   state: Loan_Request_State_Enum.Active,
  //   // created_at: "2020-08-29T04:12:41.393094+00:00",
  //   amount: 90000,
  // }
  static LoanRequest: LoanRequest = {
    request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
    amount: 90000,
    purpose: "Educational expense",
    state: Loan_Request_State_Enum.Active,
  }

  static LoanRequestFulfilled = {
    ...Fixtures.LoanRequest,
    status: Loan_Request_State_Enum.Fulfilled,
  }

  // TODO add other states
  // static LoanRequest??? = {
  //   ...Fixtures.LoanRequest,
  //   status: Loan_Request_State_Enum.Active,
  // }

  static LoanLiveRepayInfo = {
    principal_remaining: 90000,
    principal_overdue: 0,
    interest_accrued: 100,
    next_payment_amount: 1300,
    next_payment_due_date: "2021-08-29T04:12:17.878911+00:00",
  }

  static LoanPartiallyRepaidRepayInfo = {
    principal_remaining: 60000,
    interest_accrued: 200,
    interest_paid: 100,
    next_payment_amount: 1300,
  }

  static LoanOverdueRepayInfo = {
    principal_remaining: 62000,
    principal_overdue: 2000,
    interest_accrued: 220,
    interest_paid: 100,
    next_payment_amount: 1320,
  }

  static LoanRepaidRepayInfo = {
    principal_remaining: 0,
    interest_accrued: 0,
    interest_paid: 930,
    next_payment_amount: 0,
  }

  static LoanDefaultRepayInfo = {
    principal_remaining: 30000,
    interest_accrued: 3000,
    interest_paid: 930,
    next_payment_amount: 0,
  }

  static LoanLive = {
    state: Loan_State_Enum.Live,
    loan_id: "5576df66-ef1c-4e82-ad21-70943dcecaf6",
    principal: 90000,
    interest_paid: 0,
    tenor: 6,
    loanRequest: {
      purpose: "Educational expense",
    },
    ...Fixtures.LoanLiveRepayInfo,
  }

  static LoanPartiallyRepaid = {
    ...Fixtures.LoanLive,
    ...Fixtures.LoanPartiallyRepaidRepayInfo,
  }

  static LoanOverdue = {
    ...Fixtures.LoanLive,
    ...Fixtures.LoanOverdueRepayInfo,
  }

  static LoanRepaid = {
    ...Fixtures.LoanLive,
    ...Fixtures.LoanRepaidRepayInfo,
    state: Loan_State_Enum.Repaid,
  }

  static LoanDefaulted = {
    // this is just a guess how that loan would look like:
    ...Fixtures.LoanPartiallyRepaid,
    state: Loan_State_Enum.Default,
    principal_overdue: 3000,
    next_payment_amount: 0,
  }

  static InvestedLoanLive: InvestedLoan = {
    amount_lent: 8000,
    loan: {
      loan_id: Fixtures.LoanLive.loan_id,
      tenor: Fixtures.LoanLive.tenor,
      principal: Fixtures.LoanLive.principal,
      state: Loan_State_Enum.Live,
      borrowerInfo: {
        first_name: Fixtures.Borrower.first_name,
        last_name: Fixtures.Borrower.last_name,
      },
    },
  }

  static LenderWithApprovedInvestmentOption: User = {
    ...Fixtures.LenderKYCApproved,
    approvedBorrowers: [Fixtures.InvestOptionFulfilled.id],
  }

  static LenderWithActiveInvestment: User = {
    ...Fixtures.LenderWithApprovedInvestmentOption,
    investedLoans: [Fixtures.InvestedLoanLive],
  }

  static BorrowerWithActiveRequest = {
    ...Fixtures.Borrower,
    loan_requests: [Fixtures.LoanRequest],
  }

  static BorrowerLoanInitiated: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequest],
  }

  static BorrowerLoanLive: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequestFulfilled],
    loans: [Fixtures.LoanLive],
    loansToRepay: [Fixtures.LoanLiveRepayInfo],
  }
  static BorrowerLoanOverdue: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequestFulfilled],
    loans: [Fixtures.LoanOverdue],
    loansToRepay: [Fixtures.LoanOverdueRepayInfo],
  }

  static BorrowerLoanRepaid: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequestFulfilled],
    loans: [Fixtures.LoanRepaid],
  }

  static BorrowerLoanDefaulted: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequestFulfilled],
    loans: [Fixtures.LoanDefaulted],
    // ?? will we show defaulted loans as loans to be repaid?
  }

  static LenderWithInvestments = {
    ...Fixtures.Lender,
    balance: 50000,
    investedLoans: [
      {
        amount_lent: 50000,
        loan_id: "2d3b8514-38c2-461f-a6ec-470a72bae0b5",
        loan: {
          tenor: 6,
          principal: 50000,
          state: Loan_State_Enum.Live,
          borrowerInfo: {
            first_name: "Amitabh",
            last_name: "Bachchan",
          },
        },
      },
    ],
  }
}
