// Author: @gparuthi
// From mocks at https://docs.google.com/presentation/d/1vIBX9ZdYACaZHEg2xb7KGZI7REPnni3Y4wumCzNukNY/edit

import {
  Box,
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
  Wrap,
} from "@chakra-ui/core"
import { Currency } from "components/common/Currency"
import AppBar from "components/yazali/AppBar"
import { FiUpload } from "react-icons/fi"
import { Cell, HeaderCell } from "../../../components/sme/common"

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
    date: "12th Sept 2010",
    photo: "",
  },
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th Sept 2010",
    photo: "",
  },
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th Sept 2010",
    photo: "",
  },
  {
    invoiceId: "tx123123",
    value: 20000,
    date: "12th Sept 2010",
    photo: "",
  },
]
const col_headers = ["", "Invoice ID", "Value", "Date", "Photo", "Upload"]

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

const Asset = (title: string, amount: number) => (
  <Flex minW={300} maxW={400} borderWidth={3} borderRadius="lg" padding={5}>
    <Box flex={0.5}>{title}</Box>
    <Box flex={0.5} textAlign="right">
      <Currency amount={amount} />
    </Box>
  </Flex>
)

const data = {
  used: 100000,
  total: 500000,
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

          <Stat>
            <StatLabel fontSize="lg">
              <Tooltip label="Annual Percentage Yield">
                Credit Line Available
              </Tooltip>
            </StatLabel>
            <StatNumber fontSize="3xl">{14.6}%</StatNumber>
          </Stat>
        </HStack>
        <Heading size="md">Credit Line Amount</Heading>
        <Stack>
          <Wrap w="100%">
            {Asset("Used", data.used)}
            {Asset("Available", data.total - data.used)}
          </Wrap>
        </Stack>
        <InvoiceUploadTable invoices={INVOICES} />
      </Stack>
    </Box>
  </>
)
export default App
