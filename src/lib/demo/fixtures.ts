import { User, LoanRequest, LoanRequestStatus } from "../types"

export class Fixtures {
  static Lender: User = {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    name: "Deepika Padukone",
    email: "deepika@mail.com",
    phone: "+91 123-232-1231",
    user_type: "lender",
    balance: 0,
    corpus_share: 0,
    created_at: "2020-08-29T04:12:17.878911+00:00",
    kyc_approved: true,
    loan_requests: [],
    pledge_requests: [],
  }

  static Borrower: User = {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    name: "Amitabh Bachchan",
    email: "bigb@mail.com",
    phone: "+91 123-232-1231",
    user_type: "borrower",
    balance: 0,
    corpus_share: 0,
    created_at: "2020-08-29T04:12:17.878911+00:00",
    kyc_approved: false,
    loan_requests: [],
    pledge_requests: [],
  }

  static BorrowerKYCConfirmed: User = {
    ...Fixtures.Borrower,
    kyc_approved: true,
  }

  static LoanRequest: LoanRequest = {
    confirmation_date: null,
    payback_status: null,
    purpose: "Home loan",
    risk_calc_result: {
      latestOffer: {
        loan_info: {
          tenor: 6,
          borrower_apr: 8.190322,
        },
        loan_schedule: {
          corpus_view: null,
          borrower_view: {
            total_payments: {
              paid: 0,
              remain: 44290.565568,
            },
          },
        },
      },
    },
    status: "initiated",
    created_at: "2020-08-29T04:12:41.393094+00:00",
    amount: 120000,
    // supporters: []
    supporters: [
      {
        pledge_amount: 100,
        status: "confirmed",
      },
    ],
  }

  static LoanRequestNeedsConfirmation = {
    ...Fixtures.LoanRequest,
    status: LoanRequestStatus.awaiting_borrower_confirmation,
  }
  static LoanRequestLive = {
    ...Fixtures.LoanRequest,
    status: LoanRequestStatus.active,
  }

  static BorrowerLoanInitiated: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequest],
  }

  static BorrowerLoanNeedsConfirmation: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequestNeedsConfirmation],
  }

  static BorrowerLoanLive: User = {
    ...Fixtures.BorrowerKYCConfirmed,
    loan_requests: [Fixtures.LoanRequestLive],
  }

  static LenderWithPledgeRequest = {
    ...Fixtures.Lender,
    pledge_requests: [
      {
        request_id: "loan_req_id",
        pledge_amount: 5000,
        participation_request_time: "",
        loan_request: {
          ...Fixtures.LoanRequest,
          user: {
            email: "bigb@mail.com",
            name: "Amitabh Bachann",
          },
        },
      },
    ],
  }
}
