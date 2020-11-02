import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/core"
import { MIN_SUPPORT_RATIO } from "lib/constant"
import { dec_to_perc } from "lib/currency"
import { LoanRequest, SupporterStatus } from "lib/types"
import { Currency } from "../../common/Currency"

interface Props {
  loanRequest: LoanRequest
  supporters: LoanRequest["supporters"]
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
const SupportersList = ({ loanRequest, supporters }: Props) => (
  <Stack>
    <Heading size="md">Supporters</Heading>
    <Flex fontWeight="semibold" color="gray">
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
        <Box flex={1}>{s.user.name}</Box>
        <Box display={["none", "block"]} flex={[0, 1, 1]}>
          {s.user.email}
        </Box>
        <Box display={["none", "block"]} flex={0.6}>
          <Currency amount={s.pledge_amount} />
        </Box>
        <Box flex={0.6}>
          {dec_to_perc(s.pledge_amount / loanRequest.amount)}%
        </Box>
        <Center w="55px">{supporterStatusToTextMap[s.status]}</Center>
      </Flex>
    ))}

    {supporters.reduce(
      (a, b) => a + (b.status === SupporterStatus.confirmed && b.pledge_amount),
      0
    ) >=
      loanRequest.amount * MIN_SUPPORT_RATIO && (
      <Button>Process loan request</Button>
    )}
  </Stack>
)

export default SupportersList
