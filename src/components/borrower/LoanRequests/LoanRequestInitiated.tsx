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
import { LoanRequest } from "../../../utils/types"

interface Params {
  loanRequest: LoanRequest
}

export const BLoanRequestInitiated = ({ loanRequest }: Params) => (
  <Container minW="s" bg="white">
    <Box margin="20px" padding="10px" borderWidth="5px" borderRadius="lg">
      <Center>
        <Text padding="0px" margin="0px" fontSize="100px">
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
          <StatNumber>INR {loanRequest.amount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Purpose</StatLabel>
          <StatNumber>{loanRequest.purpose}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  </Container>
)
