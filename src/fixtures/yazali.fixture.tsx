import {
  YazaliDashboard,
  PledgeInvestments,
} from "components/yazali/YazaliLenderDashboard"

const user = {
  name: "Renu Paruthi",
  uninvested: 24000,
  invested: 126000,
  APY: 14.62,
  lendings: [
    {
      amount: 4010,
      borrower: "NADENDLA BHANU PRASAD",
      loan_amount: 40000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 8000,
      borrower: "YAMPARALA Hemanth PRASAD",
      loan_amount: 56000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 6000,
      borrower: "PALLAPROLLU VENKATA GOPAIAH",
      loan_amount: 36000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 5000,
      borrower: "KAGITHA MARIYAMMA",
      loan_amount: 32000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 9000,
      borrower: "Ala Ravindra",
      loan_amount: 44000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 4000,
      borrower: "NADENDLA ASHIRVADHAM",
      loan_amount: 24000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 18000,
      borrower: "MARRI GUDARAIAH",
      loan_amount: 72000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 12000,
      borrower: "MUVVA BHARGAVA RAMAIAH",
      loan_amount: 72000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 3000,
      borrower: "BOMMISETTHY SRINIVAS RAO",
      loan_amount: 56000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 15000,
      borrower: "Mamidala Nageshwar Rao",
      loan_amount: 72000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 4000,
      borrower: "CHINTALA MADANA SITARAMAIAH",
      loan_amount: 80000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 1000,
      borrower: "MUVVA SAMBHAIAH (Anji)",
      loan_amount: 22000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 2000,
      borrower: "IKKURTHI RAMADEVI",
      loan_amount: 80000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 1000,
      borrower: "IKKURTHI CHIRANJEEVI",
      loan_amount: 36000,
      maturity: 1590962400,
      total_repayed_amount: 0,
      expected_repayed_amount: 0,
      APR: 0.146,
    },
    {
      amount: 20000,
      borrower: "Pranay Narayan Sharma",
      loan_amount: 80000,
      maturity: 1636502400,
      total_repayed_amount: 3550,
      expected_repayed_amount: 17957.5,
      APR: 0.14,
    },
    {
      amount: 8000,
      borrower: "Pradeep Meena",
      loan_amount: 32000,
      maturity: 1636502400,
      total_repayed_amount: 1814.5,
      expected_repayed_amount: 9075,
      APR: 0.16,
    },
    {
      amount: 6000,
      borrower: "Somesh Somesh",
      loan_amount: 24000,
      maturity: 1623283200,
      total_repayed_amount: 2611,
      expected_repayed_amount: 5222,
      APR: 0.15,
    },
  ],
}

export default {
  dashboard: <YazaliDashboard user={user} />,
  pledgesTable: <PledgeInvestments investments={user.lendings} />,
}
