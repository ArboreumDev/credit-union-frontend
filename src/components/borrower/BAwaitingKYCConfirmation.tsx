import KYCCompleted from "./Notifications/KYCCompleted"
import { Center, Button } from "@chakra-ui/core"
import CreateLoanModal from "./CreateLoan/CreateLoanModal"
import { User } from "../../utils/types"
import ApplicationSubmitted from "./Notifications/ApplicationSubmitted"

interface Props {
  user: User
}

export default function BAwaitingKYCConfirmation({ user }: Props) {
  return (
    <div>
      <ApplicationSubmitted />
      <Center height="20px">
        <CreateLoanModal user={user} />
      </Center>
    </div>
  )
}
