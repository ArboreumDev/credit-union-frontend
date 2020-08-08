// import { gql, useQuery, useMutation } from '@apollo/client';
import { USERS } from './fixtures'

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
`;

export const INSERT_USER = `
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
query getNetworkEdgesByStatus ($status: edge_status_enum!) {
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
    delete_edges (
    where: {}) { affected_rows },
    delete_user (
      where: {}) { affected_rows },
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
`    

// -------------------------------------------------------------
// -------------------- LOANS ----------------------------------
// -------------------------------------------------------------


// -------------------------------------------------------------
// -------------------- USER -----------------------------------
// -------------------------------------------------------------

// export const GET_

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
    insert_user: { user: user1},
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


