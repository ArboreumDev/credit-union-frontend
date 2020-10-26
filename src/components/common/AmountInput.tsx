import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/core"

const AmountInput = (props: { passName: string; passRef?: any }) => (
  <InputGroup>
    <InputLeftAddon>₹</InputLeftAddon>
    <Input
      placeholder="Amount"
      name={props.passName}
      size="lg"
      ref={props.passRef}
    />
  </InputGroup>
)
export default AmountInput
