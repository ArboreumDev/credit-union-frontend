import { gql } from '@apollo/client';
import fetch from 'node-fetch'

import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { initializeGQL } from '../utils/graphql_client'; 


test('user query', async () => {
  const data = await initializeGQL()
    .query({
      query: gql`
        query MyQuery {
          users {
            name
            email
            edges {
              user {
                name
              }
            }
          }
        }
      `,
    })
    .then((result) => console.log(result.data.users[0].edges));

  // expect(rootStore.graph.nodes.length == 3).toBe(true);
});
