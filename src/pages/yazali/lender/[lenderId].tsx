import LenderDashboard from "components/lender/YazaliLenderDashboard"
import { User, UserType } from "lib/types"
import { useRouter } from "next/router"

const LenderHome = () => {
  const router = useRouter()
  const { lenderId } = router.query

  return <LenderDashboard lenderId={lenderId as string} />
}

export default LenderHome
