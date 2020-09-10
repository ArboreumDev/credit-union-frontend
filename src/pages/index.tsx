import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"

const Page = () => {
  const [session, loading]: [Session, boolean] = useSession()
  const router = useRouter()

  if (loading) return null

  if (!loading) {
    if (session) {
      router.push("/dashboard")
    }
  }

  // Prefetch the dashboard page
  router.prefetch("/dashboard")

  return <LandingPage />
}

export default Page
