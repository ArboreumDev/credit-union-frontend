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
import WithdrawFundsForm from "components/lender/withdraw"
import { User, UserType } from "lib/types"
import useUser from "lib/useUser"
import Router from "next/router"
import { CgLogOut } from "react-icons/cg"

interface Props {
  user: User
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

export const Profile = ({ user }: Props) => {
  const { user: _, mutate } = useUser()
  const transactions =
    user.user_type === UserType.Borrower ? txBorrowerFixture : txLenderFixture

  return (
    <Stack spacing={6}>
      <Stack>
        <Heading size="sm">Profile</Heading>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
      </Stack>
      {user.user_type === UserType.Lender && (
        <Stack>
          <Divider />
          <Heading size="sm">Withdraw</Heading>
          <WithdrawFundsForm user={user} />
        </Stack>
      )}
      <Divider />

      {user.user_type === UserType.Borrower && (
        <Box>
          <Heading as="h4" size="md">
            Transactions
          </Heading>
          <Box h="10px" />
          <Stack>
            {transactions.map((tx, idx) => (
              <Flex key={idx + "row"}>
                <Box w="200px">
                  <Text color="gray.500">{tx.key}</Text>
                </Box>
                <Box flex="1">
                  <Text align="right">{tx.type}</Text>
                </Box>
                <Box w="200px">
                  <Text align="right">{tx.value}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        </Box>
      )}
      <Box h="20px" />
      <Divider />
      <LogoutButton />
    </Stack>
  )
}

const ProfilePage = () => {
  const { user } = useUser()

  if (!user) return <AppBar />

  return (
    <div>
      <AppBar />
      <Profile user={user} />
    </div>
  )
}

export default ProfilePage
