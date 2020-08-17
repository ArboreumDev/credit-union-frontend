import Network from "../queries/network"
import {EdgeStatus} from "../types"

const getNodesFromEdgeList = (edgeList) => {
  let nodes = edgeList.map(x => x.slice(0,2)).flat()
  return [...new Set(nodes)]
}

/**
 * get the network and edges of a given edge_status
 * @param {} gqlclient 
 * @param {*} status 
 * @returns {} an object {nodes: [user_number1, ...], edges: [[from, to, credit], ...]}
 */
export const getNetwork = async (gqlclient, status = EdgeStatus.active) => {
  const data = await gqlclient.request(Network.GET_EDGES_BY_STATUS, {"status": status})
  const edges = data.edges.map(x => [x.from_user.user_number, x.to_user.user_number, x.trust_amount])
  const nodes = getNodesFromEdgeList(edges)
  return { nodes, edges }
}


