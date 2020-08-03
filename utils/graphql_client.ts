import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";

const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";

let gqlClient;

function createGQLClient() {
  const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
    },
  });
}

export function initializeGQL(initialState = null) {
  const _gqlClient = gqlClient ?? createGQLClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _gqlClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _gqlClient;
  // Create the Apollo Client once in the client
  if (!gqlClient) gqlClient = _gqlClient;

  return _gqlClient;
}

export function useGQLClient(initialState) {
  const store = useMemo(() => initializeGQL(initialState), [initialState]);
  return store;
}

