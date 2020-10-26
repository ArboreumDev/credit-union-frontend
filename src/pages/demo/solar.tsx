import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  InputGroup,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { Currency } from "components/common/Currency"

export default function Onboarding() {
  return (
    <Box width="sm" padding={4}>
      <form method="post">
        <Stack spacing={3}>
          <Divider />
          <Box padding="20px">
            <Text>You can sell your 50 shares for ₹ 5000</Text>
          </Box>

          <Text>Enter the amount you wish to transfer</Text>
          <InputGroup w={200}>
            <Input placeholder="Amount" size="lg" />
          </InputGroup>
          <Divider />
          <HStack spacing={10}>
            <Stat>
              <StatLabel fontSize="lg">Price (per kWH)</StatLabel>
              <StatNumber fontSize="3xl">
                <Currency amount={5} />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="lg">Total Bill</StatLabel>
              <StatNumber fontSize="3xl">
                <Currency amount={1500} />
              </StatNumber>
            </Stat>
          </HStack>
          <Button w={100}>Pay Now</Button>
          <Divider />
          <HStack spacing={10}>
            <Stat>
              <StatLabel fontSize="lg">Total Investment</StatLabel>
              <StatNumber fontSize="3xl">
                <Currency amount={100000} />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="lg">Amount Due this quarter</StatLabel>
              <StatNumber fontSize="3xl">
                <Currency amount={10000} />
              </StatNumber>
            </Stat>
          </HStack>
          <Text size="lg">Earnings</Text>
          <Stat>
            <StatLabel fontSize="lg">This Quarter</StatLabel>
            <StatNumber fontSize="3xl">
              <Currency amount={2500} />
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Total Lifetime</StatLabel>
            <StatNumber fontSize="3xl">
              <Currency amount={6000} />
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Current Balance</StatLabel>
            <StatNumber fontSize="3xl">
              <Currency amount={5000} />
            </StatNumber>
          </Stat>
          <Button w={100}>Withdraw</Button>

          <Divider />
          <Text>Enter the amount you wish to invest</Text>
          <AmountInput passName="amount" />

          <Box h="10px" />
          <Box padding="20px">
            This will entitle you to a dividend of Y over the project lifetime
            and save Z tons of CO2
          </Box>

          <Box h="30px" />
          <Center>
            <Button type="submit">Invest</Button>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}
