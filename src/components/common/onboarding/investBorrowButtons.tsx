import { Button, HStack } from "@chakra-ui/core"

const InvestBorrowButtons = (props: { needSignin?: boolean }) => {
  return (
    <HStack>
      <Button>A</Button>
      <Button>B</Button>
    </HStack>
  )
}

export default InvestBorrowButtons
