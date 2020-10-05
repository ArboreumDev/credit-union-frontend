import {
  Box,
  Center,
  Divider,
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
import LenderModel from "./LenderModel"
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
    <Box flex={0.7}>
      <Text color={color} fontWeight="semibold" fontSize="lg">
        {title}
      </Text>
    </Box>
    <Box flex={1}>
      <Progress
        marginTop="5px"
        size="lg"
        colorScheme="gray"
        value={percentage}
      />
    </Box>
    <Box flex={0.4} textAlign="right">
      <Text color={color} fontSize="lg">
        {percentage}%
      </Text>
    </Box>
  </Flex>
)

const LenderDashboard = ({ user }: Props) => {
  const lender = new LenderModel(user)

  return (
    <Stack w="100%" spacing={8}>
      <HStack spacing={20} marginTop={1}>
        <Stat>
          <StatLabel fontSize="lg">Total Assets</StatLabel>
          <StatNumber fontSize="3xl">
            <Currency amount={lender.totalAssets} />
          </StatNumber>
        </Stat>
        {lender.uninvested > 0 && (
          <Stat>
            <StatLabel fontSize="lg">
              <Tooltip label="Annual Percentage Yield">APY</Tooltip>
            </StatLabel>
            <StatNumber fontSize="3xl">{lender.APY}%</StatNumber>
          </Stat>
        )}
      </HStack>
      <Heading size="md">Account Overview</Heading>
      <Stack>
        <Wrap w="100%">
          {Asset("Invested", lender.invested)}
          {Asset("Pledged", lender.totalPledgeAmount)}
          {Asset("Uninvested", lender.uninvested)}
        </Wrap>
      </Stack>
      {lender.totalAssets > 0 && (
        <>
          <Heading size="md">Asset Allocation</Heading>
          <Wrap w="100%" spacing={[8, 0, 0, 0]}>
            <Center minW={280} maxW="sm">
              <Box w={160}>
                <DynamicDoughnut
                  amounts={[
                    lender.invested,
                    lender.totalPledgeAmount,
                    lender.uninvested,
                  ]}
                />
              </Box>
            </Center>
            <Divider display={["none", "block"]} orientation="vertical" />
            <Center minW={320} maxW="sm">
              <Stack w="100%" spacing={6}>
                {AllocatedAsset("Invested", lender.percInvested, "teal.500")}
                {AllocatedAsset("Pledged", lender.percPledged, "green.500")}
                {AllocatedAsset(
                  "Uninvested",
                  lender.percUninvested,
                  "gray.400"
                )}
              </Stack>
            </Center>
          </Wrap>
        </>
      )}

      {user.pledges?.length > 0 && (
        <Box maxW="sm">
          <PledgeInvestments pledges={user.pledges} />
        </Box>
      )}
    </Stack>
  )
}

export default LenderDashboard
