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
import PledgeInvestments from "./Pledges"

interface Props {
  user: User
}

const Asset = (title: string, amount: number) => (
  <Flex minW={300} maxW={400} borderWidth={3} borderRadius="lg" padding={5}>
    <Box flex={0.5}>{title}</Box>
    <Box flex={0.5} textAlign="right">
      <Currency amount={amount} />
    </Box>
  </Flex>
)
const AllocatedAsset = (title: string, percentage: number, color?: string) => (
  <Flex>
    <Box flex={0.6}>
      <Text color={color} fontSize="lg">
        {title}
      </Text>
    </Box>
    <Box flex={1}>
      <Progress color={color} h="20px" value={percentage} />
    </Box>
    <Box flex={0.3} textAlign="right">
      <Text color={color} fontSize="lg">
        {percentage}%
      </Text>
    </Box>
  </Flex>
)

// demo var
const dist = [0.2, 0.5, 0.3]
const distPerc = dist.map(dec_to_perc)

const LenderDashboard = ({ user }: Props) => (
  <Stack w="100%" spacing={8}>
    <HStack spacing={20} marginTop={1}>
      <Stat>
        <StatLabel fontSize="lg">Total Assets</StatLabel>
        <StatNumber fontSize="3xl">
          <Currency amount={user.balance} />
        </StatNumber>
      </Stat>
      {user.balance > 0 && (
        <Stat>
          <StatLabel fontSize="lg">
            <Tooltip label="Annual Percentage Yield">APY</Tooltip>
          </StatLabel>
          <StatNumber fontSize="3xl">{dec_to_perc(0.163)}%</StatNumber>
        </Stat>
      )}
    </HStack>
    <Heading size="md">Account Overview</Heading>
    <Stack>
      <Wrap w="100%">
        {Asset("Invested", dist[1] * user.balance)}
        {Asset("Pledged", dist[2] * user.balance)}
        {Asset("Uninvested", dist[0] * user.balance)}
      </Wrap>
    </Stack>
    {user.balance > 0 && (
      <>
        <Heading size="md">Asset Allocation</Heading>
        <Wrap w="100%" spacing={[8, 0, 0, 0]}>
          <Center minW={320} maxW="sm">
            <Box w={160}>
              <DynamicDoughnut amounts={dist.map((d) => d * user.balance)} />
            </Box>
          </Center>
          <Center minW={320} maxW="sm">
            <Stack w="100%" spacing={6}>
              {AllocatedAsset("Invested", distPerc[1], "#36A2EB")}
              {AllocatedAsset("Pledged", distPerc[2], "#FFCE56")}
              {AllocatedAsset("Uninvested", distPerc[0], "#FF6384")}
            </Stack>
          </Center>
        </Wrap>
      </>
    )}

    {user.pledges.length > 0 && (
      <Box maxW="sm">
        <PledgeInvestments pledges={user.pledges} />
      </Box>
    )}
  </Stack>
)
export default LenderDashboard
