import { Button, Text } from "@chakra-ui/react"
import { COMPANY_NAME, DEFAULT_COMPANY_NAME } from "lib/constant"
import Link from "next/link"

export default function CompanyX() {
  let companyName = DEFAULT_COMPANY_NAME
  if (typeof window !== "undefined")
    companyName = localStorage.getItem(COMPANY_NAME)
  return (
    <Link href="http://example.com/">
      <Button fontWeight="lighter" variant="ghost">
        <Text as="samp">{companyName}</Text>
      </Button>
    </Link>
  )
}
