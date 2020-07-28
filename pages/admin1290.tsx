import { gql, useQuery } from '@apollo/client';
import { useApollo, initializeApollo } from '../utils/graphql_client';
import { getApolloDataSS } from '../utils/ssr';

const GET_USERS = gql`
      query UsersQuery {
      users {
        id
        name
        email
        edges {
          user {
            name
          }
        }
      }
    }

    `;

export default function Hello() {
  const { loading, error, data } = useQuery(GET_USERS);
  
  return <div>
    {data.users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
  return <div></div>
}

export async function getServerSideProps() {
  return getApolloDataSS(GET_USERS)
}