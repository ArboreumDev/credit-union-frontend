import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/core"
import { LoanRequestStatus, PledgeRequest } from "../../lib/types"
import { Currency } from "../common/Currency"

interface Props {
  pledges: PledgeRequest[]
}

const loanStatusToText = {
  [LoanRequestStatus.initiated]: "Processing",
  [LoanRequestStatus.awaiting_borrower_confirmation]: "Processing",
  [LoanRequestStatus.active]: "Active",
  [LoanRequestStatus.settled]: "Completed",
}

const PledgeInvestments = ({ pledges }: Props) => (
  <Stack spacing="15px">
    <Box>
      <Heading size="md">Pledges</Heading>
    </Box>
    <Flex fontWeight="semibold">
      <Box verticalAlign="center" flex="1">
        Name
      </Box>
      <Box verticalAlign="center" flex="1">
        Loan Status
      </Box>
      <Box flex="1">Currency</Box>
    </Flex>
    {pledges.map((pledge) => (
      <Flex key={pledge.request_id}>
        <Box verticalAlign="center" flex="1">
          <Text>{pledge.loan_request.user.name}</Text>
        </Box>
        <Box verticalAlign="center" flex="1">
          <Text>{loanStatusToText[pledge.loan_request.status]}</Text>
        </Box>
        <Box flex="1">
          <Currency amount={pledge.pledge_amount} />
        </Box>
      </Flex>
    ))}
  </Stack>
)

export default PledgeInvestments
