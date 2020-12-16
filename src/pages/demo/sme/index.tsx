import { Box, Heading, Stack } from "@chakra-ui/core"
import AppBar from "components/yazali/AppBar"
import Link from "next/link"
import { useEffect } from "react"

const SME = () => {
  useEffect(() => {
    // localStorage.setItem(COMPANY_NAME, "TUSKER")
  }, [])
  return (
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
}
export default SME
