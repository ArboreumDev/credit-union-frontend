import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
  Spinner,
  Center,
  AlertIcon,
  AlertTitle,
  Flex,
  Progress,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Tooltip,
  Wrap,
} from "@chakra-ui/core"
import { Transfer, Payment } from "lib/types"
import { UserTransaction } from "lib/types"
import { TransactionDetails } from "./TransactionDetails"

interface Props {
  transfers: UserTransaction[]
  userWalletId: string
}

const FundsHistory = ({ transfers }: Props) => {
  const cols = ["Description", "from/to", "Date", "Amount", "Status", "Details"]

  return (
    <Box w="100%">
      <Stack spacing="15px">
        <Box>
          <Heading size="md">Transaction History</Heading>
        </Box>

        <Grid templateColumns={"repeat(" + cols.length + ", 1fr)"} gap={3}>
          {cols.map((c) => (
            <Box width="100%" textAlign="center" bg="gray.100" key={"col" + c}>
              {c}
            </Box>
          ))}
        </Grid>

        {transfers.map((transfer, idx) => (
          <Grid
            key={"inv_" + idx}
            templateColumns={"repeat(" + cols.length + ", 1fr)"}
            gap={3}
          >
            <Box verticalAlign="center" width="100%" textAlign="center">
              {transfer.type}
            </Box>
            <Box verticalAlign="center" width="100%" textAlign="center">
              {transfer.type === "Withdrawal"
                ? transfer.destination
                : transfer.source}
            </Box>
            <Box width="100%" textAlign="center">
              {transfer.createDate.substring(0, 10)}
            </Box>
            <Box width="100%" textAlign="center">
              <Text>
                {" "}
                {transfer.type === "Withdrawal" ? "-" : ""}${transfer.amount}
              </Text>
            </Box>
            <Box width="100%" textAlign="center">
              {transfer.status}
            </Box>
            <Box width="100%" textAlign="center">
              <TransactionDetails tx={transfer} />
            </Box>
          </Grid>
        ))}
      </Stack>
    </Box>
  )
}

export default FundsHistory
