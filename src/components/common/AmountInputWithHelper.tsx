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

const HelperButton = ({ inputSetValue, amount, label }) => (
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

export const AmountInputWithButtons = ({
  passRef,
  setValue,
  nextAmount,
  maxAmount,
}) => {
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
