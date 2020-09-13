import { Session } from "./types"
import { getSession } from "../../node_modules/next-auth/client"
import { GetServerSideProps } from "next"

function getRedirectLocation(page: string, session: Session) {
  if (page == "/") {
    if (session && session.user.user_type) return "/dashboard"
  }
  if (page == "/dashboard") {
    if (!session || !session.user || !session.user.user_type) return "/"
  }
  if (page == "/onboarding") {
    if (!session) return "/"
    if (session.user && session.user.user_type) return "/dashboard"
  }
}

const getSSRProps: GetServerSideProps = async ({ req, res }) => {
  const session = (await getSession({ req })) as Session
  if (res) {
    const redirectLocation = getRedirectLocation(req.url, session)

    res.writeHead(301, {
      Location: redirectLocation,
    })
    res.end()
  }

  return { props: { user: session.user } }
}
