import { Button, Text } from "@chakra-ui/core"
import { COMPANY_NAME, DEFAULT_COMPANY_NAME } from "lib/constant"
import Link from "next/link"

export default function CompanyX() {
  const companyName =
    typeof window === "undefined"
      ? ""
      : localStorage.getItem(COMPANY_NAME) ?? DEFAULT_COMPANY_NAME
  return (
    <Link href="http://example.com/">
      <Button fontWeight="lighter" variant="ghost">
        <Text as="samp">{companyName}</Text>
      </Button>
    </Link>
  )
}
