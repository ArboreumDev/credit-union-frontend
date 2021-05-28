import useUser from "lib/useUser"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import AppBar from "../../components/common/nav/AppBar"
import { User, UserType, InvestmentOptions } from "../../lib/types"

const getLenderHome = (
  user: User,
  options: InvestmentOptions,
  initPanelIdx?: number
) => {
  const LenderHome = dynamic(() => import("components/lender/LenderHome"))
  return (
    <LenderHome user={user} initPanelIdx={initPanelIdx} options={options} />
  )
}

const getBorrowerHome = (user: User, initPanelIdx?: number) => {
  const BorrowerHome = dynamic(() => import("components/borrower/BorrowerHome"))
  return <BorrowerHome user={user} initPanelIdx={initPanelIdx} />
}

const lenderTabMap = {
  invest: 1,
  account: 2,
  repay: 2,
}

export const getDashboardComponent = (
  user: User,
  options?: InvestmentOptions,
  idx?: number
) => (
  <>
    <AppBar />
    {user.user_type === UserType.Lender && getLenderHome(user, options, idx)}
    {user.user_type === UserType.Borrower && getBorrowerHome(user, idx)}
  </>
)

const Dashboard = () => {
  const { user, options } = useUser()
  const router = useRouter()
  const { route } = router.query

  let initPanelIdx = 0
  if (route) {
    const tabIdx = route[0] in lenderTabMap ? lenderTabMap[route[0]] : 0
    initPanelIdx = tabIdx
  }

  if (!user) return <AppBar />
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      {getDashboardComponent(user, options, initPanelIdx)}
    </div>
  )
}

export default Dashboard
