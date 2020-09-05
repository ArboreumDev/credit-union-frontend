import { Center, Stack, Wrap } from "@chakra-ui/core"
import DynamicDoughnut from "../dashboard/doughnut"
import LineChart from "../dashboard/linechart"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"
import { User } from "../../utils/types"

interface Props {
  user: User
}

const LenderDashboard = ({ user }: Props) => {
  const pledgeRequests = user.pledge_requests // TODO change query to get lender_loan_requests

  return (
    <Stack padding="20px" spacing="20px">
      {pledgeRequests.map((pr, idx) => (
        <NewPledgeRequest key={idx + `_nlr`} pledgeRequest={pr} />
      ))}

      <Center>
        <Wrap spacing="30px" justify="center">
          <DynamicDoughnut />
          <LineChart />
        </Wrap>
      </Center>
    </Stack>
  )
}

export default LenderDashboard
