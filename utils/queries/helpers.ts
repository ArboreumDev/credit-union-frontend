export default {
    DELETE_ALL_USERS: `
  mutation {
    delete_user (
      where {}
      ) {
        affected_rows
    }
  }`,
RESET_DB: `
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
    } `
}