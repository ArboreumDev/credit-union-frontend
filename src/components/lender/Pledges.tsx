import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/core"
import DynamicDoughnut from "components/dashboard/doughnut"
import { dec_to_perc } from "lib/currency"
import { User } from "../../lib/types"
import { Currency } from "../common/Currency"

const getOngoingPledges = () => [
  { name: "Gaurav", total: 20000, status: "active", perc_repaid: 0.9 },
  { name: "Nupur", total: 30000, status: "active", perc_repaid: 0.5 },
  { name: "Laurence", total: 24000, status: "repaid", perc_repaid: 0.3 },
  {
    name: "Dju",
    total: 12000,
    status: "repaid",
    perc_repaid: 0.1,
    color: "black",
  },
  {
    name: "Sid",
    total: 15000,
    status: "repaid",
    perc_repaid: 0.7,
  },
]

const PledgeInvestments = () => (
  <Stack spacing="15px">
    <Box>
      <Heading size="md">Pledges</Heading>
    </Box>
    <Flex>
      <Box verticalAlign="center" flex="1">
        Name
      </Box>
      <Box verticalAlign="center" flex="1">
        Status
      </Box>
      <Box flex="1">Currency</Box>
    </Flex>
    {getOngoingPledges().map((row) => (
      <Flex key={row.name}>
        <Box verticalAlign="center" flex="1">
          <Text>{row.name}</Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{row.status}</Text>
        </Box>
        <Box flex="1">
          <Text color={row.color || "black"}>
            <Currency amount={row.total} />
          </Text>
        </Box>
      </Flex>
    ))}
  </Stack>
)

export default PledgeInvestments
