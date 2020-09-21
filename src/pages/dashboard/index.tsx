import { Center } from "@chakra-ui/core"
import useUser from "lib/useUser"
import dynamic from "next/dynamic"
import Head from "next/head"
import AppBar from "../../components/common/AppBar"
import Contactus from "../../components/common/ContactUs"
import { User, UserType } from "../../lib/types"

const getLenderDashboard = (user: User) => {
  const LenderDashboard = dynamic(() =>
    import("components/lender/LenderDashboard")
  )
  return <LenderDashboard user={user} />
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
      <Center margin="80px">
        <Contactus />
      </Center>
    </div>
  )
}

export default Dashboard
