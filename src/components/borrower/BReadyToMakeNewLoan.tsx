import KYCCompleted from "./Notifications/KYCCompleted"
import { Center, Button, Heading, Box } from "@chakra-ui/core"
import CreateLoanModal from "./CreateLoan/CreateLoanModal"
import { User } from "../../utils/types"
import CreateLoanForm from "./CreateLoan/CreateLoanForm"

interface Props {
  user: User
}

export default function BReadyToMakeNewLoan({ user }: Props) {
  return (
    <Box>
      <KYCCompleted />
      <Box h="30px" />
      <Center>
        <Heading as="h1" size="lg">
          Request Loan
        </Heading>
      </Center>
      <Box h="30px" />
      <CreateLoanForm user={user} />
    </Box>
  )
}
