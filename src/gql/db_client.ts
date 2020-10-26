import { GraphQLClient } from "graphql-request"
import { getSdk, Sdk } from "../../src/gql/sdk"
import { initializeGQL } from "./graphql_client"

/**
 * A class to be used in the frontend to send queries to the DB.
 */
export default class DbClient {
  private static instance: DbClient

  public sdk: Sdk
  public client: GraphQLClient

  constructor(_client?: GraphQLClient) {
    if (DbClient.instance) {
      return DbClient.instance
    }
    this.client = _client || initializeGQL()
    this.sdk = getSdk(this.client)
    DbClient.instance = this
  }

  getUserByEmail = async (email: string) => {
    const data = await this.sdk.GetUserByEmail({ email })
    const user = data.user[0]
    return user
  }
}
