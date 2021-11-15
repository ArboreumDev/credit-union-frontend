import {
  Button,
  HStack,
  VStack,
  Text,
  useClipboard,
} from "@chakra-ui/core"

type size = "short" | "long"

interface Props {
  address: string
  size?: size
  name?: string
}

const Address = ({ address, size = "short", name = "" }: Props) => {
  const { hasCopied, onCopy } = useClipboard(address)
  let displayAddress = address.substr(0, 9)

  if (size === "short") {
    displayAddress += "..." + address.substr(-8)
  } else if (size === "long") {
    displayAddress = address
  }

  return (
    <>
      <HStack>
        <Text>{displayAddress} ({name}) </Text>
        <Button onClick={onCopy} >
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </HStack>
    </>
  )
}

export default Address
