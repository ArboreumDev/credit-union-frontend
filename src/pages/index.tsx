import { getSession } from "next-auth/client"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"

const Page = () => {
  return <LandingPage />
}

Page.getInitialProps = async ({ req, res }) => {
  const session = (await getSession({ req })) as Session
  if (res) {
    if (session) {
      if (!session.user.user_type) {
        res.writeHead(301, {
          Location: "/onboarding",
        })
        res.end()
      } else {
        res.writeHead(301, {
          Location: "/dashboard",
        })
        res.end()
      }
    }
  }

  return {}
}
export default Page
