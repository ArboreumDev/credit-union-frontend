import { GraphQLClient } from "graphql-request"
import {
  INITIATE_LOAN_REQUEST,
  ADD_GUARANTORS_TO_LOAN_REQUEST,
  UPDATE_GUARANTOR,
  GET_LOAN_OFFER,
  START_LOAN,
} from "./queries"

import { storeAiResultToDB } from "../utils/loan_helpers"
import { mockedLoanOffer } from "../../tests/mock/swarmai"
import { getAllUsers } from "../../tests/fixtures/fixture_helpers"
import Accounts from "../queries/accounts"
import { User } from "../types"

const API_URL = "http://localhost:8080/v1/graphql"
const ADMIN_SECRET = "myadminsecretkey"

let gqlClient

const createGQLClient = (api_url, admin_secret) =>
  new GraphQLClient(api_url, {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": admin_secret,
    },
  })

export const initializeGQL = (
  adminSecret = ADMIN_SECRET,
  apiUrl = API_URL,
  initialState = null
): GraphQLClient => {
  const _gqlClient = gqlClient ?? createGQLClient(apiUrl, adminSecret)
  // For SSG and SSR always create a new Client
  if (typeof window === "undefined") return _gqlClient
  // Create the  Client once in the client
  if (!gqlClient) gqlClient = _gqlClient

  return _gqlClient
}