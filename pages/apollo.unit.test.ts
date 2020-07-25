import { gql } from '@apollo/client';
import fetch from 'node-fetch'

import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';

const API_URL = 'https://right-thrush-43.hasura.app/v1/graphql'

const client = new ApolloClient({
  link: createHttpLink({
    uri: API_URL,
    fetch: fetch,
    headers: {
      Authorization: `Bearer wJLnF8D3WB2RGUp83kFarVqSV5XX8AE5Ii2hq58csTQ5vXJmM1pHCPhO4F9FStG1`
    }
  }),
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query users {
        id
        name
      }
    `
  })
  .then(result => console.log(result));