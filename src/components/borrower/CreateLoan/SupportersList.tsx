import { Box, Center, Flex, Heading, Stack } from "@chakra-ui/core"
import { dec_to_perc } from "lib/currency"
import { LoanRequest, SupporterStatus } from "lib/types"
import { Currency } from "../../common/Currency"

export interface Supporter {
  name: string
  email: string
  amount: number
  status: SupporterStatus
}

interface Params {
  loanRequest: LoanRequest
  supporters: Supporter[]
}

const Dot = (props: { color?: string }) => (
  <>
    <span className="dot"></span>
    <style jsx>
      {`
        .dot {
          height: 15px;
          width: 15px;
          background-color: ${props.color ?? "gray"};
          border-radius: 50%;
          display: inline-block;
        }
      `}
    </style>
  </>
)

const supporterStatusToTextMap = {
  [SupporterStatus.unknown]: <Dot />,
  [SupporterStatus.rejected]: <Dot color="red" />,
  [SupporterStatus.confirmed]: <Dot color="green" />,
}
const SupportersList = ({ loanRequest, supporters }: Params) => (
  <Stack>
    <Heading size="md">Supporters</Heading>
    <Flex fontWeight="bold" color="gray">
      <Box flex={1}>Name</Box>
      <Box display={["none", "block"]} flex={[0, 1, 1]}>
        Email
      </Box>
      <Box display={["none", "block"]} flex={0.6}>
        Amount
      </Box>
      <Box flex={0.6}>Share</Box>
      <Box w="55px">Status</Box>
    </Flex>
    {supporters.map((s, idx) => (
      <Flex key={idx + "_row"}>
        <Box flex={1}>{s.name}</Box>
        <Box display={["none", "block"]} flex={[0, 1, 1]}>
          {s.email}
        </Box>
        <Box display={["none", "block"]} flex={0.6}>
          <Currency amount={s.amount} />
        </Box>
        <Box flex={0.6}>{dec_to_perc(s.amount / loanRequest.amount)}%</Box>
        <Center w="55px">{supporterStatusToTextMap[s.status]}</Center>
      </Flex>
    ))}
  </Stack>
)

export default SupportersList
