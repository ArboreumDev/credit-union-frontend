import {
  Box,
  Button,
  Center,
  Stack,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Divider,
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
      <Flex mb={2}>
        {/* <Input value={value} isReadOnly placeholder="Welcome" /> */}
        <Text>{displayAddress}</Text>
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </>
  )
}

export default Address
