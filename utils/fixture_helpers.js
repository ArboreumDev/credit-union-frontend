import { initializeGQL } from "../utils/graphql_client";
import { users, basic_connections } from './fixtures'
import {INSERT_USER, INSERT_EDGE, GET_EDGES_BY_STATUS, EXAMPLE_INPUTS, RESET_DB, GET_USERS } from "../utils/queries";
import { get } from "http";

// export function create_user_input_from_fixture(userDict) {
//     let user1_input = Object.assign({}, userDict)
//     delete user1_input.id
//     return user1_input
// }

// # REFACTOR make this a type
const EDGE_STATUS = {
  active: "active",
  awaiting_lender_confirmation: "awaiting_lender_confirmation",
  awaiting_lender_signup: "awaiting_lender_signup",
  awaiting_borrower_signup: "awaiting_borrower_signup",
  historic: "historic"
}

/**
 * create the db-insert input from the fixture
 * @param edge  [from_number, to_number, trust]
 * @param  users [{userObject1}, {userObject2}, ... ]
 */
function create_edge_insert_input_from_fixture (edge, users) {
  console.log('users', users)

  let lender = users.filter(x => x.user_number === edge[0])[0]
  let borrower = users.filter(x => x.user_number === edge[1])[0] 
  let input = {
    trust_amount: edge[2],
    status: EDGE_STATUS.active,
    borrower_id: borrower.id,
    lender_id: lender.id,
    other_user_email: lender.name + "@mail.com"
  }
  // console.log('edgeinput', input)
  return input
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

// returns users as a dict {user_number: userData}
export const getUsers = async () => {
  let gqlClient = initializeGQL()
  let data = await gqlClient.request(GET_USERS)
  console.log(data.user)
  return data.user
  // userMap = {}
  // data.user.forEach(user => {
  //   userMap[user.user_number] = 
  // });
}


/** will insert all users and the basic connections into the db 
 * @param users a dict of users to be added to the DB (see fixtures to see the format)
 * @returns added_users {user_number: added_user_object}
*/
export async function addUsers (users) {
  let gqlClient = initializeGQL()
  let added_users = {}
  for (var userId of Object.keys(users)) {
    let data = await gqlClient.request(INSERT_USER, {"user": users[userId]})
    let new_user = data.insert_user.returning[0] 
    added_users[userId] = new_user
  }
  console.log('created users', added_users)
  return added_users
};

/** will insert all users and the basic connections into the db 
 * @param edges an edge list [[1,2,10], [2,3,30]] (user)
 * @param users a dict of the users in the DB (see fixtures to see the format)
 * @returns added_edges [added_edge_object]
*/
export async function addEdges(users, edges) {
  let gqlClient = initializeGQL()
  console.log('edges given', edges, users)
  let e = []
  // const forLoop = async _ => {
    for (var edge of edges) {
      var insert_edge_input = create_edge_insert_input_from_fixture(edge, users)
      console.log('edge input for ', insert_edge_input)
      let data = await gqlClient.request(INSERT_EDGE, {"edge": insert_edge_input})
      // e.push(data)
      // console.log('edge added', data.insert_edge)
    }
  // }
  // console.log(e)
  return e
}

export async function addNetwork(users, edges) {
  let added_users = await addUsers(users)
  // let got_users = await getUsers()
  // let added_edges =  await addEdges(added_users, edges)
  // console.log('added_users', added_users)
  return added_users

  // return added_users, added_edges
}

const getNodesFromEdgeList = (edgeList) => {
  let nodes = edgeList.map(x => x.slice(0,2)).flat()
  return [...new Set(nodes)]
}

const distinct = (value, index, self) => {
  return self.indexOf(value) === index
}

export const getNetwork = async (status = EDGE_STATUS.active) => {
  let gqlClient = initializeGQL()
  const data = await gqlClient.request(GET_EDGES_BY_STATUS, {"status": status})
  const edges = data.edges.map(x => [x.from_user.user_number, x.to_user.user_number, x.trust_amount])
  const nodes = getNodesFromEdgeList(edges)
  return { nodes, edges }
}