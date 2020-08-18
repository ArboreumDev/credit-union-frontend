export default {
INITIATE_LOAN_REQUEST: `
  mutation createLoanRequest ($request_object: loan_requests_insert_input!) {
    insert_loan_requests_one (object: $request_object) {
        request_id
        amount
        purpose
        status
        risk_calc_result
    }
  }`,
GET_REQUEST_BY_ID: /* GraphQL */ `
  query GetRequestById($request_id: uuid!) {
    loan_requests_by_pk(request_id: $request_id) {
        request_id
        borrower_id
        purpose
        amount
        status
        risk_calc_result
        payback_status
        }
    }`,
UPDATE_LOAN_REQUEST_WITH_OFFER: `
  mutation update_loan_request_with_offer (
    $request_id: uuid!
    $new_offer: jsonb!,
  ) {
    update_loan_requests_by_pk (
      pk_columns: {request_id: $request_id}
      _set: { status: "awaiting_borrower_confirmation" }
      _append: {risk_calc_result: $new_offer}
    ) {
      request_id
      status
      risk_calc_result
    }
  }`,
  /* TODO add option to choose other but the latestOffer */
  GET_LOAN_OFFER: /* GraphQL */ `
  query getOffer ($request_id: uuid!) {
    loan_requests_by_pk (request_id: $request_id) {
      request_id
      risk_calc_result
      amount
      }
    }`,
  /* TODO add borrower and lender input*/
  START_LOAN: /* GraphQL */ `
  mutation startLoan (
    $request_id: uuid!,
    $payable: payables_insert_input!,
    # $borrower: borrowerLoanInputs!,
    # $lenders: [lenderInput!]!,
    $lenders: [loan_participants_insert_input!]!,
    $lender_receivables: [receivables_insert_input!]!
    # $guarantors: [guarantorDetailsInput!]!
  ) {
    update_loan_requests_by_pk (
      pk_columns: {request_id: $request_id}
      _set: {status: "live"}
    ) 
    {
      request_id
      status
    }
    insert_payables_one (object: $payable) {
      amount_total
      amount_paid
    }

    insert_loan_participants(objects: $lenders) {
      returning {
        lender_id
        lender_amount
      }
    }
    # TODO decrease lender-balances
    insert_receivables(objects: $lender_receivables) {
      affected_rows
    }
  }`
}