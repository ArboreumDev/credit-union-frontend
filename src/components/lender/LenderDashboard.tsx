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
  Wrap,
} from "@chakra-ui/core"
import { User } from "../../lib/types"
import { Currency } from "../common/Currency"
import { dec_to_perc } from "lib/currency"
import DynamicDoughnut from "components/dashboard/doughnut"
import LineChart from "components/dashboard/linechart"

interface Props {
  user: User
}

const getOngoingPledges = () => [
  { name: "Gaurav", total: 120000, perc_repaid: 0.9 },
  { name: "Nupur", total: 120000, perc_repaid: 0.5 },
  { name: "Laurence", total: 20000, perc_repaid: 0.3 },
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
  <Stack spacing="15px">
    <Box>
      <Heading size="md">You have {5} ongoing pledge investments</Heading>
    </Box>
    {getOngoingPledges().map((row) => (
      <Flex key={row.name}>
        <Box verticalAlign="center" flex="1">
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
      </Flex>
    ))}
  </Stack>
)
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
const LenderDashboard = ({ user }: Props) => (
  <Stack w="100%" spacing={8}>
    <HStack spacing={20} marginTop={1}>
      <Stat>
        <StatLabel fontSize="lg">Total Assets</StatLabel>
        <StatNumber fontSize="3xl">
          <Currency amount={120000} />
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="lg">APY</StatLabel>
        <StatNumber fontSize="3xl">{dec_to_perc(0.045)}%</StatNumber>
      </Stat>
    </HStack>
    <Heading size="md">Account Overview</Heading>
    <Stack>
      <Wrap w="100%">
        {Asset("Uninvested", 20000)}
        {Asset("Invested", 50000)}
        {Asset("Pledged", 30000)}
      </Wrap>
    </Stack>
    <Heading size="md">Asset Allocation</Heading>
    <Wrap w="100%" spacing={[8, 0, 0, 0]}>
      <Center minW={320} maxW="sm">
        <Box w={160}>
          <DynamicDoughnut amounts={[20, 50, 30]} />
        </Box>
      </Center>
      <Center minW={320} maxW="sm">
        <Stack w="100%" spacing={6}>
          {AllocatedAsset("Uninvested", 20, "#FF6384")}
          {AllocatedAsset("Invested", 50, "#36A2EB")}
          {AllocatedAsset("Pledged", 30, "#FFCE56")}
        </Stack>
      </Center>
    </Wrap>
    <Box maxW="sm">
      <PledgeInvestments />
    </Box>
  </Stack>
)
export default LenderDashboard
