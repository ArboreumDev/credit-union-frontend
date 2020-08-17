import Network from '../queries/network'
import { EdgeStatus } from '../types'

export const getNodesFromEdgeList = (edgeList) => {
  const nodes = edgeList.map(x => x.slice(0, 2)).flat()
  return [...new Set(nodes)]
}
