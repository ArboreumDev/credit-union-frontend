import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"
import { UIState } from "../utils/UIStateHelpers"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Page = () => {
  return <LandingPage />
}

Page.getInitialProps = async ({ req, res }) => {
  const session = (await getSession({ req })) as Session
  if (res) {
    if (session)
      if (!session.user.user_type)
        res.writeHead(301, {
          Location: "/onboarding",
        })
      else
        res.writeHead(301, {
          Location: "/dashboard",
        })
    res.end()
  }

  return {}
}
export default Page
