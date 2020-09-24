import { Center } from "@chakra-ui/core"
import useUser from "lib/useUser"
import dynamic from "next/dynamic"
import Head from "next/head"
import AppBar from "../../components/common/nav/AppBar"
import { User, UserType } from "../../lib/types"

const getLenderHome = (user: User, initPanelIdx?: number) => {
  const LenderHome = dynamic(() => import("components/lender/LenderHome"))
  return <LenderHome user={user} initPanelIdx={initPanelIdx} />
}

const getBorrowerHome = (user: User, initPanelIdx?: number) => {
  const BorrowerHome = dynamic(() => import("components/borrower/BorrowerHome"))
  return <BorrowerHome user={user} initPanelIdx={initPanelIdx} />
}

export const getDashboardComponent = (user: User, initPanelIdx?: number) => (
  <>
    <AppBar />
    {user.user_type === UserType.Lender && getLenderHome(user, initPanelIdx)}
    {user.user_type === UserType.Borrower &&
      getBorrowerHome(user, initPanelIdx)}
  </>
)

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <AppBar />

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      {getDashboardComponent(user)}
    </div>
  )
}

export default Dashboard
