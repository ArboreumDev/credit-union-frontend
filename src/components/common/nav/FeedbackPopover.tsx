import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Textarea,
} from "@chakra-ui/core"
import { captureFeedback } from "lib/api"
import { createRef, useRef, useState } from "react"

interface Props {
  title: string
  header: string
  onSubmit: (v: string) => void
  buttonVariant?: string
}

const InputTextPopover = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const textInput = createRef<HTMLTextAreaElement>()
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const submitHandler = () => {
    const node = textInput.current as any
    props.onSubmit(node.value as string)
    setIsOpen(false)
  }
  return (
    <Popover
      initialFocusRef={textInput}
      isOpen={isOpen}
      onOpen={open}
      onClose={close}
    >
      <PopoverTrigger>
        <Button variant={props.buttonVariant ?? "outline"}>
          {props.title}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverCloseButton />
        <PopoverArrow />
        <PopoverHeader border="0">{props.header}</PopoverHeader>
        <PopoverBody>
          <Textarea ref={textInput} autoFocus />
          <Button onClick={submitHandler}>Send</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const SupportPopover = () => (
  <InputTextPopover
    title="Support"
    header="Please write to us and we will get back to you shortly!"
    onSubmit={captureFeedback}
    buttonVariant="ghost"
  />
)

export const FeedbackPopover = () => (
  <InputTextPopover
    title="Feedback"
    header="Your feedback helps us improve!"
    onSubmit={captureFeedback}
  />
)
