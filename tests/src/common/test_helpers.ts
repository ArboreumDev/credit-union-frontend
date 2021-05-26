import DbClient from "gql/db_client"
import { SupporterStatus } from "../../../src/lib/types"

export const getUserPortfolio = (userList) => {
  const ret = {}
  userList.forEach((user) => {
    ret[user.id] = { cash: user.balance }
  })
  return ret
}
