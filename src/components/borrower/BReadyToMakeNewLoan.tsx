import KYCCompleted from "./Notifications/KYCCompleted"
import { Center, Button } from "@chakra-ui/core"
import CreateLoanModal from "./CreateLoan/CreateLoanModal"
import { User } from "../../utils/types"

interface Props {
  user: User
}

export default function BReadyToMakeNewLoan({ user }: Props) {
  return (
    <div>
      <KYCCompleted />
      <Center height="20px">
        <CreateLoanModal user={user} />
      </Center>
    </div>
  )
}
