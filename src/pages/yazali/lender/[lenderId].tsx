import { Center, useColorMode } from "@chakra-ui/react"
import LenderDashboard from "components/yazali/YazaliLenderDashboard"
import { User, UserType } from "lib/types"
import { useRouter } from "next/router"

const LenderHome = () => {
  const router = useRouter()
  const { lenderId } = router.query
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      {lenderId && <LenderDashboard lenderId={lenderId as string} />}
      {!lenderId && <Center>Error loading details</Center>}
    </>
  )
}

export default LenderHome
