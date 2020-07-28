import { gql, useQuery } from '@apollo/client';
import { useApollo, initializeApollo } from '../utils/graphql_client';

const GET_GREETING = gql`
      query MyQuery {
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
  const { loading, error, data } = useQuery(GET_GREETING);
  
  console.log(data.users);
  return <div>
    {data.users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
  return <div></div>
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_GREETING,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }

}