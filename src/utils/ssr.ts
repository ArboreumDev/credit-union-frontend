import { Session } from "./types"
import { getSession } from "../../node_modules/next-auth/client"

export const getSessionAsProps = async (context) => ({
  session: (await getSession(context)) as Session,
})
