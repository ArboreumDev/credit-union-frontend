import { Button } from "@chakra-ui/core"
import DbClient from "gql/db_client"
import { GetServerSideProps } from "next"

const View = () => <div>Done!</div>
export default View

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users

  const sdk = new DbClient().sdk
  // if (process.env.ENVIRONMENT === "preview")
  await sdk.ResetDB()

  return { props: {} }
}
