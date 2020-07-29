import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";

console.log(process.env.HASURA_ADMIN_SECRET);

let apolloClient;

function createApolloClient() {
  return new ApolloClient(new ApolloClient({
         link: createHttpLink({
           uri: API_URL,
           fetch,
           headers: {
             "Content-Type": "application/json",
             "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
           },
         }),
         cache: new InMemoryCache(),
         ssrMode: true
       }))
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

