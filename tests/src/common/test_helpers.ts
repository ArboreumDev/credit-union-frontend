import DbClient from "gql/db_client"
import { SupporterStatus } from "../../../src/lib/types"

export const getUserPortfolio = (userList) => {
  const ret = {}
  userList.forEach((user) => {
    ret[user.id] = { cash: user.balance, share: user.corpus_share }
  })
  return ret
}

export const addAndConfirmSupporter = async (
  dbClient: DbClient,
  request_id: string,
  supporter_id: string,
  pledge_amount: number
) => {
  await dbClient.sdk.AddSupporter({
    supporter: {
      request_id,
      supporter_id,
      pledge_amount,
    },
  })
  await dbClient.updateSupporter(
    request_id,
    supporter_id,
    SupporterStatus.confirmed,
    pledge_amount
  )
}
