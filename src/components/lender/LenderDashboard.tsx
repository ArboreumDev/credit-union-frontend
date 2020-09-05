import { Center, Stack, Wrap } from "@chakra-ui/core"
import DynamicDoughnut from "../dashboard/doughnut"
import LineChart from "../dashboard/linechart"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"
import { User } from "../../utils/types"
import { Details, Row } from "../borrower/common/Details"

interface Props {
  user: User
}

const getOngoingPledges = (): Row[] => [
  { key: "Gaurav", value: "₹1,20,000" },
  { key: "Nupur", value: "₹1,20,000" },
  { key: "Lawrence", value: "₹20,000" },
  {
    key: "Dju",
    value: "₹20,000",
    color: "red.500",
  },
  {
    key: "Sid",
    value: "₹20,000",
    color: "red.500",
  },
]

const LenderDashboard = ({ user }: Props) => {
  console.log(user)
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
      <Center>Ongoing Loans</Center>
      <Center>
        <Details rows={getOngoingPledges()} />
      </Center>
    </Stack>
  )
}

export default LenderDashboard
