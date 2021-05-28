import {
  Divider,
  Switch,
  Box,
  Button,
  Badge,
  Center,
  Stack,
  Text,
  Link,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core"

interface WithdrawApprovalProps {
  handleConfirm: CallableFunction
}

const ReviewWithdrawApproval = ({ handleConfirm }: WithdrawApprovalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme="orange" onClick={onOpen}>
        Withdraw Approval
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Borrower Approval</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Withdrawing your approval means that your available funds will no
            longer be used to support future requests from that borrower. Any
            funds that have already been invested will NOT be withdrawn, but
            will be paid back according to the terms of the loan.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              No, go back
            </Button>
            <Button colorScheme="teal" onClick={() => handleConfirm()}>
              Yes, withdraw approval!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReviewWithdrawApproval
