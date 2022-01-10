import { LAST_REDIRECT_PAGE } from "lib/constant"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"
import { Session } from "./types"

// inspired by https://github.com/vercel/next.js/blob/7203f500916d336f4e1cbcd162baff624c9cd969/examples/with-iron-session/lib/useUser.js#L5
function getRedirectLocation(session: Session, currentPage: string) {
  if (!session || !session.user) {
    console.log('sending to home')
    return "/"
  }
  console.log('session:', session)
  const user = session.user
  if (!user.user_type || !user.onboarded) return "/onboarding"
  if (!user.kyc_approved) return "/pending"
  if (user.user_type) {
    console.log('currentpage', currentPage)
    if (currentPage === "/profile" || currentPage.includes("/dashboard")) {
      console.log('staying')
      return currentPage
    }
    else {
      console.log('sending to dashboard')
      return "/dashboard"
    }
  }
}
const fetcher = (url) => fetch(url).then((r) => r.json())

export default function useUser() {
  // Fast redirect from home
  const { data, mutate } = useSWR("/api/auth/session", fetcher)
  const router = useRouter()

  if (typeof window == "undefined") return {}

  const currentPage = window.location.pathname
  const session = data as Session
  const isDemo = () => /^\/demo.*$/.test(currentPage)

  useEffect(() => {
    if (!isDemo() && session) {
      const destination = getRedirectLocation(session, currentPage)
      if (destination != currentPage) {
        localStorage.setItem(LAST_REDIRECT_PAGE, destination)
        console.log('pushing to', destination)
        router.push(destination)
      }
    }
  }, [session])

  return {
    user: session ? session.user : undefined,
    mutate,
    options:
      session?.user?.user_type === "lender" ? session.options : undefined,
  }
}
