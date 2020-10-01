import { SupporterStatus } from "../../src/lib/types"

export const getUserPortfolio = (userList) => {
  let ret = {}
  userList.forEach((user) => {
    ret[user.id] = { cash: user.balance, share: user.corpus_share }
  })
  return ret
}

export const addAndConfirmSupporter = async (
  sdk,
  dbClient,
  request_id,
  supporter_id,
  pledge_amount
) => {
  await sdk.AddSupporter({
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
