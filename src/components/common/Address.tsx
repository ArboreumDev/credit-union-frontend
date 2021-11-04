import {
  Button,
  HStack,
  Text,
  useClipboard,
} from "@chakra-ui/core"

type size = "short" | "long"

interface Props {
  address: string
  size?: size
}

const Address = ({ address, size = "short" }: Props) => {
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
        <Text>{displayAddress}</Text>
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </HStack>
    </>
  )
}

export default Address
