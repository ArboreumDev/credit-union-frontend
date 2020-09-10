import { useSession, getSession } from "next-auth/client"
import { useRouter } from "next/router"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"

const Page = () => {
  return <LandingPage />
}

Page.getInitialProps = async ({ req, res }) => {
  const session = (await getSession({ req })) as Session
  if (res) {
    if (session)
      res.writeHead(301, {
        Location: "/dashboard",
      })
    res.end()
  }

  return {}
}
export default Page
