import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/core"

import { Row, Table, TextColumn } from "../common/Table"

export interface Props {
  handleConfirm: CallableFunction
  details: {
    targetAddress: string
    amount: string
  }
}

export const ReviewWithdrawal = ({ handleConfirm, details }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button isFullWidth={false} size="sm" mr={3} onClick={onOpen}>
        Review Withdrawal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review Withdrawal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Table>
                <Row key="owner">
                  <TextColumn>target:</TextColumn>
                  <TextColumn>{details.targetAddress}</TextColumn>
                </Row>
                <Row key="amount">
                  <TextColumn>amount:</TextColumn>
                  <TextColumn>${details.amount}</TextColumn>
                </Row>
              </Table>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                handleConfirm()
                onClose()
              }}
            >
              That&apos;s correct!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ReviewWithdrawal
