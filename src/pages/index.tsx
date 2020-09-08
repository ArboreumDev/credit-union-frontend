import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"
import { getUIStateRoute, UIState } from "../utils/UIStateHelpers"

const Page = () => {
  return <LandingPage />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getSession(context)) as Session

  if (!session || session.uiState === UIState.Landing) {
    return { props: {} }
  } else {
    const routeUrl = getUIStateRoute(session.uiState)
    console.log("route ", routeUrl)
    const res = context.res
    if (res) {
      res.writeHead(302, {
        Location: routeUrl,
      })
      res.end()
    }
  }
}

export default Page
