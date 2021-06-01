import { InvestmentCards } from "components/lender/InvestmentOverview"
import { Loan_Request_State_Enum } from "gql/sdk"

import { Fixtures } from "lib/demo/fixtures"

const borrowers = [
  {
    first_name: "Amitabh",
    last_name: "Bachann",
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    loan_requests: [
      {
        amount: 90000,
        state: Loan_Request_State_Enum.Active,
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
        confirmation_date: null,
        purpose: "Educational expense",
      },
    ],
  },
  {
    first_name: "Urban",
    last_name: "Garden",
    id: "3476df66-ef1c-4e82-ad21-70943dcecaf6",
    loan_requests: [
      {
        amount: 15000,
        state: Loan_Request_State_Enum.Fulfilled,
        request_id: "44c6d2cb-062c-4dac-a88f-0df0f32bba91",
        confirmation_date: null,
        purpose: "Veggies",
      },
    ],
  },
  {
    first_name: "Urban",
    last_name: "Disco",
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
