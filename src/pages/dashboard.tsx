import { Session } from "../utils/types"
import { getSessionAsProps } from "../utils/ssr"
import AppBar from "../components/AppBar"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import { Center, Divider, Button } from "@chakra-ui/core"
import KYCCompleted from "../components/borrower/Notifications/KYCCompleted"

const Dashboard = (props: { session: Session }) => {
  return (
    <div>
      <Center height="20px"></Center>
      <ApplicationSubmitted />
      <Center height="20px"></Center>
      <KYCCompleted />
      <Center height="20px"></Center>
      <Center height="20px">
        <Button>Request Loan</Button>
      </Center>
    </div>
  )
}
Dashboard.getInitialProps = (context) => getSessionAsProps(context)

export default Dashboard
