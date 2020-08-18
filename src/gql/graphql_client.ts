import { useMemo } from "react";
import { GraphQLClient } from "graphql-request";
import {GET_USERS} from "../utils/queries"

// const API_URL = "https://right-thrush-43.hasura.app/v1/graphql";
const API_URL = "http://localhost:8080/v1/graphql"
const ADMIN_SECRET = "myadminsecretkey"
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

/**
 * A class to be used in the frontend to send queries to the DB. As a general rule
 * only "pre-cooked" functions should be used to do any needed input formatting, 
 * processing or checking for consistency should be done inside 
 * the pre-cooked functions. The executeGQL should only be used to test things during development
 */
export class DbClient {
  client: any;

  constructor(admin_secret: string, gql_url: string) {
    this.client = initializeGQL(admin_secret, gql_url)
  }

  getUserPortfolio = async () => {
    // TODO
    // let data = await this.client.request(GET_USERS)
    // return data.user
  }
  
  getProfileInfo = async () => {
    // TODO
  }

  /** this should not be used except for testing */
  executeGQL = async (query, variables=null) => {
    let data = await this.client.request(query, variables);
    return data
  }
}