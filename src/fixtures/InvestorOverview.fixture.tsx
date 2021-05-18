import {
  InvestmentOverview,
  InvestmentCards,
} from "components/lender/InvestmentOverview"

const borrowers = [
  {
    name: "Amitabh Bachann",
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
]

const components = {
  cards: <InvestmentCards borrowers={borrowers} />,
  //   cards: <InvestmentOverview user={user} />,
  // dashboardLive: <LenderDashboard lenderId={"19b15f38-eaa8-48f6-9bba-ac1d95b6c0f7"}/>
}
export default components
