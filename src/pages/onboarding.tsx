import { Center, Stack } from "@chakra-ui/core"
import { Logo } from "components/common/landing"
import InvestBorrowButtons from "components/common/onboarding/investBorrowButtons"
import { USER_TYPE_KEY } from "lib/constant"
import useUser from "lib/useUser"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Onboarding from "../components/common/onboarding/onboarding"

const BorrowerOnboardingPage = () => {
  const { user } = useUser()
  const [userType, setUserType] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const user_type = sessionStorage.getItem(USER_TYPE_KEY)
    if (user_type) setUserType(user_type)
  })

  if (!user) return <Logo />

  if (userType)
    return (
      <div>{userType && <Onboarding user={user} userType={userType} />}</div>
    )

  return (
    <Stack spacing={4} align="stretch">
      <Logo />
      <Center h="40px">
        <InvestBorrowButtons />
      </Center>
    </Stack>
  )
}

export default BorrowerOnboardingPage
