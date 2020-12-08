import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Divider,
  Flex,
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

interface Investment {
  amount: number
  farmer: string
}
interface User {
  invested: number
  uninvested: number
  name: string
  lendings: Investment[]
}

const PledgeInvestments = (props: { investments: Investment[] }) => (
  <Stack spacing="15px">
    <Box>
      <Heading size="md">Investments</Heading>
    </Box>
    <Flex fontWeight="semibold">
      <Box verticalAlign="center" flex="1">
        Name
      </Box>
      <Box flex="1">Amount</Box>
    </Flex>
    {props.investments.map((pledge, idx) => (
      <Flex key={"inv_" + idx}>
        <Box verticalAlign="center" flex="1">
          <Text>{pledge.farmer}</Text>
        </Box>
        <Box flex="1">
          <Currency amount={pledge.amount} />
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
    const fetchAPY = async () => {
      const url = "/api/yazali/lender"
      const user = await fetchJSON({
        url,
        payload: { lenderId: props.lenderId },
      })
      setLender(user)
      setLoading(false)
    }
    try {
      console.log("fetching...")
      fetchAPY()
    } catch (error) {
      console.log(
        error,
        "Cannot query Notion backend to fetch actual APY for user."
      )
    }
  }, [])

  const totalAsset = user.invested + user.uninvested
  const percInvested = dec_to_perc(user.invested / totalAsset)
  const percUninvested = dec_to_perc(user.uninvested / totalAsset)

  return (
    <>
      <Head>
        <title>Lender {user.name} </title>
      </Head>
      <AppBar />
      {loading && (
        <Center>
          {" "}
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
                  <Currency amount={user.invested} />
                </StatNumber>
              </Stat>
              {user.uninvested > 0 && (
                <Stat>
                  <StatLabel fontSize="lg">
                    <Tooltip label="Annual Percentage Yield">APY</Tooltip>
                  </StatLabel>
                  <StatNumber fontSize="3xl">{14.4}%</StatNumber>
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
                    {AllocatedAsset("Uninvested", percUninvested, "gray.400")}
                  </Stack>
                </Center>
              </Wrap>
            </>
            <Box maxW="sm">
              <PledgeInvestments investments={user.lendings} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default LenderDashboard
