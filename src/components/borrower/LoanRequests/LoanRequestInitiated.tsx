import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { CgFileDocument } from "react-icons/cg"
import { LoanRequest } from "lib/types"
import { Currency } from "../../common/Currency"
import AddSupporter from "../CreateLoan/AddSupporter"

interface Params {
  loanRequest: LoanRequest
}

const LoanSupporter = ({ loanRequest }: Params) => (
  <Stack>
    <Heading size="md">Supporters</Heading>
    <Flex>
      <Box flex={1}>Gaurav</Box>
      <Box flex={1}>gp@arboreum.dev</Box>
      <Box flex={1}>Accepted</Box>
    </Flex>
  </Stack>
)

const BLoanRequestInitiated = ({ loanRequest }: Params) => (
  <Stack padding="10px">
    <Center>
      <Text fontSize="100px">
        <CgFileDocument />
      </Text>
    </Center>
    <Center>
      <Text>Loan request is being processed.</Text>
    </Center>
    <Box h="30px" />
    <StatGroup>
      <Stat>
        <StatLabel>Amount</StatLabel>
        <StatNumber>
          <Currency amount={loanRequest.amount} />
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Purpose</StatLabel>
        <StatNumber>{loanRequest.purpose}</StatNumber>
      </Stat>
    </StatGroup>
    <Box h="30px" />
    <LoanSupporter />
    <Box h="30px" />
    <AddSupporter />
  </Stack>
)

export default BLoanRequestInitiated
