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
import { PledgeRequest, User } from "../../lib/types"
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
interface Props {
  pledges: PledgeRequest[]
}

const PledgeInvestments = ({ pledges }: Props) => (
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
    {pledges.map((pledge) => (
      <Flex key={pledge.request_id}>
        <Box verticalAlign="center" flex="1">
          <Text>{pledge.loan_request.user.name}</Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{"active"}</Text>
        </Box>
        <Box flex="1">
          <Currency amount={pledge.pledge_amount} />
        </Box>
      </Flex>
    ))}
  </Stack>
)

export default PledgeInvestments
