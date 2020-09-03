import DynamicDoughnut from "./doughnut"
import LineChart from "./linechart"
import { Box } from "@chakra-ui/core"
import NewLoanRequest from "./Notifications/NewLoanRequest"

export default () => (
  <Box>
    <NewLoanRequest />
    <DynamicDoughnut />
  </Box>
)
