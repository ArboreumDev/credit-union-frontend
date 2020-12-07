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
import {
  FeedbackPopover,
  SupportPopover,
} from "components/common/nav/FeedbackPopover"
import DynamicDoughnut from "components/dashboard/doughnut"
import { fetchJSON } from "lib/api"
import { dec_to_perc } from "lib/currency"
import React, { useEffect, useState } from "react"
import { Currency } from "../common/Currency"

const AppBar = () => (
  <Flex
    color="black"
    paddingLeft="1.5rem"
    paddingRight="1.5rem"
    paddingBottom="0.8rem"
    paddingTop="1rem"
    as="nav"
    minH="40px"
    minW="s"
  >
    <Flex align="center">
      <HStack spacing={[5, 10, 20]}>
        <img width="150px" src="/images/logo.svg" alt="logo" />
      </HStack>
    </Flex>
    <Box flex="1"></Box>
    <HStack display={["none", "none", "block"]} className="navButtons">
      <FeedbackPopover />
      <SupportPopover />
    </HStack>
  </Flex>
)
interface Props {
  lenderId: string
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
interface User {
  invested: number
  uninvested: number
  name: string
}
const LenderDashboard = (props: { lenderId: string }) => {
  const initUser: User = {
    invested: 0,
    uninvested: 0,
    name: "",
  }
  const [user, setLender] = useState(initUser)

  useEffect(() => {
    const fetchAPY = async () => {
      const url =
        "http://localhost:8000/lender/da95cd3148734b17b17d6b26bdf577cc"
      const user = await fetchJSON({ url })
      setLender(user)
    }
    try {
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
      <AppBar />
      <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
        <Stack w="100%" spacing={8}>
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
                  <DynamicDoughnut amounts={[user.invested, user.uninvested]} />
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
        </Stack>
      </Box>
    </>
  )
}

export default LenderDashboard
