import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/core"

interface Props {
  passName?: string
  passRef: any
}

const AmountInput = ({ passName = "amount", passRef }: Props) => (
  <InputGroup>
    <InputLeftAddon>₹</InputLeftAddon>
    <Input placeholder={"Amount"} size="lg" name={passName} ref={passRef} />
  </InputGroup>
)
export default AmountInput
