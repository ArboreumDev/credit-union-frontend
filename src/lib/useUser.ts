import { LAST_REDIRECT_PAGE } from "lib/constant"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"
import { Session } from "./types"

// inspired by https://github.com/vercel/next.js/blob/7203f500916d336f4e1cbcd162baff624c9cd969/examples/with-iron-session/lib/useUser.js#L5
function getRedirectLocation(session: Session, currentPage: string) {
  if (!session || !session.user) return "/"
  console.log(session)
  const user = session.user
  if (!user.user_type || !user.onboarded) return "/onboarding"
  if (user.user_type) {
    if (currentPage === "/profile" || currentPage.includes("/dashboard"))
      return currentPage
    else return "/dashboard"
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
        sessionStorage.setItem(LAST_REDIRECT_PAGE, destination)
        router.push(destination)
      }
    }
  }, [session])

  return { user: session ? session.user : undefined, mutate }
}
