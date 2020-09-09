import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"
import { UIState } from "../utils/UIStateHelpers"
import { useSession } from "next-auth/client"

const Page = () => {
  const [session, loading]: [Session, any] = useSession()
  if (loading) return <div></div>
  console.log(session)
  if (session) {
    if (session.uiState === UIState.Onboarding) location.replace("/Onboarding")
    else location.replace("/dashboard")
  }

  return <LandingPage />
}

export default Page
