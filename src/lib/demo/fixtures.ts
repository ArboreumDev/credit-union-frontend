import {
  User,
  LoanRequest,
  LoanRequestStatus,
  CalculatedRisk,
  LoanInfo,
} from "../types"

const ZERO_PAID_REMAIN = { paid: 0, remain: 0 }

const NO_ROI = {
  total_apr: {
    apr: 0,
    interest: ZERO_PAID_REMAIN,
    principal: ZERO_PAID_REMAIN,
  },
  apr_on_pledges: {},
  apr_on_loans: {},
}

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
    active_loans: [],
    roi: NO_ROI,
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
    active_loans: [],
    roi: NO_ROI,
  }

  static BorrowerKYCConfirmed: User = {
    ...Fixtures.Borrower,
    kyc_approved: true,
  }
  static LoanReqInfo: LoanInfo = {
    request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba96",
    state: {
      repayments: [1000, 500, 6000, 965.74, 965.74, 300],
      request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba96",
      borrower_collateral: 0,
      supporter_cash_encumbered: 0,
      supporter_portfolio_encumbered: 0,
      escrow: 0,
    },
    terms: {
      tenor: 6,
      amount: 10000,
      corpus_apr: 0.139308,
      request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba96",
      supporters: [
        {
          apr_delta: 1.1,
          supporter_id: "230cff88-a594-4922-90cd-05938de5bdd0",
          trust_amount: 2000,
          demographic_info: null,
          recommendation_risk: {
            beta_params: [5, 2],
            kumr_params: [4, 5],
          },
        },
      ],
      penalty_apr: 0.055,
      borrower_apr: 0.137887,
      corpus_share: 0.8,
      borrower_info: {
        borrower_id: "8653118e-7a00-4c4f-be53-0b2e04485db0",
        demographic_info: {
          income: 300,
          credit_score: 600,
          education_years: 3,
        },
      },
      supporter_apr: 0.136466,
      supporter_lag: 1,
      supporter_share: 0.2,
      borrower_collateral: 0,
      num_annual_cmpnd_prds: 12,
    },
    schedule: {
      corpus_view: null,
      borrower_view: {
        total_payments: {
          paid: 0,
          remain: 94797.07053,
        },
        corpus_interest: {
          paid: 303.516101,
          remain: 1.412561,
        },
        corpus_principal: {
          paid: 7878.321882,
          remain: 121.678118,
        },
        supporter_interest: {
          paid: 89.42048700000001,
          remain: 3.082502,
        },
        borrower_collateral: {
          paid: 0,
          remain: 0,
        },
        supporter_principal: {
          paid: 1728.943341,
          remain: 271.056659,
        },
      },
      supporter_view: null,
      next_borrower_payment: 15799.51,
      apr: {
        corpus: 0.17,
        supporter: 0.16,
      },
    },
  }

  static LoanRequest: LoanRequest = {
    request_id: "2466df66-ef1c-4e82-ad21-70943dcecaf6",
    confirmation_date: null,
    payback_status: null,
    purpose: "Home Repair",
    loan: Fixtures.LoanReqInfo,
    risk_calc_result: { latestOffer: Fixtures.LoanReqInfo },
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
    balance: 50000,
    corpus_share: 40000,
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
