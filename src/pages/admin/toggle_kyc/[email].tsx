import Router from "next/router"
import { getSession } from "next-auth/client"
import { NextPageContext, GetServerSideProps } from "next"
import DbClient from "gql/db_client"
import { Session } from "lib/types"
import { ADMIN_EMAIL } from "lib/constant"

const Page = (props: { success: boolean }) => {
  if (!props.success) {
    return <div>Unauthorized</div>
  }
  return <div>Toggled kyc</div>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as Session

  // TODO: Add admin authorization check
  if (session.user.email !== ADMIN_EMAIL) {
    return { props: { success: false } }
  }

  // const { email } = context.query

  // const dbClient = new DbClient()
  // const user = await dbClient.getUserByEmail(email as string)
  // console.log(email, user)
  // dbClient.sdk.ApproveKYC({
  //   userId: user.id,
  //   kycApproved: !user.kyc_approved,
  // })
  // TODO send email to user

  return { props: { success: true } }
}

export default Page
