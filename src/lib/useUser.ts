import { useEffect } from "react"
import Router from "next/router"
import useSWR from "swr"
import { Session } from "./types"

// inspired by https://github.com/vercel/next.js/blob/7203f500916d336f4e1cbcd162baff624c9cd969/examples/with-iron-session/lib/useUser.js#L5
function getRedirectLocation(session: Session) {
  if (!session) return "/"

  const user = session.user
  if (user.user_type) return "/dashboard"
  if (!user.user_type) return "/onboarding"
}

export default function useUser({ shouldRedirect = true } = {}) {
  const { data, mutate } = useSWR("/api/auth/session")
  const currentPage = location.pathname
  const session = data as Session

  useEffect(() => {
    const user = session.user
    const isLoggedIn = user.user_type

    if (!shouldRedirect || !user) return

    const destination = getRedirectLocation(session)

    if (destination != currentPage) Router.push(destination)
  }, [session])

  return { user: session.user }
}
