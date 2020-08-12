export default {
  CREATE_USER_MUTATION: /* GraphQL */ `
  mutation CreateUser(
    $name: String!
    $email: String!
    $user_type: user_t!
    $phone: String!
  ) {
    insert_user_one(
      object: {
        email: $email
        user_type: $user_type
        name: $name
        phone: $phone
      }
    ) {
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