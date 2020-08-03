import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";

const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";

let gqlClient;

const createGQLClient = () =>
  new GraphQLClient(API_URL, {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  });

export function initializeGQL(initialState = null) {
  const _gqlClient = gqlClient ?? createGQLClient();
  // For SSG and SSR always create a new Client
  if (typeof window === "undefined") return _gqlClient;
  // Create the  Client once in the client
  if (!gqlClient) gqlClient = _gqlClient;

  return _gqlClient;
}

export function useGQLClient(initialState) {
  const store = useMemo(() => initializeGQL(initialState), [initialState]);
  return store;
}

