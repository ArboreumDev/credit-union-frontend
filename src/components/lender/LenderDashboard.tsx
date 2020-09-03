import DynamicDoughnut from "../dashboard/doughnut"
import LineChart from "../dashboard/linechart"
import { Box, Stack, Flex, Wrap, Center } from "@chakra-ui/core"
import NewLoanRequest from "./Notifications/NewLoanRequest"

const LenderDashboard = () => (
  <Stack padding="20px" spacing="20px">
    <NewLoanRequest />
    <Center>
      <Wrap spacing="30px" justify="center">
        <DynamicDoughnut />
        <LineChart />
      </Wrap>
    </Center>
  </Stack>
)

export default LenderDashboard
