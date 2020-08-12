export default {
  CREATE_USER_MUTATION: /* GraphQL */ `
  mutation CreateUser(
    $user: user_insert_input!
  ) {
    insert_user_one(object: $user) {
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
`, 
GET_USER_BY_EMAIL: /* GraphQL */ `
  query GetUserByEmail($email: String!) {
    user(where: { email: { _eq: $email } }) {
      name
      phone
      email
      user_type
    }
  }
`}