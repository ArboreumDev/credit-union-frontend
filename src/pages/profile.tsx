import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/core"
import AppBar from "components/common/nav/AppBar"
import LogoutButton from "components/common/nav/LogoutButton"
import WithdrawFundsForm from "components/lender/Withdraw"
import FundsHistory from "components/common/FundsHistory"
// import AlgoProfile from "components/common/algorand/AlgoProfile"
import { User, UserType } from "lib/types"
import useUser from "lib/useUser"
import Router from "next/router"
import { CgLogOut } from "react-icons/cg"
import dynamic from 'next/dynamic'

const AlgoProfile = dynamic(
    () => import('components/common/algorand/AlgoProfile'),
    { ssr: false }
  )



interface Props {
  // user: User
}

const txBorrowerFixture = [
  { key: "02/10/2020", type: "Repayment", value: "₹100" },
  { key: "02/10/2020", type: "Repayment", value: "₹100" },
  { key: "02/10/2020", type: "Repayment", value: "₹100" },
  { key: "02/10/2020", type: "Disbursal", value: "₹12,000" },
]

const txLenderFixture = [
  { key: "02/10/2020", type: "Repayment", value: "₹100" },
  { key: "02/10/2020", type: "Repayment", value: "₹100" },
  { key: "02/10/2020", type: "Repayment", value: "₹100" },
  { key: "02/10/2020", type: "Invested", value: "₹12,000" },
]

export const Profile = ({ }: Props) => {
  const { user, mutate } = useUser()
  const transactions =
    user.user_type === UserType.Borrower ? txBorrowerFixture : txLenderFixture

  return (
    <Stack spacing={6}>
      <Stack>
        <Heading size="sm">Profile</Heading>
        <Text>{user.first_name + " " + user.last_name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        {user.user_type && (
          <AlgoProfile account={user.account_details}/>
        )}
      </Stack>
      <Divider />
      <LogoutButton />
      <Divider />
      <Box minW="xl">
        <div>History</div>
        {/* <FundsHistory transfers={user.account_details.circle?.history || []} /> */}
      </Box>
    </Stack>
  )
}

const ProfilePage = () => {
  const { user } = useUser()

  if (!user) return <AppBar />

  return (
    <div>
      <AppBar />
      <Profile />
    </div>
  )
}

export default ProfilePage
