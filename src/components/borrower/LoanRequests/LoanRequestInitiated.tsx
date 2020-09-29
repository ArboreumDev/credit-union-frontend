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
import SupportersList, { Supporter } from "../CreateLoan/SupportersList"

interface Params {
  loanRequest: LoanRequest
}

const BLoanRequestInitiated = ({ loanRequest }: Params) => {
  const addSupporter = (supporter: Supporter) => {
    console.log(supporter)
  }
  return (
    <Stack spacing={10}>
      <Stack>
        <Center>
          <Text fontSize="100px">
            <CgFileDocument />
          </Text>
        </Center>
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
      </Stack>
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
      <AddSupporter addSupporter={addSupporter} />
    </Stack>
  )
}

export default BLoanRequestInitiated
