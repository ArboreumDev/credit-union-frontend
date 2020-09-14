import { Session } from "./types"
import { getSession } from "../../node_modules/next-auth/client"
import { GetServerSideProps } from "next"

export function getRedirectLocation(page: string, session: Session) {
  console.log("redirection from ", page)

  if (!session) return "/"

  const user = session.user
  if (user.user_type) return "/dashboard"
  if (!user.user_type) return "/onboarding"
}

const getSSRProps: GetServerSideProps = async ({ req, res }) => {
  const session = (await getSession({ req })) as Session
  if (res) {
    const redirectLocation = getRedirectLocation(req.url, session)
    if (redirectLocation && redirectLocation !== req.url) {
      res.writeHead(301, {
        Location: redirectLocation,
      })
      res.end()
    }
  }
  if (session && session.user) return { props: { user: session.user } }
  else return { props: {} }
}

export default getSSRProps
