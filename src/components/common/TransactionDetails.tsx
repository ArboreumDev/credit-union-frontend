import {
  Modal,
  ModalOverlay,
  Divider,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Center,
  Text,
  HStack,
  VStack,
  Flex,
  Progress,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Tooltip,
} from "@chakra-ui/core"
import { UserTransaction } from "lib/types"
import { Row, Table, TextColumn } from "./Table"
import { JsonToTable } from "react-json-to-table"

interface Props {
  tx: UserTransaction
}

export const TransactionDetails = ({ tx }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const displayData: any = {
    description: tx.type,
  }
  Object.assign(displayData, tx.details)
  // this might be our master wallet Id, whose Id should be secret
  delete displayData.source
  displayData.source = tx.source

  return (
    <>
      <Button onClick={onOpen}>...</Button>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JsonToTable json={displayData} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
