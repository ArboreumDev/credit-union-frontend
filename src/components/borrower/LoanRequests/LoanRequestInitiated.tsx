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
import { LoanRequest, LoanRequestStatus, SupporterStatus } from "lib/types"
import { Currency } from "../../common/Currency"
import AddSupporter from "../CreateLoan/AddSupporter"
import SupportersList from "../CreateLoan/SupportersList"

interface Params {
  loanRequest: LoanRequest
}

const BLoanRequestInitiated = ({ loanRequest }: Params) => {
  const addSupporter = (supporterId: string, pledge_amount: number) => {
    console.log(supporterId, pledge_amount)
  }
  return (
    <Stack padding="10px">
      <Center>
        <Text fontSize="100px">
          <CgFileDocument />
        </Text>
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
      <SupportersList
        supporters={[
          {
            name: "Gaurav",
            email: "gp@arboreum.dev",
            amount: 1000,
            status: SupporterStatus.confirmed,
          },
        ]}
        loanRequest={loanRequest}
      />
      <Box h="30px" />
      <AddSupporter addSupporter={addSupporter} />
    </Stack>
  )
}

export default BLoanRequestInitiated
