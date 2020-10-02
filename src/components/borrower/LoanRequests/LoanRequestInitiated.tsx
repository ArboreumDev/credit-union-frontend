import {
  Center,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/core"
import { LoanRequest, SupporterStatus } from "lib/types"
import { CgFileDocument } from "react-icons/cg"
import { Currency } from "../../common/Currency"
import AddSupporter from "../CreateLoan/AddSupporter"
import SupportersList from "../CreateLoan/SupportersList"

interface Props {
  loanRequest: LoanRequest
}

const BLoanRequestInitiated = ({ loanRequest }: Props) => {
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
        supporters={loanRequest.supporters}
        loanRequest={loanRequest}
      />
      <AddSupporter loanRequest={loanRequest} />
    </Stack>
  )
}

export default BLoanRequestInitiated
