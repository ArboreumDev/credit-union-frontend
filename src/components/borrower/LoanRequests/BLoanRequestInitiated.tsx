import {
  Box,
  Center,
  Container,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { CgFileDocument } from "react-icons/cg"
import { LoanRequest } from "lib/types"
import { Currency } from "../../common/Currency"

interface Params {
  loanRequest: LoanRequest
}

const BLoanRequestInitiated = ({ loanRequest }: Params) => (
  <Container minW="s" bg="white">
    <Box padding="10px" borderWidth="3px">
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
    </Box>
  </Container>
)

export default BLoanRequestInitiated
