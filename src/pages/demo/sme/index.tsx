import { Box, Heading, Stack } from "@chakra-ui/core"
import AppBar from "components/common/nav/AppBar"
import Link from "next/link"

const SME = () => (
  <>
    <AppBar />
    <Box margin={[0, 1, 2, 3]} padding={[2, 3, 4, 5]}>
      <Stack>
        <Heading size="sm">What would you like to do?</Heading>
        <Link href="/demo/sme/finance">Finance Invoices</Link>
        <Link href="/demo/sme/monitor">Monitor Financed Invoices</Link>
      </Stack>
    </Box>
  </>
)
export default SME
