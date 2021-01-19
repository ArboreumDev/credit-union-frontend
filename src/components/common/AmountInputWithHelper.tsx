import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
} from "@chakra-ui/core"
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
    {label}: <Currency amount={amount} />
  </Button>
)

interface Props {
  passRef: any
  setValue: any
  nextAmount?: number
  maxAmount?: number
}
export const AmountInputWithButtons = ({
  passRef,
  setValue,
  nextAmount,
  maxAmount,
}: Props) => {
  return (
    <>
      <HStack>
        {nextAmount && (
          <HelperButton
            label="Next"
            amount={nextAmount}
            inputSetValue={setValue}
          />
        )}
        {maxAmount && (
          <HelperButton
            label="Max"
            amount={maxAmount}
            inputSetValue={setValue}
          />
        )}
      </HStack>
      <AmountInput passRef={passRef} />
    </>
  )
}
