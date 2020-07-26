import { gql } from '@apollo/client';
import fetch from 'node-fetch'

import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { client } from '../utils/graphql_client';


test('Found 3 nodes in initGraph', async () => {
  const data = await client
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

    `
    })
    .then(result => console.log(result.data.users[0].edges));

  // expect(rootStore.graph.nodes.length == 3).toBe(true);
});
