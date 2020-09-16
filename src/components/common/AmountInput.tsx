import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/core"

const AmountInput = (props: { passRef: any }) => (
  <InputGroup>
    <InputLeftAddon>₹</InputLeftAddon>
    <Input placeholder="Amount" name="amount" size="lg" ref={props.passRef} />
  </InputGroup>
)
export default AmountInput
