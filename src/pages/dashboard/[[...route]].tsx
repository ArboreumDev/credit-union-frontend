import { Center } from "@chakra-ui/core"
import { stringType } from "aws-sdk/clients/iam"
import useUser from "lib/useUser"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
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

const lenderTabMap = {
  invest: 1,
  account: 2,
}
const borrowerTabMap = {
  repay: 2,
  account: 1,
}

export const getDashboardComponent = (user: User, idx?: number) => (
  <>
    <AppBar />
    {user.user_type === UserType.Lender && getLenderHome(user, idx)}
    {user.user_type === UserType.Borrower && getBorrowerHome(user, idx)}
  </>
)

const Dashboard = () => {
  const { user } = useUser()
  const router = useRouter()

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