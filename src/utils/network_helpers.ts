// import { users, basic_connections } from './fixtures'
// import {INSERT_USER, INSERT_EDGE, GET_EDGES_BY_STATUS, EXAMPLE_INPUTS, RESET_DB, GET_USERS } from "../utils/queries";
import { Sdk, User_Insert_Input, Edges_Insert_Input } from "../gql/sdk"
import { EDGE_STATUS } from "./types"

type User = User_Insert_Input
type EdgeTuple = [User, User, number]
// ======================== HELPERS TO CREATE INPUT AND PARSE OUTPUT ========================

export const generateEdgeInputFromUserTupleNotation = (
  edgeList: EdgeTuple
): Edges_Insert_Input => {
  return {
    trust_amount: edgeList[2],
    status: EDGE_STATUS.active,
    lender_id: edgeList[0].id,
    borrower_id: edgeList[1].id,
  } as Edges_Insert_Input
}

// /**
//  * create the db-insert input from the fixture
//  * @param edge  [from_number, to_number, trust]
//  * @param  users [{userObject1}, {userObject2}, ... ]
//  */
// function create_edge_insert_input_from_fixture (edge, users) {
//   const lender = users.filter(x => x.user_number === edge[0])[0]
//   const borrower = users.filter(x => x.user_number === edge[1])[0]
//   const input = {
//     trust_amount: edge[2],
//     status: EDGE_STATUS.active,
//     borrower_id: borrower.id,
//     lender_id: lender.id,
//     other_user_email: lender.name + "@mail.com"
//   }
//   return input
// }

// export const getNodesFromEdgeList = (edgeList) => {
//   const nodes = edgeList.map(x => x.slice(0,2)).flat()
//   return [...new Set(nodes)]
// }

// const distinct = (value, index, self) => {
//   return self.indexOf(value) === index
// }

// =========== HELPERS TO CREATE THE INITIAL NETWORK SETUP FROM FIXTURES =====================

/** will insert all users and the basic connections into the db
 * @param users a dict of users to be added to the DB (see fixtures to see the format)
 * @returns added_users {user_number: added_user_object}
 */
export async function addUsers(sdk: Sdk, userList: [User]) {
  const added_users = []
  for (const user of userList) {
    const data = await sdk.CreateUser({ user })
    const new_user = data.insert_user_one
    added_users.push(new_user)
  }
  return added_users
}

/** will insert edges into the DB
 * @param edgeTuples edge with list of entire users
 * @returns added_edges [added_edge_object1, ...]
 */
export async function addEdgesFromList(sdk: Sdk, edgeTuples: [any]) {
  const addedEdges = []
  for (const e of edgeTuples) {
    const insert_edge_input = generateEdgeInputFromUserTupleNotation(e)
    const data = await sdk.InsertEdge({ edge: insert_edge_input })
    addedEdges.push(data.insert_edges.returning[0])
  }
  return addedEdges
}

type Network = { [index: string]: any }

/**
 * add a network to the DB, user_numbers should be unique (will not be guaranteed by DB)
 * @param {} sdk pointing to the DB into which the nodes and edges should be inserted
 * @param {*} network {nodes: UserList, edges: [edgeTuples]}
 */
export async function addNetwork(sdk: Sdk, network: Network) {
  const addedUsers = await addUsers(sdk, network.nodes)
  const addedEdges = await addEdgesFromList(sdk, network.edges)
  return { addedUsers, addedEdges }
}

/**
 * load and add scenario from fixture folder, expects empty DB
 * @param {} sdk pointing to the DB into which the nodes and edges should be inserted
 * @param {*} string name of the scenario to be loaded
 */
export async function setupScenario(sdk: Sdk, scenarioName: string) {
  // const tmp = await fs.readdir('.')
  // console.log('tmp', tmp.network)
  const { network, loan_requests } = require("../../tests/fixtures/" +
    scenarioName +
    ".json")
  console.log(network)
  const addedUsers = await addUsers(sdk, network.nodes)
  const addedEdges = await addEdgesFromList(sdk, network.edges)
  // return { addedUsers, addedEdges }
}

// /**
//  * get the network and edges of a given edge_status
//  * @param {} gqlclient
//  * @param {*} status
//  * @returns {} an object {nodes: [user_number1, ...], edges: [[ffrom, to, credit], ...]}
//  */
// export const getNetwork = async (gqlclient, status = EDGE_STATUS.active) => {
//   const data = await gqlclient.executeGQL(GET_EDGES_BY_STATUS, {"status": status})
//   const edges = data.edges.map(x => [x.from_user.user_number, x.to_user.user_number, x.trust_amount])
//   const nodes = getNodesFromEdgeList(edges)
//   return { nodes, edges }
// }

// export create_edge_insert_input_from_user_input(user_input, existing_users, other_user_email=None) => {
//     /** create an edge insert input given the edge
//      * @param edge [from, to, credit_line]
//      * @param users dict of users existing in the system that can be indexed by the user-number
//      * @param inserted_by user who creates the edge, used to addthe
//      * */

//     // set edge_status dependent creator being lender or borrower
//     const edge_status = "active"
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
//     const other_user_email = other_user_email

//     return {
//         trust_amount: edge[2],
//         status: 'active',
//         borrower_id: users[borrower][id],
//         lender_id: users[lender][id],
//         other_user_email:
//     }
// }
