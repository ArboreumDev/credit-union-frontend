import { Button, HStack } from "@chakra-ui/core"
import AmountInput from "./AmountInput"
import { Currency } from "./Currency"

interface HelperButtonProps {
  inputSetValue: any
  amount: number
  label: string
}
const HelperButton = ({ inputSetValue, amount, label }: HelperButtonProps) => (
  <Button
    onClick={() => {
      inputSetValue("amount", amount)
    }}
    colorScheme="teal"
    size="xs"
  >
    {label + "="}
    <Currency amount={amount} />
  </Button>
)

interface Props {
  passRef: any
  setValue: any
  nextAmount?: number
  maxAmount?: number
  helpers: { [label: string]: number }
}
export const AmountInputWithHelper = ({
  passRef,
  setValue,
  helpers,
}: Props) => {
  return (
    <>
      <HStack>
        {Object.keys(helpers).map((k) => (
          <HelperButton
            key={k + "helper"}
            label={k}
            amount={helpers[k]}
            inputSetValue={setValue}
          />
        ))}
      </HStack>
      <AmountInput passRef={passRef} />
    </>
  )
}
