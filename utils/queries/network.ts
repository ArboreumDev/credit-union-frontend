export default {
INSERT_EDGE: `
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
    }`,
GET_EDGES_BY_STATUS: `
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
    }`,
DELETE_NETWORK: `
  mutation {
    delete_edges (
    where: {}) { affected_rows },
    delete_user (
      where: {}) { affected_rows },
    }`
}