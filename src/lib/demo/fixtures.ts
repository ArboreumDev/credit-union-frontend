import {
  User,
  LoanRequest,
  LoanRequestStatus,
  CalculatedRisk,
  LoanInfo,
} from "../types"

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
    request_data: {
      loan_request_info: {
        borrower_info: {
          borrower_id: "546a77b0-be3f-4071-8727-fb7fe24947dd",
          demographic_info: {
            education_years: 3,
            income: 300,
            credit_score: 600.0,
          },
        },
        request_id: "4e065ae6-5629-4171-8e49-9b6a5920054e",
        tenor: 6.0,
        amount: 50000.0,
        borrower_collateral: 0.0,
        num_annual_cmpnd_prds: 12,
        supporters: [
          {
            supporter_id: "c4b0ae0e-f26e-4e33-b1af-e0c209b9761f",
            recommendation_risk: {
              kumr_params: [4.0, 5.0],
              beta_params: [5, 2],
            },
            demographic_info: null,
            trust_amount: 5000.0,
            apr_delta: 1.1,
          },
          {
            supporter_id: "16e8c3b2-fe99-4ec8-82e4-fc0c44cfa37e",
            recommendation_risk: {
              kumr_params: [4.0, 5.0],
              beta_params: [5, 2],
            },
            demographic_info: null,
            trust_amount: 10000.0,
            apr_delta: 1.1,
          },
        ],
        risk_params: null,
        novation: false,
        apr_delta: 1.1,
      },
    },
    latestOffer: {
      init_info: {
        borrower_info: {
          borrower_id: "546a77b0-be3f-4071-8727-fb7fe24947dd",
          demographic_info: {
            education_years: 3,
            income: 300,
            credit_score: 600.0,
          },
        },
        request_id: "4e065ae6-5629-4171-8e49-9b6a5920054e",
        tenor: 6.0,
        amount: 50000.0,
        borrower_collateral: 0.0,
        num_annual_cmpnd_prds: 12,
        borrower_apr: 0.162128,
        corpus_apr: 0.164458,
        supporter_apr: 0.159798,
        corpus_share: 0.7,
        supporter_share: 0.3,
        supporter_cash_encumbered: 0.0,
        supporter_portfolio_encumbered: 0.0,
        repayments: [],
        supporter_lag: 1,
        penalty_apr: 0.055,
      },
      schedule: {
        borrower_view: {
          total_payments: {
            paid: 0.0,
            remain: 52404.705623999995,
          },
          corpus_principal: {
            paid: 0.0,
            remain: 35000.0,
          },
          supporter_principal: {
            paid: 0.0,
            remain: 15000.0,
          },
          corpus_interest: {
            paid: 0.0,
            remain: 1697.883253,
          },
          supporter_interest: {
            paid: 0.0,
            remain: 706.822368,
          },
          borrower_collateral: {
            paid: 0.0,
            remain: 0.0,
          },
        },
        next_borrower_payment: 8734.117604,
        supporter_view: null,
        corpus_view: null,
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
    supporters: [
      {
        pledge_amount: 100,
        status: "confirmed",
        user: {
          id: "12312",
          name: "gaurav",
          email: "gp@arboreum.dev",
        },
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
