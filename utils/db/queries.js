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



// -------------------------------------------------------------
// -------------------- LOANS ----------------------------------
// -------------------------------------------------------------


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


// {
//   "request_id": "4f1df87a-0274-442f-9d1a-8b6b301e5073",
//   "new_offer": {"latest": {"interest": 3, "lenders": "lenderbreakdown"} }
// }


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


// -------------------------------------------------------------
// -------------------- USER -----------------------------------
// -------------------------------------------------------------



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