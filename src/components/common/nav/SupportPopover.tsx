import {
  Button,
  Textarea,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/core"
import { captureFeedback } from "lib/api"
import { createRef } from "react"

const SupportPopover = () => {
  const textInput = createRef<HTMLTextAreaElement>()
  const submitHandler = () => {
    const node = textInput.current as any
    captureFeedback(node.value as string)
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">Support</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader border="0">
          Please email us and we will get back to you shortly.
        </PopoverHeader>
        <PopoverBody>
          <Textarea
            ref={textInput}
            autoFocus
            placeholder="Ask us any question!"
          />
          <Button onClick={submitHandler}>Send</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SupportPopover
