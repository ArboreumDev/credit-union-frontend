import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import LandingPage from "../components/common/landing"
import { Session } from "../utils/types"
import { UIState } from "../utils/UIStateHelpers"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Page = () => {
  const [session, loading]: [Session, boolean] = useSession()
  const router = useRouter()

  if (loading) return null

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.push("/dashboard")
      }
    }
  }, [session, loading])

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/dashboard")
  }, [])

  return <LandingPage />
}

export default Page
