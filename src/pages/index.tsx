import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"
import { UIState } from "../utils/UIStateHelpers"
import { useSession } from "next-auth/client"

const Page = () => {
  const [session, loading]: [Session, boolean] = useSession()
  if (loading) return <div></div>
  if (session) {
    const user = session.user
    if (!user.user_type) location.replace("/onboarding")
    else location.replace("/dashboard")
  }

  return <LandingPage />
}

export default Page
