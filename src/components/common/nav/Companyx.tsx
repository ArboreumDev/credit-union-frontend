import { Button, Text } from "@chakra-ui/core"
import Link from "next/link"

export default function CompanyX() {
  return (
    <Link href="http://example.com/">
      <Button fontWeight="lighter" variant="ghost">
        <Text as="samp">CompanyX</Text>
      </Button>
    </Link>
  )
}
