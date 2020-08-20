import { GraphQLClient } from "graphql-request";

// const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";
const API_URL = "https://hasura-prod.herokuapp.com/v1/graphql"
const ADMIN_SECRET = "arbo-adm1n-s3cr3t"
// const ADMIN_SECRET = "nhvmvvsrsiyfypsejugcnprtqxqgfbqe"

let gqlClient;

const createGQLClient = (api_url, admin_secret) =>
  new GraphQLClient(api_url, {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": admin_secret 
    },
  })

export function initializeGQL(adminSecret = ADMIN_SECRET, apiUrl = API_URL, initialState = null) {
  const _gqlClient = gqlClient ?? createGQLClient(apiUrl, adminSecret);
  // For SSG and SSR always create a new Client
  if (typeof window === "undefined") return _gqlClient;
  // Create the  Client once in the client
  if (!gqlClient) gqlClient = _gqlClient;

  return _gqlClient;
}