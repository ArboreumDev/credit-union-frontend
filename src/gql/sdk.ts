import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  user_type: Scalars['user_t'];
  phone: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'mutation_root' }
  & { insert_user_one?: Maybe<(
    { __typename?: 'user' }
    & Pick<User, 'id' | 'created_at' | 'email'>
  )> }
);

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & Pick<User, 'id' | 'email' | 'name'>
  )> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $user_type: user_t!, $phone: String!) {
  insert_user_one(object: {email: $email, user_type: $user_type, name: $name, phone: $phone}) {
    id
    created_at
    email
  }
}
    `;
export const AllUsersDocument = gql`
    query AllUsers {
  user {
    id
    email
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateUser(variables: CreateUserMutationVariables): Promise<CreateUserMutation> {
      return withWrapper(() => client.request<CreateUserMutation>(print(CreateUserDocument), variables));
    },
    AllUsers(variables?: AllUsersQueryVariables): Promise<AllUsersQuery> {
      return withWrapper(() => client.request<AllUsersQuery>(print(AllUsersDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;