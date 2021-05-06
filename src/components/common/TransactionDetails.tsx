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
  Link,
} from "@chakra-ui/core"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { UserTransaction } from "lib/types"
import { Row, Table, TextColumn } from "./Table"

interface Props {
  tx: UserTransaction
}

const etherscanBaseUrl = "https://etherscan.io/tx/"
const algoExplorerBaseUrl = "https://algoexplorer.io/tx/"

export const TransactionDetails = ({ tx }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>...</Button>
      <Modal size="xxl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Row>{tx.type}</Row>
              <Row>ref no: {tx.details.id}</Row>
              <Row>Date: {tx.createDate}</Row>
              <Row>Amount: ${tx.amount}</Row>
              <Row>Status: {tx.status}</Row>
              {tx.details.destination.type === "blockchain" && (
                <>
                  <Row>target-chain: {tx.details.destination.chain}</Row>
                  <Row>
                    <Text>transaction hash: </Text>
                    <Link
                      href={`${
                        tx.details.destination.chain === "ETH"
                          ? etherscanBaseUrl
                          : algoExplorerBaseUrl
                      }${tx.details.transactionHash}`}
                      isExternal
                      color="teal.500"
                    >
                      {tx.details.transactionHash}
                      <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Row>
                </>
              )}
            </Table>
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
