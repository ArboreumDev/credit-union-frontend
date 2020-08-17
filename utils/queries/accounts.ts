export default {
  CREATE_USER_MUTATION: /* GraphQL */ `
  mutation CreateUser(
    $user: user_insert_input!
  ) {
    insert_user_one(object: $user) {
      id
      user_number
      name
      user_type
      email
      phone
      max_exposure
      min_interest_rate
      balance
      demographic_info
    }
  } `, 
  GET_USER_BY_EMAIL: /* GraphQL */ `
  query GetUserByEmail (
    $email: String!
  ) {
    user(where: { email: { _eq: $email } }) {
      name
      phone
      email
      user_type
    }
  }`,
GET_USERS: `
  query getUsers {
    user {
      id
      name
      user_number
      email
      user_type
      balance
      }
    } `,
GET_LOANS_BY_BORROWER_AND_STATUS: `
  query loansByBorrowerAndStatus (
      $borrower_id: uuid!, 
      $statusList:[loan_request_status!]!
    ) {
      loan_requests (
        where: {
        _and: [
          {borrower_id: {_eq: $borrower_id}},
          {status: {_in: $statusList}}
        ]
      }) {
        request_id
        amount
        status
        risk_calc_result
        payables {
          pay_frequency
          due_date
          last_paid
          amount_total
          amount_paid
          amount_remain
        } 
      }
    }`,
 /*  TODO adjust this one to take different status*/
  GET_ACTIVE_LOANS_BY_LENDER: `
  query activeLoanRequestsByLender ($lender_id: uuid!) {
    loan_participants (where: {
      _and: [
        {lender_id: {_eq: $lender_id}},
        {loan_request: {status: {_in: ["live", "in_payback"] }}}
      ]
    }) {
      loan_id
      lender_amount
      receivables {}
    }
  }`,
  GET_INVESTMENT: /* GraphQL */ `
  query getInvestmentByLender ($lender_id: uuid!) {
    receivables (where: {lender_id: $lender_id}) {

    }
    users_by_pk(id: $lender_id) { 
      balance
      invest_in_corpus
    }
  }`,
  GET_LENDER_DASHBOARD_INFO: /* GraphQL */ `
  query getLenderDashboardInfo (
    $user_id: uuid!
  ) {
    user_by_pk(id: $user_id) {
      balance
      receivables_aggregate (where: {
        receiver_id: {_eq: $user_id}
        loan_request: {status: {_in: "live"}}
      }) {
        aggregate {
          sum {
            amount_total
            amount_remain
            amount_received
          }
        }
      }
      encumbrances_aggregate (where: {
        guarantor_id: {_eq: $user_id}
        status: {_eq: "live"}
      }) {
        aggregate {
          sum {
            amount_total
            amount_remain
            amount_paid
          }
        }
      }
      loan_participants_aggregate (where: {
        lender_id: {_eq: $user_id}
        loan_request: {status: {_eq: "live"}}
      }) {
        aggregate {
          sum {
            lender_amount
          }
        }
      }
      guarantors (where: {
        guarantor_id: {_eq: $user_id}
        status: {_eq: "unknown"}
      }) {
        participation_request_time
        guarantor_amount
        loan_request {
          user {
            name
            email
          }
          amount
          purpose
        }
      }
    }
  }`,
  GET_ACTIVE_ENCUMBRANCES: "",
  GET_GUARANTOR_REQUESTS: `
  query getGuarantors ($guarantor_id: uuid!) {
    guarantors (where: {
      guarantor_id: {_eq: guarantor_id}
      status: {_eq: "awaiting_guarantor_confirmation"}
      loan_requests: {status: "awaiting_guarantor_confirmation"}
    }) {
      request_id,
      guarantor_amount,
      loan_requests {
        amount
        purpose
        status
        created_at
      }
      borrower_id
    }
  }
  `,
  GET_BALANCE_BY_ID: /* GraphQl */ `
    query getBalanceById ($user_id: uuid!) {
      users_by_pk(id: $user_id) {
        balance
      }
    }
  `,
}