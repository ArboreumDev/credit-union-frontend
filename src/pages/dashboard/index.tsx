import { Center } from "@chakra-ui/core"
import useUser from "lib/useUser"
import dynamic from "next/dynamic"
import Head from "next/head"
import AppBar from "../../components/common/nav/AppBar"
import { User, UserType } from "../../lib/types"

const getLenderDashboard = (user: User) => {
  const LenderHome = dynamic(() => import("components/lender/LenderHome"))
  return <LenderHome user={user} />
}

const getBorrowerDashboard = (user: User) => {
  const BorrowerDashboard = dynamic(() =>
    import("components/borrower/BorrowerDashboard")
  )
  return <BorrowerDashboard user={user} />
}

export const getDashboardComponent = (user: User) => (
  <div>
    {user.user_type === UserType.Lender && (
      <div>
        <AppBar />
        {getLenderDashboard(user)}
      </div>
    )}
    {user.user_type === UserType.Borrower && (
      <div>
        <AppBar />
        {getBorrowerDashboard(user)}
      </div>
    )}
  </div>
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
