// Author: @gparuthi
// From mocks at https://docs.google.com/presentation/d/1vIBX9ZdYACaZHEg2xb7KGZI7REPnni3Y4wumCzNukNY/edit

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
import { Currency } from "components/common/Currency"
import FileDropzone from "components/common/onboarding/Dropzone"
import UploadingDropzone from "components/common/onboarding/UploadingDropzone"
import AppBar from "components/yazali/AppBar"
import { FiUpload } from "react-icons/fi"

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
const col_headers = ["Invoice ID", "Value", "Date", "Photo", "Upload"]

const HeaderCell = (props: { children: any }) => (
  <Box width="100%" textAlign="center" bg="gray.100">
    {props.children}
  </Box>
)
const Cell = (props: { children: any }) => (
  <Box width="100%" textAlign="center">
    {props.children}
  </Box>
)

const Row = (props: { invoice: Invoice; key?: string }) => {
  const i = props.invoice
  const key = props.key
  return (
    <Grid templateColumns={"repeat(" + col_headers.length + ", 1fr)"} gap={3}>
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
            {Asset("Used", 40000)}
            {Asset("Available", 60000)}
          </Wrap>
        </Stack>
        <InvoiceUploadTable invoices={INVOICES} />
      </Stack>
    </Box>
  </>
)
export default App
