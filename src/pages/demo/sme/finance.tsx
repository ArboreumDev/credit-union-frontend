// Author: @gparuthi
// From mocks at https://docs.google.com/presentation/d/1vIBX9ZdYACaZHEg2xb7KGZI7REPnni3Y4wumCzNukNY/edit

import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Wrap,
} from "@chakra-ui/core"
import { bool } from "aws-sdk/clients/signer"
import { Currency } from "components/common/Currency"
import AppBar from "components/yazali/AppBar"
import { useState } from "react"
import { FiUpload } from "react-icons/fi"
import {
  Asset,
  Cell,
  HeaderCell,
  Summary,
  SummarySimple,
} from "../../../components/sme/common"

const data = {
  used: 100000,
  total: 1000000,
}

interface Invoice {
  invoiceId: string
  value: number
  date: string
  photo?: string
  selected?: bool
}

const INVOICES: Invoice[] = [
  {
    invoiceId: "tx1",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
  {
    invoiceId: "tx2",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
  {
    invoiceId: "tx3",
    value: 20000,
    date: "12th March 2021",
    photo: "",
  },
  {
    invoiceId: "tx4",
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

interface RowProps {
  invoice: Invoice
  onSelect: (id: string, checked: bool) => void
}
const Row = ({ invoice, onSelect }: RowProps) => {
  const key = "rep" + Math.random() * 1000
  const onChange = (checked: bool) => {
    onSelect(invoice.invoiceId, checked)
  }
  return (
    <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
      <Cell>
        <input
          type="checkbox"
          checked={invoice.selected}
          onChange={(ev) => onChange(ev.target.checked)}
        />
      </Cell>
      <Cell>
        <Text>{invoice.invoiceId}</Text>
      </Cell>
      <Cell>
        <Currency amount={invoice.value} />
      </Cell>
      <Cell>{invoice.date}</Cell>
      <Cell>{invoice.photo}</Cell>
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
  const [invoices, setInvoices] = useState(props.invoices)
  const onInvoiceSelect = (invoiceId: string, selected: bool) => {
    console.log(invoiceId, selected)
    const idx = invoices.findIndex((p) => p.invoiceId == invoiceId)
    const newInv = invoices[idx]
    newInv.selected = selected
    invoices.splice(idx, 1, newInv)
    setInvoices([...invoices])
  }
  const selectedInvoiceSum = invoices
    .map((i) => (i.selected ? i.value : 0))
    .reduce((a, b) => a + b)
  const toReceive = 0.8 * selectedInvoiceSum
  const receiveWhenRepaid = (0.2 - 0.0384) * selectedInvoiceSum
  return (
    <Stack spacing="15px">
      <Wrap w="100%">
        <Asset title="Sum of selected invoices" amount={selectedInvoiceSum} />
        <Asset
          title="New Credit Line amount"
          amount={data.total - data.used - selectedInvoiceSum}
        />
      </Wrap>
      <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
        {col_headers.map((name, idx) => (
          <HeaderCell key={"ch_" + idx}>{name}</HeaderCell>
        ))}
      </Grid>
      {invoices.map((invoice, idx) => (
        <Row key={"inv_" + idx} invoice={invoice} onSelect={onInvoiceSelect} />
      ))}
      <Stack w="500px">
        <Summary title="SME to receive now" amount={toReceive} />
        <Summary
          title="SME to receive when repaid"
          amount={receiveWhenRepaid}
        />
        <SummarySimple
          title="Total Per-cent Discount on Invoice(s)"
          amount={3.84}
        />
        <Button w="300px" colorScheme="blue">
          Finance Selected Invoices
        </Button>
      </Stack>
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
        <InvoiceUploadTable invoices={INVOICES} />
      </Stack>
    </Box>
  </>
)
export default App
