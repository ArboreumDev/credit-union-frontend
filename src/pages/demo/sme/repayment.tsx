// Author: @gparuthi
// From mocks at https://docs.google.com/presentation/d/1vIBX9ZdYACaZHEg2xb7KGZI7REPnni3Y4wumCzNukNY/edit

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
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
import { Currency } from "components/common/Currency"
import FileDropzone from "components/common/onboarding/Dropzone"
import UploadingDropzone from "components/common/onboarding/UploadingDropzone"
import AppBar from "components/yazali/AppBar"
import { FiUpload } from "react-icons/fi"

interface Repayment {
  invoiceId: string
  vendor?: string
  amount: number
  amountDue: number
  amountOwed: number
  currentPrice: number
  dueDate: string
}

const Repayments: Repayment[] = [
  {
    invoiceId: "tx3",
    vendor: "test",
    amount: 20000,
    amountDue: 40000,
    amountOwed: 60000,
    dueDate: "12th Sept 2010",
    currentPrice: 20000,
  },
  {
    invoiceId: "tx2",
    vendor: "test",
    amount: 20000,
    amountDue: 40000,
    amountOwed: 60000,
    dueDate: "12th Sept 2010",
    currentPrice: 20000,
  },
  {
    invoiceId: "tx4",
    vendor: "test",
    amount: 20000,
    amountDue: 40000,
    amountOwed: 60000,
    dueDate: "12th Sept 2010",
    currentPrice: 20000,
  },
]
const col_headers = [
  "Invoice ID",
  "Vendor",
  "Amount Repaid",
  "Amount Due",
  "Amount Owed 2 Gurukrupa",
  "Price if repaid now",
  "Repay",
]

const HeaderCell = (props: { children: any }) => (
  <Box width="100%" textAlign="center" bg="gray.100">
    {props.children}
  </Box>
)
const Cell = (props: { children: any }) => (
  <Box width="100%" margin="auto" justifyContent="center" display="flex">
    {props.children}
  </Box>
)

const Row = (props: { invoice: Repayment }) => {
  const i = props.invoice
  const key = "rep" + Math.random() * 1000
  return (
    <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
      <Cell>
        <Text>{i.invoiceId}</Text>
      </Cell>
      <Cell>
        <Text>{i.vendor}</Text>
      </Cell>
      <Cell>
        <Currency amount={i.amount} />
      </Cell>
      <Cell>
        <Currency amount={i.amountDue} />
      </Cell>
      <Cell>
        <Currency amount={i.amountOwed} />
      </Cell>
      <Cell>
        <Currency amount={i.currentPrice} />
      </Cell>
      <Cell>
        <Button>Repay</Button>
      </Cell>
    </Grid>
  )
}

const RepaymentTable = (props: { repayments: Repayment[] }) => {
  return (
    <Stack spacing="15px">
      <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
        {col_headers.map((name, idx) => (
          <HeaderCell key={"ch_" + idx}>{name}</HeaderCell>
        ))}
      </Grid>
      {props.repayments.map((invoice, idx) => (
        <Row key={"inv_" + idx} invoice={invoice} />
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

const App = () => (
  <>
    <AppBar />
    <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
      <Stack w="100%" spacing={8}>
        <HStack spacing={20} marginTop={1}>
          <Stat>
            <StatLabel fontSize="lg">Total Credit Line</StatLabel>
            <StatNumber fontSize="3xl">
              <Currency amount={500000} />
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel fontSize="lg">
              <Tooltip label="Credit Line Available">
                Credit Line Available
              </Tooltip>
            </StatLabel>
            <StatNumber fontSize="3xl">{14.6}%</StatNumber>
          </Stat>
        </HStack>
        <Heading size="md">Credit Line Amount</Heading>
        <Stack>
          <Wrap w="100%">
            {Asset("Used", 40000)}
            {Asset("Available", 60000)}
          </Wrap>
        </Stack>
        <Heading size="md">Make Repayments</Heading>
        <RepaymentTable repayments={Repayments} />
      </Stack>
    </Box>
  </>
)
export default App
