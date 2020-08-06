import { Session } from "./types";
import { getSession } from "next-auth/client"

export const getSessionAsProps = async (context) => ({
         session: (await getSession(context)) as Session,
       })