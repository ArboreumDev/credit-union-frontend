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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core"
import {
  FeedbackPopover,
  SupportPopover,
} from "components/common/nav/FeedbackPopover"
import useUser from "lib/useUser"
import { useRef } from "react"
import { FiSettings } from "react-icons/fi"

export default function DrawerButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
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
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
