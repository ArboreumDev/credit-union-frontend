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
import useUser from "lib/useUser"
import { useRef } from "react"
import { FiSettings } from "react-icons/fi"
import CompanyX from "./Companyx"
import { FeedbackPopover, SupportPopover } from "./FeedbackPopover"
import LogoutButton from "./LogoutButton"

export default function DrawerButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useUser()
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
                <CompanyX />
                <FeedbackPopover />
                <SupportPopover />
                {user && <LogoutButton />}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
