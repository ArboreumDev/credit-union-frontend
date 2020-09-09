import Onboarding from "../components/common/onboarding/onboarding"

import { useSession } from "next-auth/client"
import { UIState } from "../utils/UIStateHelpers"
import { Session } from "../utils/types"

const OnboardingPage = () => {
  const [session, loading]: [Session, any] = useSession()
  if (loading) return <div></div>
  if (!session || session.user.user_type) location.replace("/")

  return <div>{session && <Onboarding user={session.user} />}</div>
}

export default OnboardingPage
