import Router from "next/router"
import { getSession } from "next-auth/client"
import { NextPageContext, GetServerSideProps } from "next"
import DbClient from "gql/db_client"
import { Session } from "lib/types"

const Page = (props: { session: Session }) => {
  return <div>Toggled kyc</div>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as Session

  // TODO: Add admin authorization check
  const { email } = context.query

  const dbClient = new DbClient()
  const user = await dbClient.getUserByEmail(email as string)
  console.log(email, user)
  dbClient.sdk.ApproveKYC({
    userId: user.id,
    kycApproved: !user.kyc_approved,
  })

  return { props: { session } }
}

export default Page
