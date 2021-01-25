import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Progress,
  Spinner,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/core"
import {
  FeedbackPopover,
  SupportPopover,
} from "components/common/nav/FeedbackPopover"
import DynamicDoughnut from "components/dashboard/doughnut"
import { fetchJSON } from "lib/api"
import { dec_to_perc } from "lib/currency"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { Currency } from "../common/Currency"
import AppBar from "./AppBar"

interface Repayment {
  date: number
  amount: number
}

interface Investment {
  amount: number
  borrower: string
  invested_at?: number
  maturity?: number
  loan_amount: number
  total_repayed_amount: number
  expected_repayed_amount: number
  APR: number
}

interface User {
  invested: number
  uninvested: number
  name: string
  lendings: Investment[]
}

export const PledgeInvestments = (props: { investments: Investment[] }) => {
  const cols = [
    "Name",
    "Amount",
    "Total Exposure",
    "Expected Repayment",
    "Total Repaid",
    "Maturity Date",
    "APR",
  ]

  return (
    <Stack spacing="15px">
      <Box>
        <Heading size="md">Investments</Heading>
        <Text>More granular details are coming soon.</Text>
      </Box>

      <Grid templateColumns={"repeat(" + cols.length + ", 1fr)"} gap={3}>
        {cols.map((c) => (
          <Box width="100%" textAlign="center" bg="gray.100" key={"col" + c}>
            {c}
          </Box>
        ))}
      </Grid>

      {props.investments.map((pledge, idx) => (
        <Grid
          key={"inv_" + idx}
          templateColumns={"repeat(" + cols.length + ", 1fr)"}
          gap={3}
        >
          <Box verticalAlign="center" width="100%" textAlign="center">
            <Text>{pledge.borrower}</Text>
          </Box>
          <Box width="100%" textAlign="center">
            <Currency amount={pledge.amount} />
          </Box>
          <Box width="100%" textAlign="center">
            {dec_to_perc(pledge.amount / (pledge.loan_amount * 1.25))} %
          </Box>
          <Box width="100%" textAlign="center">
            <Currency amount={pledge.expected_repayed_amount} />
          </Box>
          <Box width="100%" textAlign="center">
            <Currency amount={pledge.total_repayed_amount} />
          </Box>
          <Box width="100%" textAlign="center">
            {pledge.maturity &&
              new Date(pledge.maturity * 1000).toLocaleDateString()}
            {!pledge.maturity && new Date("03/01/2021").toLocaleDateString()}
          </Box>
          <Box width="100%" textAlign="center">
            {dec_to_perc(pledge.APR)} %
          </Box>
        </Grid>
      ))}
    </Stack>
  )
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
interface YazaliDashboardProps {
  user: User
  loading?: boolean
}
export const YazaliDashboard = ({ user, loading }: YazaliDashboardProps) => {
  const totalAsset = user.invested + user.uninvested
  const percInvested = dec_to_perc(user.invested / totalAsset, 0)
  const percUninvested = dec_to_perc(user.uninvested / totalAsset, 0)

  return (
    <>
      <Head>
        <title>Lender {user.name} </title>
      </Head>
      <AppBar />
      {loading && (
        <Center>
          <Spinner />
        </Center>
      )}
      {!loading && (
        <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
          <Stack w="100%" spacing={8}>
            <Alert status="success">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>{user.name}</AlertTitle>
                <AlertDescription display="block">
                  Your funds have been invested!
                </AlertDescription>
              </Box>
            </Alert>
            <HStack spacing={20} marginTop={1}>
              <Stat>
                <StatLabel fontSize="lg">Total Assets</StatLabel>
                <StatNumber fontSize="3xl">
                  <Currency amount={user.invested + user.uninvested} />
                </StatNumber>
              </Stat>
              {user.uninvested > 0 && (
                <Stat>
                  <StatLabel fontSize="lg">
                    <Tooltip label="Annual Percentage Yield">APY</Tooltip>
                  </StatLabel>
                  <StatNumber fontSize="3xl">{14.6}%</StatNumber>
                </Stat>
              )}
            </HStack>
            <Heading size="md">Account Overview</Heading>
            <Stack>
              <Wrap w="100%">
                {Asset("Invested", user.invested)}
                {Asset("Uninvested", user.uninvested)}
              </Wrap>
            </Stack>

            <>
              <Heading size="md">Asset Allocation</Heading>
              <Wrap w="100%" spacing={[8, 0, 0, 0]}>
                <Center minW={280} maxW="sm">
                  <Box w={160}>
                    <DynamicDoughnut
                      amounts={[user.invested, user.uninvested]}
                    />
                  </Box>
                </Center>
                <Divider display={["none", "block"]} orientation="vertical" />
                <Center minW={320} maxW="sm">
                  <Stack w="100%" spacing={6}>
                    {AllocatedAsset("Invested", percInvested, "teal.500")}
                    {AllocatedAsset("Uninvested", percUninvested, "gray.500")}
                  </Stack>
                </Center>
              </Wrap>
            </>
            <Box minW="xl">
              <PledgeInvestments investments={user.lendings} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  )
}

const LenderDashboard = (props: { lenderId: string }) => {
  const initUser: User = {
    invested: 0,
    uninvested: 0,
    name: "",
    lendings: [],
  }
  const [user, setLender] = useState(initUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLender = async () => {
      const url = "/api/yazali/lender"
      const user = await fetchJSON({
        url,
        payload: { lenderId: props.lenderId },
      })
      console.log(user)
      setLender(user)
      setLoading(false)
    }
    try {
      console.log("fetching...")
      fetchLender()
    } catch (error) {
      console.log(error, "Cannot query Notion backend for user.")
    }
  }, [])

  return <YazaliDashboard user={user} loading={loading} />
}

export default LenderDashboard
