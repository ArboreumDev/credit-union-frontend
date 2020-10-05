import { Box, Button, Input } from "@chakra-ui/core"
import InvestBorrowButtons from "components/common/onboarding/investBorrowButtons"
import { CURRENT_USER_EMAIL } from "lib/constant"
import useUser from "lib/useUser"
import { useRouter } from "next/router"
import LandingPage from "../components/common/landing"

const Page = () => {
  const router = useRouter()

  return (
    <Box>
      Enter user email:
      <Input
        onChange={(e) => {
          localStorage.setItem(CURRENT_USER_EMAIL, e.target.value)
          document.cookie = CURRENT_USER_EMAIL + "=" + e.target.value
        }}
      ></Input>
      <InvestBorrowButtons />
    </Box>
  )
}
export default Page
