import { User } from "../types"

export class Fixtures {
  static Lender: User = {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    name: "Deepika Padukone",
    email: "dev-admin@arboreum.dev",
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
    email: "dev-admin@arboreum.dev",
    phone: "+91 123-232-1231",
    user_type: "borrower",
    balance: 0,
    corpus_share: 0,
    created_at: "2020-08-29T04:12:17.878911+00:00",
    kyc_approved: true,
    loan_requests: [
      {
        confirmation_date: null,
        payback_status: null,
        purpose: "Home loan",
        risk_calc_result: {
          loanTerm: 6,
          interestRate: 5.5,
          totalDue: 1200,
        },
        status: "initiated",
        created_at: "2020-08-29T04:12:41.393094+00:00",
        amount: 1000,
      },
    ],
    pledge_requests: [],
  }

  static UserWithLenderLoanRequest = {
    ...Fixtures.Lender,
    pledge_requests: [
      {
        request_id: "loan_req_id",
        pledge_amount: 1000,
        participation_request_time: "",
        loan_request: {
          purpose: "Daughter's Marriage",
          amount: 12000,
          risk_calc_result: {
            loanTerm: 6,
            interestRate: 5.5,
            totalDue: 1200,
          },
          user: {
            email: "deepika@mail.com",
            name: "Deepika Padukone",
          },
        },
      },
    ],
  }
}
