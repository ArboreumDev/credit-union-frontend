// Author: @gparuthi
// From mocks at https://docs.google.com/presentation/d/1vIBX9ZdYACaZHEg2xb7KGZI7REPnni3Y4wumCzNukNY/edit

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
} from "@chakra-ui/core"
import { Currency } from "components/common/Currency"
import AppBar from "components/yazali/AppBar"
import { Cell, HeaderCell, Summary } from "../../../components/sme/common"

interface Repayment {
  invoiceId: string
  vendor?: string
  amountRepaid: number
  amountDue: number // same as invoice value
  dueDate: string
}

const Repayments: Repayment[] = [
  {
    invoiceId: "tx3",
    vendor: "test",
    amountRepaid: 20000,
    amountDue: 40000,
    dueDate: "12th March 2021",
  },
  {
    invoiceId: "tx2",
    vendor: "test",
    amountRepaid: 20000,
    amountDue: 40000,
    dueDate: "12th March 2021",
  },
  {
    invoiceId: "tx4",
    vendor: "test",
    amountRepaid: 20000,
    amountDue: 40000,
    dueDate: "12th March 2021",
  },
]
const col_headers = [
  "Invoice ID",
  "Vendor",
  "Due Date",
  "Total Due",
  "Amount Repaid",
  "Amount Outstanding",
  "SME Amount Outstanding",
]

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
        <Text>{i.dueDate}</Text>
      </Cell>
      <Cell>
        <Currency amount={i.amountDue} />
      </Cell>
      <Cell>
        <Currency amount={i.amountRepaid} />
      </Cell>
      <Cell>
        <Currency amount={i.amountDue - i.amountRepaid} />
      </Cell>
      <Cell>
        <Currency amount={i.amountDue * (0.2 - 0.0384)} />
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

const App = () => (
  <>
    <AppBar />
    <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
      <Stack w="100%" spacing={8}>
        <HStack spacing={20} marginTop={1}>
          <Stat>
            <StatLabel fontSize="lg">Total Credit Line</StatLabel>
            <StatNumber fontSize="3xl">
              <Currency amount={1000000} />
            </StatNumber>
          </Stat>
        </HStack>
        <Heading size="md">Monitor Financed Invoices</Heading>
        <RepaymentTable repayments={Repayments} />

        <Stack w="500px">
          <Summary title="Total Amount Outstanding" amount={10000} />
          <Summary title="Total Amount Repaid" amount={10000} />
          <Summary
            title="Total Amount Gurukrupa to rceive when repaid"
            amount={10000}
          />
          <Button w="300px" colorScheme="blue">
            Finace Selected Invoices
          </Button>
        </Stack>
      </Stack>
    </Box>
  </>
)
export default App
