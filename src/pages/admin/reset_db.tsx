import { Button } from "@chakra-ui/core"
import DbClient from "gql/db_client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { Session } from "lib/types"
import { ADMIN_EMAIL } from "lib/constant"

const View = (props: { success: boolean }) => {
  if (!props.success) {
    return <div>Unauthorized</div>
  }
  return <div>Done!</div>
}

export default View

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users

  // TODO: Add admin authorization check
  // INTERMEDIATE SOLUTION:
  // const session = (await getSession(context)) as Session
  // if (session.user.email !== ADMIN_EMAIL) {
  // return { props: { success: false } }
  // }

  // const sdk = new DbClient().sdk
  // if (process.env.ENVIRONMENT === "preview")
  // await sdk.ResetDB()

  return { props: {} }
}
