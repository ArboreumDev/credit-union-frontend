import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
} from "@chakra-ui/core"
import { Column, Row, Table } from "components/common/Table"
import { AddFundsForm } from "pages/dashboard/fund"
import { Profile } from "pages/profile"
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
      <Heading size="sm">You have {5} ongoing pledge investments:</Heading>
    </Box>
    {getOngoingPledges().map((row) => (
      <Flex key={row.name}>
        <Center flex="1">
          <Text color="gray.500">{row.name}</Text>
        </Center>
        <Center flex="1">
          <Text
            alignContent="center"
            color={row.color || "black"}
            align="right"
          >
            <Currency amount={row.total} />
          </Text>
        </Center>
        <Center flex="1">
          <CircularProgress value={row.perc_repaid * 100} color="green.400">
            <CircularProgressLabel>
              {row.perc_repaid * 100}%
            </CircularProgressLabel>
          </CircularProgress>
        </Center>
      </Flex>
    ))}
  </Stack>
)

const LenderDashboard = ({ user }: Props) => {
  const pledgeRequests = user.pledge_requests

  return (
    <Box margin="20px">
      <Tabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Invest</Tab>
          <Tab>Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={6}>
              {pledgeRequests.map((pr, idx) => (
                <NewPledgeRequest key={idx + `_nlr`} pledgeRequest={pr} />
              ))}
              <HStack spacing={8}>
                <Stat>
                  <StatLabel>Total Assets</StatLabel>
                  <StatNumber>₹12000.00</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>APY</StatLabel>
                  <StatNumber>4.50%</StatNumber>
                </Stat>
              </HStack>
              <Wrap></Wrap>
              <Box maxW="300px">
                <Heading size="sm">Assets</Heading>
                <Box h="20px" />
                <Stack>
                  <Flex>
                    <Box flex={0.5}>Wallet</Box>
                    <Box flex={0.5} textAlign="right">
                      <Currency amount={20000} />
                    </Box>
                  </Flex>
                  <Flex>
                    <Box flex={0.5}>Invested</Box>
                    <Box flex={0.5} textAlign="right">
                      <Currency amount={50000} />
                    </Box>
                  </Flex>
                  <Flex>
                    <Box flex={0.5}>Pledged</Box>
                    <Box flex={0.5} textAlign="right">
                      <Currency amount={30000} />
                    </Box>
                  </Flex>
                </Stack>
              </Box>

              <Box maxW="300px">
                <Heading size="sm">Asset Allocation</Heading>
                <Box h="20px" />
                <Stack>
                  <Flex>
                    <Box flex={0.5}>Wallet</Box>
                    <Box flex={1}>
                      <Progress h="20px" value={20} />
                    </Box>
                    <Box flex={0.3} textAlign="right">
                      20%
                    </Box>
                  </Flex>
                  <Flex>
                    <Box flex={0.5}>Invested</Box>
                    <Box flex={1}>
                      <Progress h="20px" value={50} />
                    </Box>
                    <Box flex={0.3} textAlign="right">
                      50%
                    </Box>
                  </Flex>
                  <Flex>
                    <Box flex={0.5}>Pledged</Box>
                    <Box flex={1}>
                      <Progress h="20px" value={30} />
                    </Box>
                    <Box flex={0.3} textAlign="right">
                      30%
                    </Box>
                  </Flex>
                </Stack>
              </Box>
              <Box maxW="300px">
                <PledgeInvestments />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <AddFundsForm user={user} />
          </TabPanel>
          <TabPanel>
            <Profile user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LenderDashboard
