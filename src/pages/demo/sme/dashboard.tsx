// Author: @gparuthi
// From mocks at https://docs.google.com/presentation/d/1vIBX9ZdYACaZHEg2xb7KGZI7REPnni3Y4wumCzNukNY/edit

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/core"
import { Currency } from "components/common/Currency"
import AppBar from "components/yazali/AppBar"
import { FiUpload } from "react-icons/fi"
import {
  Asset,
  Cell,
  HeaderCell,
  Summary,
} from "../../../components/sme/common"

interface Invoice {
  invoiceId: string
  value: number
  date: string
  photo?: string
}

const INVOICES: Invoice[] = [
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
]
const col_headers = [
  "Select",
  "Invoice ID",
  "Value",
  "Date",
  "Photo",
  "Upload Invoice",
  "Approximate Term",
]

const Row = (props: { invoice: Invoice }) => {
  const i = props.invoice
  const key = "rep" + Math.random() * 1000
  return (
    <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
      <Cell>
        <input type="checkbox" />
      </Cell>
      <Cell>
        <Text>{i.invoiceId}</Text>
      </Cell>
      <Cell>
        <Currency amount={i.value} />
      </Cell>
      <Cell>{i.date}</Cell>
      <Cell>{i.photo}</Cell>
      <Cell>
        <label htmlFor={`upload-photo-${key}`}>
          <span style={{ margin: "auto", display: "flex", width: "20px" }}>
            <FiUpload />
          </span>
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id={`upload-photo-${key}`}
        />
      </Cell>
      <Cell>
        <select name="invoice_days">
          {/* <option value="30"></option> */}
          <option value="30">30 Days</option>
          <option value="60">60 Days</option>
          <option value="120">120 Days</option>
        </select>
      </Cell>
    </Grid>
  )
}

const InvoiceUploadTable = (props: { invoices: Invoice[] }) => {
  return (
    <Stack spacing="15px">
      <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
        {col_headers.map((name, idx) => (
          <HeaderCell key={"ch_" + idx}>{name}</HeaderCell>
        ))}
      </Grid>
      {props.invoices.map((invoice, idx) => (
        <Row key={"inv_" + idx} invoice={invoice} />
      ))}
    </Stack>
  )
}

const data = {
  used: 100000,
  total: 1000000,
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
              <Currency amount={data.total} />
            </StatNumber>
          </Stat>
        </HStack>
        <Heading size="md">Credit Line Amount</Heading>
        <Wrap w="100%">
          <Asset title="Used" amount={data.used} />
          <Asset title="Available" amount={data.total - data.used} />
        </Wrap>
        <Heading size="md">Finance Invoices</Heading>

        <Wrap w="100%">
          <Asset title="Sum of selected invoices" amount={10000} />
          <Asset title="New Credit Line amount" amount={10000} />
        </Wrap>

        <InvoiceUploadTable invoices={INVOICES} />

        <Stack w="500px">
          <Summary title="Gurukrupa to receive now" amount={10000} />
          <Summary title="Gurukrupa to receive when repaid" amount={10000} />
          <Summary
            title="Total Per-cent Discount on Invoice(s)"
            amount={10000}
          />
          <Button w="300px" colorScheme="blue">
            Finance Selected Invoices
          </Button>
        </Stack>
      </Stack>
    </Box>
  </>
)
export default App
