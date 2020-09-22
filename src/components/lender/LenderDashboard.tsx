import {
  Box,
  Flex,
  Heading,
  HStack,
  Progress,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { User } from "../../lib/types"
import { Currency } from "../common/Currency"

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
  <Stack spacing="15px" minW="280px">
    <Box>
      <Heading size="sm">You have {5} ongoing pledge investments</Heading>
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

const LenderDashboard = ({ user }: Props) => (
  <Stack maxW="lg" spacing={10}>
    <Box />
    <HStack spacing={20}>
      <Stat>
        <StatLabel fontSize="lg">Total Assets</StatLabel>
        <StatNumber fontSize="3xl">₹12000.00</StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="lg">APY</StatLabel>
        <StatNumber fontSize="3xl">4.50%</StatNumber>
      </Stat>
    </HStack>
    <Box>
      <Heading size="sm">Asset Allocation</Heading>
      <Box h="20px" />
      <Stack spacing={6}>
        <Flex>
          <Box flex={0.5}>Uninvested</Box>
          <Box flex={0.5} textAlign="center">
            <Currency amount={20000} />
          </Box>
          <Box flex={1}>
            <Progress h="20px" value={20} />
          </Box>
          <Box flex={0.3} textAlign="right">
            20%
          </Box>
        </Flex>
        <Flex>
          <Box flex={0.5}>Invested</Box>
          <Box flex={0.5} textAlign="center">
            <Currency amount={50000} />
          </Box>
          <Box flex={1}>
            <Progress h="20px" value={50} />
          </Box>
          <Box flex={0.3} textAlign="right">
            50%
          </Box>
        </Flex>
        <Flex>
          <Box flex={0.5}>Pledged</Box>
          <Box flex={0.5} textAlign="center">
            <Currency amount={30000} />
          </Box>
          <Box flex={1}>
            <Progress h="20px" value={30} />
          </Box>
          <Box flex={0.3} textAlign="right">
            30%
          </Box>
        </Flex>
      </Stack>
    </Box>
    <Box>
      <PledgeInvestments />
    </Box>
  </Stack>
)
export default LenderDashboard
