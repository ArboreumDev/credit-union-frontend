import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
  Wrap,
  HStack,
  Button,
} from "@chakra-ui/core"
import { User } from "../../lib/types"
import { Currency } from "../common/Currency"
import DynamicDoughnut from "../dashboard/doughnut"
import LineChart from "../dashboard/linechart"
import { NewPledgeRequest } from "./Notifications/NewPledgeRequest"

interface Props {
  user: User
}

const getOngoingPledges = () => [
  { name: "Gaurav", total: 120000, perc_repaid: 0.9 },
  { name: "Nupur", total: 120000, perc_repaid: 0.5 },
  { name: "Lawrence", total: 20000, perc_repaid: 0.3 },
  {
    name: "Dju",
    total: 20000,
    perc_repaid: 0.1,
    color: "black",
  },
  {
    name: "Sid",
    total: 25000,
    perc_repaid: 0.7,
  },
]

const PledgeInvestments = () => (
  <Stack spacing="15px" minW="280px">
    <Center>You have {5} ongoing pledge investments:</Center>
    {getOngoingPledges().map((row) => (
      <Flex key={row.name}>
        <Box flex="1">
          <Text color="gray.500">{row.name}</Text>
        </Box>
        <Box flex="1">
          <Text
            alignContent="center"
            color={row.color || "black"}
            align="right"
          >
            <Currency amount={row.total} />
          </Text>
        </Box>
        <Box flex="1">
          <CircularProgress value={row.perc_repaid * 100} color="green.400">
            <CircularProgressLabel>
              {row.perc_repaid * 100}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
    ))}
  </Stack>
)

const LenderDashboard = ({ user }: Props) => {
  const pledgeRequests = user.pledge_requests // TODO change query to get lender_loan_requests

  return (
    <Stack padding="20px" spacing="20px">
      {pledgeRequests.map((pr, idx) => (
        <NewPledgeRequest key={idx + `_nlr`} pledgeRequest={pr} />
      ))}
      <Center>
        <HStack>
          <Button>Add funds</Button>
          <Button>Withdraw funds</Button>
        </HStack>
      </Center>
      <Center>
        <Wrap w="100%" spacing="30px" justify="center">
          <DynamicDoughnut />
          <LineChart />
        </Wrap>
      </Center>

      <Center>
        <PledgeInvestments />
      </Center>
    </Stack>
  )
}

export default LenderDashboard
