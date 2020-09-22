import { useEffect } from "react"
import Router from "next/router"
import useSWR from "swr"
import { Session, User } from "./types"
import fetcher from "./api"

// inspired by https://github.com/vercel/next.js/blob/7203f500916d336f4e1cbcd162baff624c9cd969/examples/with-iron-session/lib/useUser.js#L5
function getRedirectLocation(session: Session, currentPage: string) {
  if (!session || !session.user) return "/"
  console.log(session)
  const user = session.user
  if (!user.user_type) return "/onboarding"
  if (user.user_type) {
    if (currentPage === "/profile" || currentPage.includes("/dashboard"))
      return currentPage
    else return "/dashboard"
  }
}

export default function useUser() {
  const { data, mutate } = useSWR("/api/auth/session", fetcher)

  if (typeof window == "undefined") return {}

  const currentPage = window.location.pathname
  const session = data as Session

  useEffect(() => {
    if (session) {
      const destination = getRedirectLocation(session, currentPage)
      if (destination != currentPage) Router.push(destination)
    }
  }, [session])

  return { user: session ? session.user : undefined, mutate }
}
