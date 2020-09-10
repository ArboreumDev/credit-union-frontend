import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core"
import { User } from "utils/types"
import CreateLoanForm from "./CreateLoanForm"

interface Props {
  user: User
}

export default function CreateLoanModal({ user }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Request Loan</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Request Loan</ModalHeader>
            <ModalBody>
              <CreateLoanForm user={user} />
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
