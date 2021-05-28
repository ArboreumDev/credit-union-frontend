import { InvestmentCards } from "components/lender/InvestmentOverview"

import { Fixtures } from "lib/demo/fixtures"

const borrowers = [
  {
    name: "Amitabh Bachann",
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    loan_requests: [
      {
        amount: 90000,
        status: "initiated",
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
        confirmation_date: null,
        purpose: "Educational expense",
      },
    ],
  },
  {
    name: "Urban Garden",
    id: "3476df66-ef1c-4e82-ad21-70943dcecaf6",
    loan_requests: [
      {
        amount: 15000,
        status: "live",
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
        confirmation_date: null,
        purpose: "Veggies",
      },
    ],
  },
  {
    name: "Urban Disco",
    id: "3276df66-ef1c-4e82-ad21-70943dcecaf6",
    loan_requests: [],
  },
]

let lenderWithApproval = Object.assign({}, Fixtures.Lender)
lenderWithApproval.approvedBorrowers = [
  { borrower_id: "3576df66-ef1c-4e82-ad21-70943dcecaf6" },
]

const components = {
  cards: <InvestmentCards borrowers={borrowers} lender={lenderWithApproval} />,
}
export default components
