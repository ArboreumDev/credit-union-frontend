// import { gql, useQuery, useMutation } from '@apollo/client';
import { USERS } from '../../tests/fixtures/fixtures'

// var user1, user2, user3;
// var {user1, user2, user3} = users;

// REFACTOR: htis sould be done with destructuring syntax!!
var user1 = USERS[1]
var user2 = USERS[2]
var user3 = USERS[3]
// -------------------------------------------------------------
// -------------------- NETWORK --------------------------------
// -------------------------------------------------------------
export const INSERT_EDGE = `
mutation ($edge: edges_insert_input!) {
    insert_edges(objects: [$edge]) {
      returning {
        edge_id
        status
        other_user_email
        trust_amount
          from_user {
          name
          balance
        }
        to_user {
          name
        }
      }
    }
  }`

export const GET_USERS = `
  query getUsers {
    user {
      id
      name
      user_number
      email
      }
    }
`

export const CREATE_USER = `
  mutation ($user: user_insert_input!) {
    insert_user(objects: [$user]) {
      returning {
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
    }
  }`

export const GET_EDGES_BY_STATUS = `
query getNetworkEdgesByStatus ($status: edge_status!) {
  edges(where: {status: {_eq: $status} }) {
    from_user {
      name
      user_number
    }
    to_user {
      name
      user_number
    }
    trust_amount
  }
}
`

export const DELETE_ALL_USERS = `
  mutation {

    delete_user (
      where {}
      ) {
        affected_rows
    }
  }
  `

export const DELETE_NETWORK = `
  mutation {
    delete_edges (
    where: {}) { affected_rows },
    delete_user (
      where: {}) { affected_rows },
    }
    `

export const RESET_DB = `
  mutation {
    delete_receivables (
      where: {}) { affected_rows },
    delete_payables (
      where: {}) { affected_rows },
    delete_encumbrances (
      where: {}) { affected_rows },
    delete_guarantors (
      where: {}) { affected_rows },
    delete_recommendation_risk (
      where: {}) { affected_rows },
    delete_loan_risk (
      where: {}) { affected_rows },
    delete_loan_participants (
      where: {}) { affected_rows },
    delete_encumbrance_participants (
      where: {}) { affected_rows },
    delete_loan_requests (
      where: {}) { affected_rows },
    delete_edges (
    where: {}) { affected_rows },
    delete_user (
      where: {}) { affected_rows }
    }
`

// -------------------------------------------------------------
// -------------------- LOANS ----------------------------------
// -------------------------------------------------------------

export const INITIATE_LOAN_REQUEST = `
  mutation createLoanRequest ($request_object: loan_requests_insert_input!) {
    insert_loan_requests_one (object: $request_object) {
        request_id
        amount
        purpose
        status
        risk_calc_result
    }
  }
  `
// {
//   "request_object": {
//   	"borrower_id": "c56583f4-1c9f-4dd9-98a1-64267437691d",
//     "amount": 12,
//     "purpose": "go to the movies"
//   }
// }



export const ADD_GUARANTORS_TO_LOAN_REQUEST = `
  mutation addGuarantors ($guarantors: [guarantors_insert_input!]!) {
    insert_guarantors (objects: $guarantors) {
        returning {
          amount,
          participation_request_time
          status
          guarantee_division
        }
      affected_rows
    }
  }
`

// {
//   "guarantors": [
//    	 {
//       "request_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//       "guarantor_id": "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
//     	"amount": 5,
//     	"invest_in_corpus": true,
//     	"status": "unknown"   
//   	}
//   ]
// }


// HERE is a way to do this in one single query. 
// TODO1 test whether the current client can execute such a 'hard-coded query`
// TODO2 one would have to write a helper to create the string manually


// mutation createLoanRequest {
//   insert_loan_requests ( objects: [
//     {
//       borrower_id: "c56583f4-1c9f-4dd9-98a1-64267437691d",
//       amount: 12,
//       purpose: "go to the movies",
//       guarantors: {
//       	data: [
//                	{
//                   guarantor_id: "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
//                   amount: 5,
//                   invest_in_corpus: true,
//                   status: "unknown"   
//                 }
//               ]
//     	}
//     }
//   ]
//   ) {
//     affected_rows
//   }
// }

export const UPDATE_GUARANTOR = `
  mutation recordGuarantorParticipation (
    $request_id: uuid!,
    $guarantor_id: uuid!
    $status: String!,
    $amount: Int
  ) {
    update_guarantors_by_pk (
      pk_columns: { request_id: $request_id, guarantor_id: $guarantor_id}
      _set: { status: $status, amount: $amount }
    ) {
      guarantor_id
      status
      amount
    }
  }
`

// {
//   "request_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//   "guarantor_id": "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
//   "status": "confirmed",
//   "amount": 7
// }


