import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/core"

const AmountInput = (props: {
  passName: string
  passRef: any
  nextAmount?: string
}) => (
  <InputGroup>
    <InputLeftAddon>₹</InputLeftAddon>
    <Input
      placeholder={props.nextAmount}
      name={props.passName}
      size="lg"
      ref={props.passRef}
    />
  </InputGroup>
)
export default AmountInput
