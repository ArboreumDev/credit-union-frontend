import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/core"
import { useRef } from "react"
import FeedbackPopover from "./FeedbackPopover"
import SupportPopover from "./SupportPopover"
import { FiSettings } from "react-icons/fi"

export default function DrawerButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button
        className="drawerButton"
        ref={btnRef}
        onClick={onOpen}
        variant="ghost"
      >
        <FiSettings />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              <Stack>
                <FeedbackPopover />
                <SupportPopover />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
