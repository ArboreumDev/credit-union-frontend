import { initializeGQL } from "../utils/graphql_client";
import { users, basic_connections } from './fixtures'
import {INSERT_USER, INSERT_EDGE, GET_EDGES_BY_STATUS, EXAMPLE_INPUTS, RESET_DB, GET_USERS, CREATE_USER } from "../utils/queries";
import { get } from "http";

// # REFACTOR make this a type
const EDGE_STATUS = {
  active: "active",
  awaiting_lender_confirmation: "awaiting_lender_confirmation",
  awaiting_lender_signup: "awaiting_lender_signup",
  awaiting_borrower_signup: "awaiting_borrower_signup",
  historic: "historic"
}

 // ======================== HELPERS TO CREATE INPUT AND PARSE OUTPUT ========================

/**
 * create the db-insert input from the fixture
 * @param edge  [from_number, to_number, trust]
 * @param  users [{userObject1}, {userObject2}, ... ]
 */
function create_edge_insert_input_from_fixture (edge, users) {
  let lender = users.filter(x => x.user_number === edge[0])[0]
  let borrower = users.filter(x => x.user_number === edge[1])[0] 
  let input = {
    trust_amount: edge[2],
    status: EDGE_STATUS.active,
    borrower_id: borrower.id,
    lender_id: lender.id,
    other_user_email: lender.name + "@mail.com"
  }
  return input
}

const distinct = (value, index, self) => {
  return self.indexOf(value) === index
}


 // =========== HELPERS TO CREATE THE INITIAL NETWORK SETUP FROM FIXTURES =====================

/** will insert all users and the basic connections into the db 
 * @param users a dict of users to be added to the DB (see fixtures to see the format)
 * @returns added_users {user_number: added_user_object}
*/
export async function addUsers (gqlclient, users) {
  let added_users = []
  for (var userId of Object.keys(users)) {
    let data = await gqlclient.request(CREATE_USER, {"user": users[userId]})
    let new_user = data.insert_user.returning[0] 
    added_users.push(new_user)
  }
  return added_users
};

/** will insert edges into the DB
 * @param edges an edge list [[1,2,10], [2,3,30]] (user)
 * @param users a list of the users in the DB (e.g. output as of addUsers or getUsers)
 * @returns added_edges [added_edge_object1, ...]
*/
export async function addEdgesFromList(gqlclient, users, edges) {
  let e = []
    for (var edge of edges) {
      var insert_edge_input = create_edge_insert_input_from_fixture(edge, users)
      let data = await gqlclient.request(INSERT_EDGE, {"edge": insert_edge_input})
    }
  return e
}

/**
 * add a network to the DB, user_numbers should be unique (will not be guaranteed by DB)
 * @param {} gqlclient pointing to the DB into which the nodes and edges should be inserted
 * @param {*} users {user_number: UserInput,... } see fixtures for details
 * @param {*} edges edgeList
 */
export async function addNetwork(gqlclient, users, edges) {
  let added_users = await addUsers(gqlclient, users)
  let added_edges =  await addEdgesFromList(gqlclient, added_users, edges)
  return added_users, added_edges
}


export const getAllUsers = async (gqlclient) => {
    let data = await gqlclient.request(GET_USERS)
    return data.user
}


// export create_edge_insert_input_from_user_input(user_input, existing_users, other_user_email=None) => {
//     /** create an edge insert input given the edge 
//      * @param edge [from, to, credit_line] 
//      * @param users dict of users existing in the system that can be indexed by the user-number
//      * @param inserted_by user who creates the edge, used to addthe 
//      * */

//     // set edge_status dependent creator being lender or borrower 
//     let edge_status = "active"
//     if (inserted_by !== "TEST") {
//       if (borrower in Object.keys(users)) {
//         if (lender in Object.keys(users)) {
//           if (inserted_by === lender) {
//             edge_status = EDGE_STATUS.active
//           } else { edge_status = EDGE_STATUS.awaiting_lender_confirmation }
//         } else { edge_status = EDGE_STATUS.awaiting_lender_signup }
//       } else { edge_status = EDGE_STATUS.awaiting_borrower_signup }
//     }

//     // set other user email dependant on inserted_by //TODO use email as foreign key
//     let other_user_email = other_user_email

//     return {
//         trust_amount: edge[2],
//         status: 'active',
//         borrower_id: users[borrower][id],
//         lender_id: users[lender][id],
//         other_user_email:
//     }
// }