export const UPDATE_LOAN_REQUEST_WITH_OFFER = `
  mutation update_loan_request_with_offer (
    $request_id: uuid!
    $new_offer: jsonb!,
  ) {
    update_loan_requests_by_pk (
      pk_columns: {request_id: $request_id}
      _set: { status: "awaiting_borrower_confirmation" }
      _append: {risk_calc_result: $new_offer}
    ) {
      request_id
      status
      risk_calc_result
    }
  }
`
// {
//   "request_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//   "new_offer": {"latest": {"interest": 3, "lenders": "lenderbreakdown"} }
// }


export const START_LOAN = `
  mutation startLoan (
    $request_id: uuid!,
    $payable: payables_insert_input!,
    # $borrower: borrowerLoanInputs!,
    # $lenders: [lenderInput!]!,
    $lenders: [loan_participants_insert_input!]!,
    $lender_receivables: [receivables_insert_input!]!
    # $guarantors: [guarantorDetailsInput!]!
  ) {
    update_loan_requests_by_pk (
      pk_columns: {request_id: $request_id}
      _set: {status: "live"}
    ) 
    {
      request_id
    }
    insert_payables_one (object: $payable) {
      amount_total
      amount_paid
    }

    insert_loan_participants(objects: $lenders) {
      returning {
        lender_id
        lender_amount
      }
    }
    insert_receivables(objects: $lender_receivables) {
      affected_rows
    }
  }
`

// {
//   "request_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//   "payable": {
//     "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//     "amount_total": 14,
//     "amount_remain": 14,
//     "pay_priority": 0
//   },
//   "lenders": [
//     {
//       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//       "lender_id": "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
//       "lender_amount": 7,
//       "percentage": 50
//     },
//         {
//       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//       "lender_id": "943452f9-93bd-404b-807d-f9e6618df78a",
//       "lender_amount": 7,
//       "percentage": 50
//     }
//   ],
//   "lender_receivables": [
//     {
//       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//       "receiver_id": "0f3fa6a4-7796-4e38-991a-c05f1086aacd",
//       "amount_total": 7,
//       "amount_remain": 7
//     },
//     {
//       "loan_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//       "receiver_id": "943452f9-93bd-404b-807d-f9e6618df78a",
//       "amount_total": 7,
//       "amount_remain": 7
//     }
//   ]
// }

// TODO add option to choose other but the latestOffer
export const GET_LOAN_OFFER = `
  query getOffer ($request_id: uuid!) {
    loan_requests_by_pk (request_id: $request_id) {
      request_id
      risk_calc_result
      amount
    }
  }
`


// -------------------------------------------------------------
// -------------------- USER -----------------------------------
// -------------------------------------------------------------

// TODO adjust this one to take different status
export const GET_ACTIVE_LOANS_BY_LENDER = `
  query activeLoanRequestsByLender ($lender_id: uuid!) {
    loan_participants (where: {
      _and: [
        {lender_id: {_eq: $lender_id}},
        {loan_request: {status: {_in: ["granted", "in_payback"] }}}
      ]
    }
    ){
      loan_id
      lender_amount
    }
  }
`

export const GET_LOANS_BY_BORROWER_AND_STATUS = `
  query loansByBorrowerAndStatus ($borrower_id: uuid!, $statusList:[String!]!) {
    loan_requests (where: {
      _and: [
        {borrower_id: {_eq: $borrower_id}},
        {status: {_in: $statusList}}
        ]
      }
    ) {
      request_id
      amount
    }
  }
`

export const EXAMPLE_INPUTS = {
  insert_edge: {
    "known_edge": {
      // lender adds edge to existing borrower
      trust_amount: 10,
      status: "active",
      borrower_id: user1.id,
      lender_id: user2.id,
      other_user_email: "rick@galaxy.io"
    },
    "unconfirmed_edge": {
      // when borrower adds edge to existing lender, it needs to be confirmed by lender first
      trust_amount: 30,
      status: "awaiting_lender_confirmation",
      borrower_id: user3.id,
      lender_id: user2.id,
      other_user_email: "rick@galaxy.io"
    },
    "potential_edge_to_lender": {
      // borrower adds edge to lender who still needs to sign up
      trust_amount: 20,
      status: 'awaiting_lender_signup',
      borrower_id: user3.id,
      other_user_email: 'mum@galaxy.io'
    }
  },
  insert_user: { user: user1 },
}

// export queries = {
//   insert_user: INSERT_USER,
//   insert_edge: INSERT_EDGE_MUTATION,
//   get_network: GET_NETWORK
// }

// I think it would be executed like this:
// export function get_trusted_borrowers({ borrower }) {
//     const { loading, error, data } = useMutation(
//       INSERT_BORROWER_MUTATION,
//       { variables: { name } }
//     );
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error!</p>;

//     return (
//       <p>
//         {data.dog.name} is a {data.dog.breed}
//       </p>
//     );
//   }