import { User, LoanRequest, LoanRequestStatus, CalculatedRisk } from "../types"

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
    pledges: [],
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
    pledges: [],
  }

  static BorrowerKYCConfirmed: User = {
    ...Fixtures.Borrower,
    kyc_approved: true,
  }
  static RiskCalcResult: CalculatedRisk = {
    latestOffer: {
      loan_info: {
        tenor: 6,
        amount: 10000,
        corpus_apr: 8.501942,
        repayments: [],
        request_id: "de8af3ab-32f9-4b9a-8ed7-0582ef7684c2",
        penalty_apr: 0.055,
        borrower_apr: 8.190322,
        borrower_info: {
          borrower_id: "ad90f443-8510-40e0-a041-c325a419cff4",
          demographic_info: {
            income: 300,
            credit_score: 450,
            education_years: 3,
          },
        },
        supporter_apr: 7.878703,
        supporter_lag: 1,
        supporter_share: 0,
        borrower_collateral: 0,
        num_annual_cmpnd_prds: 12,
        supporter_cash_encumbered: 0,
        supporter_portfolio_encumbered: 0,
      },
      corpus_share: 1,
      loan_schedule: {
        corpus_view: null,
        borrower_view: {
          total_payments: { paid: 0, remain: 44290.565568 },
          corpus_interest: { paid: 0, remain: 34290.56557 },
          corpus_principal: { paid: 0, remain: 10000 },
          supporter_interest: { paid: 0, remain: 0 },
          borrower_collateral: { paid: 0, remain: 0 },
          supporter_principal: { paid: 0, remain: 0 },
        },
        supporter_view: null,
        next_borrower_payment: 7381.760928,
      },
      loan_request_info: {
        tenor: 6,
        amount: 10000,
        novation: false,
        apr_delta: 1.1,
        request_id: "de8af3ab-32f9-4b9a-8ed7-0582ef7684c2",
        supporters: [],
        risk_params: null,
        borrower_info: {
          borrower_id: "ad90f443-8510-40e0-a041-c325a419cff4",
          demographic_info: {
            income: 300,
            credit_score: 450,
            education_years: 3,
          },
        },
        borrower_collateral: 0,
        num_annual_cmpnd_prds: 12,
      },
    },
  }

  static LoanRequest: LoanRequest = {
    request_id: "2466df66-ef1c-4e82-ad21-70943dcecaf6",
    confirmation_date: null,
    payback_status: null,
    purpose: "Home Repair",
    risk_calc_result: Fixtures.RiskCalcResult,
    status: "initiated",
    created_at: "2020-08-29T04:12:41.393094+00:00",
    amount: 90000,
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

  static LenderWithInvestments = {
    ...Fixtures.Lender,
    balance: 10000,
    corpus_share: 1000,
    pledges: [
      {
        request_id: "loan_req_id",
        pledge_amount: 5000,
        participation_request_time: "",
        loan_request: {
          ...Fixtures.LoanRequest,
          user: {
            email: "gp@arboreum.dev",
            name: "Gaurav",
          },
        },
      },
    ],
  }

  static LenderWithPledgeRequest = {
    ...Fixtures.LenderWithInvestments,
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
