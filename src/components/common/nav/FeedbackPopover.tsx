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

const FeedbackPopover = () => {
  const textInput = createRef<HTMLTextAreaElement>()
  const submitHandler = () => {
    const node = textInput.current as any
    captureFeedback(node.value as string)
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Feedback</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader border="0">
          Your feedback helps us improve!
        </PopoverHeader>
        <PopoverBody>
          <Textarea ref={textInput} autoFocus placeholder="Your feedback" />
          <Button onClick={submitHandler}>Send</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default FeedbackPopover
