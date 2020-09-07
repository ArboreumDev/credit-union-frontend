import {
  Button,
  Center,
  Container,
  Stack,
  Box,
  Text,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/core"
import { getSession } from "next-auth/client"
import Router from "next/router"
import { CgLogOut } from "react-icons/cg"
import AppBar from "../components/common/AppBar"
import { User, Session, UserType } from "../utils/types"

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

const ProfilePage = ({ user }: Props) => {
  const transactions =
    user.user_type === UserType.Borrower ? txBorrowerFixture : txLenderFixture

  return (
    <div>
      <AppBar />
      <Container>
        <Stack>
          <Center>{user.name}</Center>
          <Center>{user.email}</Center>
          <Box h="10px" />
          <Divider />
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

          <Box h="20px" />
          <Divider />
          <Button
            onClick={() => Router.push("/api/auth/signout")}
            rightIcon={<CgLogOut />}
            colorScheme="blue"
            variant="outline"
          >
            Logout
          </Button>
        </Stack>
      </Container>
    </div>
  )
}
ProfilePage.getServerSideProps = async (context) => {
  const session = (await getSession(context)) as Session
  return { user: session.user }
}

export default ProfilePage
