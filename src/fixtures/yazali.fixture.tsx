import {
  YazaliDashboard,
  PledgeInvestments,
} from "components/yazali/YazaliLenderDashboard"

const user = {
  name: "Renu Paruthi",
  uninvested: 24000,
  invested: 126000,
  APY: 14.6,
  lendings: [
    {
      amount: 4000,
      borrower: "NADENDLA BHANU PRASAD",
      loan_amount: 40000,
      repayments: [{ amount: 1000, date: 1603411200 }],
      maturity_at: 1603411200,
    },
    { amount: 8000, borrower: "YAMPARALA Hemanth PRASAD", loan_amount: 56000 },
    {
      amount: 6000,
      borrower: "PALLAPROLLU VENKATA GOPAIAH",
      loan_amount: 36000,
    },
    { amount: 5000, borrower: "KAGITHA MARIYAMMA", loan_amount: 32000 },
    { amount: 9000, borrower: "Ala Ravindra", loan_amount: 44000 },
    { amount: 4000, borrower: "NADENDLA ASHIRVADHAM", loan_amount: 24000 },
    { amount: 18000, borrower: "MARRI GUDARAIAH", loan_amount: 72000 },
    { amount: 12000, borrower: "MUVVA BHARGAVA RAMAIAH", loan_amount: 72000 },
    { amount: 3000, borrower: "BOMMISETTHY SRINIVAS RAO", loan_amount: 56000 },
    { amount: 15000, borrower: "Mamidala Nageshwar Rao", loan_amount: 72000 },
    {
      amount: 4000,
      borrower: "CHINTALA MADANA SITARAMAIAH",
      loan_amount: 80000,
    },
    { amount: 1000, borrower: "MUVVA SAMBHAIAH (Anji)", loan_amount: 22000 },
    { amount: 2000, borrower: "IKKURTHI RAMADEVI", loan_amount: 80000 },
    { amount: 1000, borrower: "IKKURTHI CHIRANJEEVI", loan_amount: 36000 },
    {
      borrower: "Pranay Narayan Sharma",
      amount: 20000,
      invested_at: 1603411200,
      maturity_at: 1607586247,
      loan_amount: 80000,
    },
    {
      borrower: "Pradeep Meena",
      amount: 8000,
      invested_at: 1604448000,
      maturity_at: 1607586247,
      loan_amount: 32000,
    },
    {
      borrower: "Somesh Somesh",
      amount: 6000,
      invested_at: 1606176000,
      maturity_at: 1607586247,
      loan_amount: 24000,
    },
  ],
}
export default {
  dashboard: <YazaliDashboard user={user} />,
  pledgesTable: <PledgeInvestments investments={user.lendings} />,
}
