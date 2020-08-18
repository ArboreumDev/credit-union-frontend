import { initializeGQL } from '../../utils/db/GQLClient'
import { users, basic_connections } from './fixtures'
import Network from '../../utils/queries/network'
import Accounts from '../../utils/queries/accounts'
// import {get } from "http";

// # REFACTOR make this a type
const EDGE_STATUS = {
  active: 'active',
  awaiting_lender_confirmation: 'awaiting_lender_confirmation',
  awaiting_lender_signup: 'awaiting_lender_signup',
  awaiting_borrower_signup: 'awaiting_borrower_signup',
  historic: 'historic'
}

// ======================== HELPERS TO CREATE INPUT AND PARSE OUTPUT ========================

/**
 * create the db-insert input from the fixture
 * @param edge  [from_number, to_number, trust]
 * @param  users [{userObject1}, {userObject2}, ... ]
 */
function create_edge_insert_input_from_fixture (edge, users) {
  const lender = users.filter(x => x.user_number === edge[0])[0]
  const borrower = users.filter(x => x.user_number === edge[1])[0]
  const input = {
    trust_amount: edge[2],
    status: EDGE_STATUS.active,
    borrower_id: borrower.id,
    lender_id: lender.id,
    other_user_email: lender.name + '@mail.com'
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
  const added_users = []
  for (var userId of Object.keys(users)) {
    const data = await gqlclient.request(Accounts.CREATE_USER_MUTATION, { user: users[userId] })
    const new_user = data.insert_user_one
    added_users.push(new_user)
  }
  return added_users
};

/** will insert edges into the DB
 * @param edges an edge list [[1,2,10], [2,3,30]] (user)
 * @param users a list of the users in the DB (e.g. output as of addUsers or getUsers)
 * @returns added_edges [added_edge_object1, ...]
 */
export async function addEdgesFromList (gqlclient, users, edges) {
  const e = []
  for (var edge of edges) {
    var insert_edge_input = create_edge_insert_input_from_fixture(edge, users)
    const data = await gqlclient.request(Network.INSERT_EDGE, { edge: insert_edge_input })
  }
  return e
}

/**
 * add a network to the DB, user_numbers should be unique (will not be guaranteed by DB)
 * @param {} gqlclient pointing to the DB into which the nodes and edges should be inserted
 * @param {*} users {user_number: UserInput,... } see fixtures for details
 * @param {*} edges edgeList
 */
export async function addNetwork (gqlclient, users, edges) {
  const added_users = await addUsers(gqlclient, users)
  const added_edges = await addEdgesFromList(gqlclient, added_users, edges)
  return added_users, added_edges
}

export const getAllUsers = async (gqlclient) => {
  const data = await gqlclient.request(Accounts.GET_USERS)
  return data.user
}
