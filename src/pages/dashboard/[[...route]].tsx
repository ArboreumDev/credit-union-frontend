import useUser from "lib/useUser"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import AppBar from "../../components/common/nav/AppBar"
// import {tabMap} from "../../components/lender/LenderHome"
import { User, UserType, InvestmentOptions } from "../../lib/types"
import LenderHome from "components/lender/LenderHome"

const getLenderHome = (
  user?: User,
  options?: InvestmentOptions,
  initPanelIdx?: number,
  setPanelIndex?: any
) => {
  const LenderHome = dynamic(() => import("components/lender/LenderHome"))
  return <LenderHome />
}

const getBorrowerHome = (user: User, initPanelIdx?: number, setPanelIndex?: any) => {
  const BorrowerHome = dynamic(() => import("components/borrower/BorrowerHome"))
  return <BorrowerHome user={user} initPanelIdx={initPanelIdx} />
}

export const tabMap = {
  dashboard: 0,
  funding: 1,
  // invest: 2,
  account: 2,
}

export const getDashboardComponent = (
  user: User,
  options?: InvestmentOptions,
  idx?: number,
  // setTabIndex?: any
) => (
  <>
    <AppBar />
    {user.user_type === UserType.Lender && getLenderHome(user, options, idx)}
    {user.user_type === UserType.Borrower && getBorrowerHome(user, idx)}
  </>
)

const Dashboard = () => {
  const { user, options } = useUser()
  // const router = useRouter()
  // const { route } = router.query
  // const [tabIndex, setTabIndex] = useState(0)

  let initPanelIdx = 0
  // if (route) {
  //   const tabIdx = route[0] in tabMap ? tabMap[route[0]] : 0
  //   initPanelIdx = tabIdx
  // }

  if (!user) return <AppBar />
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
        <>
          <AppBar />
          {user.user_type === UserType.Lender && 
          // getLenderHome()
            <LenderHome />

          }
          {/* {user.user_type === UserType.Borrower && getBorrowerHome(user, idx)} */}
        </>
    </div>
  )
}

export default Dashboard
