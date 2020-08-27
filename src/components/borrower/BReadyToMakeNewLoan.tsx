import KYCCompleted from "./Notifications/KYCCompleted"
import { Center, Button } from "@chakra-ui/core"

export default function BReadyToMakeNewLoan() {
  return (
    <div>
      <KYCCompleted />
      <Center height="20px">
        <Button>Request Loan</Button>
      </Center>
    </div>
  )
}
