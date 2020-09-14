import InvestBorrowButtons from "components/common/onboarding/investBorrowButtons"
import { InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { USER_TYPE_KEY } from "utils/constant"
import getSSRProps from "utils/ssr"
import Onboarding from "../components/common/onboarding/onboarding"
import { Center, Stack } from "@chakra-ui/core"

const BorrowerOnboardingPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [userType, setUserType] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const user_type = localStorage.getItem(USER_TYPE_KEY)
    if (user_type) setUserType(user_type)
  })
  if (userType)
    return (
      <div>{userType && <Onboarding user={user} userType={userType} />}</div>
    )

  return (
    <div>
      <div className="Container">
        <Stack spacing={4} align="stretch">
          <Center margin="40px" h="40px">
            <img width="150px" src="/images/logo.svg" alt="logo" />
          </Center>
          <Center h="40px">
            <InvestBorrowButtons />
          </Center>
        </Stack>
      </div>
    </div>
  )
}

export const getServerSideProps = getSSRProps

export default BorrowerOnboardingPage
