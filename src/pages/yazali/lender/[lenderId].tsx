import { Center } from "@chakra-ui/react"
import LenderDashboard from "components/yazali/YazaliLenderDashboard"
import { useRouter } from "next/router"

const LenderHome = () => {
  const router = useRouter()
  const { lenderId } = router.query

  return (
    <>
      {lenderId && <LenderDashboard lenderId={lenderId as string} />}
      {!lenderId && <Center>Error loading details</Center>}
    </>
  )
}

export default LenderHome
