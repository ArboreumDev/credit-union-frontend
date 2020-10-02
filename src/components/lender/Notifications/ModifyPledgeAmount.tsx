import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/core"
import AmountInput from "components/common/AmountInput"
import { PledgeRequest } from "lib/types"
import { useForm } from "react-hook-form"

interface Props {
  pledgeRequest: PledgeRequest
}
type FormData = {
  amount: number
}

export default function ModifyPledgeAmount({ pledgeRequest }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, setValue, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = (data: FormData) => {
    console.log(data)
    // Modify pledge amount here
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" w="280px">
        I wish to change pledge amount
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Request Loan</ModalHeader>
            <ModalBody>
              <Box>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                  <Stack spacing={3}>
                    <Text>
                      How much money would you like to pledge to{" "}
                      {pledgeRequest.loan_request.user.name}?
                    </Text>
                    <AmountInput
                      passName="amount"
                      passRef={register({ required: true })}
                    />
                    <Box h="30px" />
                    <Center>
                      <Button type="submit">Submit</Button>
                    </Center>
                  </Stack>
                </form>
              </Box>
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
