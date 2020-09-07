import Router from "next/router"
import { getSession } from "next-auth/client"
import { NextPageContext } from "next"
import { DbClient } from "../../../gql/db_client"
import { Session } from "../../../utils/types"

const Page = (props: { session: Session }) => {
  return <div>Toggled kyc</div>
}
Page.getServerSideProps = async (context: NextPageContext) => {
  const session = (await getSession(context)) as Session

  if (session.user.email === "dev-admin@arboreum.dev") {
    const { email } = context.query

    const dbClient = new DbClient()
    const user = await dbClient.getUserByEmail(email as string)
    console.log(email, user)
    dbClient.sdk.ApproveKYC({
      userId: user.id,
      kycApproved: !user.kyc_approved,
    })
  }
  return { session: session }
}

export default Page
