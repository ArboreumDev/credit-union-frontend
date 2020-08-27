import KYCCompleted from "./Notifications/KYCCompleted"
import { Center, Button } from "@chakra-ui/core"
import CreateLoanModal from "./CreateLoanModal"

export default function BReadyToMakeNewLoan() {
  return (
    <div>
      <KYCCompleted />
      <Center height="20px">
        <CreateLoanModal />
      </Center>
    </div>
  )
}
