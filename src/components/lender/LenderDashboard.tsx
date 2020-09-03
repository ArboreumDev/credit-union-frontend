import { Center, Stack, Wrap } from "@chakra-ui/core"
import DynamicDoughnut from "../dashboard/doughnut"
import LineChart from "../dashboard/linechart"
import { NewLoanRequest } from "./Notifications/NewLoanRequest"
import { User } from "../../utils/types"

interface Props {
  user: User
}

const LenderDashboard = ({ user }: Props) => {
  const loanRequests = user.loan_requests // TODO change query to get lender_loan_requests

  return (
    <Stack padding="20px" spacing="20px">
      {loanRequests.map((lr, idx) => (
        <NewLoanRequest key={`$(idx)+nlr`} loanRequest={lr} />
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
