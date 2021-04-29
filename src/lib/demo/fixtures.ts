import {
  User,
  LoanRequest,
  LoanRequestStatus,
  CalculatedRisk,
  LoanInfo,
  RoI,
} from "../types"
import { NO_ROI, ZERO_PAID_REMAIN } from "../constant"
import { exampleWireAccounts } from "../../../tests/fixtures/exampleWireAccounts"
import { exampleCircleAccounts } from "../../../tests/fixtures/exampleCircleAccounts"

const ROI1: RoI = {
  total_apr: {
    apr: 0.163,
    interest: ZERO_PAID_REMAIN,
    principal: ZERO_PAID_REMAIN,
  },
  apr_on_pledges: null,
  apr_on_loans: null,
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
    loans_to_repay: [],
    roi: NO_ROI,
    account_details: {
      circle: { ...exampleCircleAccounts[0] },
      bankDetails: {
        ...exampleWireAccounts[0].bankDetails,
      },
    },
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
      full_single_repay: 94797,
      apr: {
        corpus: 0.17,
        supporter: 0.16,
      },
    },
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
    loans_to_repay: [
      {
        status: "live",
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba96",
        loan: Fixtures.LoanReqInfo,
      },
    ],
    account_details: {
      circle: { ...exampleCircleAccounts[1] },
      bankDetails: { ...exampleWireAccounts[1].bankDetails },
    },
  }

  static BorrowerKYCConfirmed: User = {
    ...Fixtures.Borrower,
    kyc_approved: true,
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

  static SupporterWithPledge = {
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
    roi: ROI1,
  }

  static SupporterWithPledgeRequest = {
    ...Fixtures.SupporterWithPledge,
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

  static LenderWithInvestments = {
    ...Fixtures.Lender,
    balance: 50000,
    corpus_share: 40000,
    roi: {
      total_apr: {
        apr: 0.17615691489362112,
        interest: { paid: 1806.2560079, remain: 85.34120834 },
        principal: { paid: 34414.21278758, remain: 5813.53562333 },
      },
      apr_on_loans: {
        sum: {
          apr: 0.17615691489362112,
          interest: { paid: 1806.2560079, remain: 85.34120834 },
          principal: { paid: 34414.21278758, remain: 5813.53562333 },
        },
        loans: {
          "2d3b8514-38c2-461f-a6ec-470a72bae0b5": {
            apr: 0.1761569148936211,
            interest: { paid: 1806.2560079000004, remain: 85.34120833589125 },
            principal: { paid: 34414.21278758, remain: 5813.535623334215 },
          },
        },
      },
      apr_on_pledges: {
        sum: {
          apr: 0,
          interest: { paid: 0, remain: 0 },
          principal: { paid: 0, remain: 0 },
        },
        loans: {},
      },
    },
    active_loans: [
      {
        loan_id: "2d3b8514-38c2-461f-a6ec-470a72bae0b5",
        lender_amount: 40000,
        loan_request: {
          status: "live",
          amount: 50000,
          loan: {
            state: {
              escrow: 2337.501130999998,
              repayments: [5800, 8800, 10000, 10000, 10412],
              request_id: "2d3b8514-38c2-461f-a6ec-470a72bae0b5",
              borrower_collateral: 0,
              supporter_cash_encumbered: 0,
              supporter_portfolio_encumbered: 0,
            },
            terms: {
              tenor: 6,
              amount: 50000,
              corpus_apr: 0.17615691489361698,
              request_id: "2d3b8514-38c2-461f-a6ec-470a72bae0b5",
              supporters: [
                {
                  apr_delta: 1.1,
                  supporter_id: "7c98f0bb-327a-499f-8f34-459f0e58e7b5",
                  trust_amount: 10000,
                  demographic_info: null,
                  recommendation_risk: {
                    beta_params: [5, 2],
                    kumr_params: [4, 5],
                  },
                },
              ],
              penalty_apr: 0.055,
              borrower_apr: 0.1734042553191489,
              corpus_share: 0.8,
              borrower_info: {
                borrower_id: "4650b5cf-59e2-4d21-afad-c38dd861a676",
                demographic_info: {
                  income: 300,
                  credit_score: 600,
                  education_years: 3,
                },
              },
              supporter_apr: 0.17065159574468083,
              supporter_lag: 1,
              supporter_share: 0.2,
              borrower_collateral: 0,
              num_annual_cmpnd_prds: 12,
            },
            schedule: {
              apr: {
                corpus: 0.1786346155923633,
                supporter: 0.19017770362395675,
              },
              request_id: "2d3b8514-38c2-461f-a6ec-470a72bae0b5",
              corpus_view: null,
              borrower_view: {
                total_payments: { paid: 45012, remain: 7692.596309800683 },
                corpus_interest: {
                  paid: 2028.4432167502582,
                  remain: 85.34120833589125,
                },
                corpus_principal: {
                  paid: 34186.46437666578,
                  remain: 5813.535623334215,
                },
                supporter_interest: {
                  paid: 552.0763506701616,
                  remain: 25.150756214919745,
                },
                borrower_collateral: { paid: 0, remain: 0 },
                supporter_principal: {
                  paid: 8231.431278084343,
                  remain: 1768.5687219156566,
                },
              },
              supporter_view: null,
              next_borrower_payment: 7692.596309800682,
            },
            request_id: "2d3b8514-38c2-461f-a6ec-470a72bae0b5",
          },
        },
      },
    ],
  }
}
