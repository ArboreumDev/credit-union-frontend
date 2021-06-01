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
import { User, InvestmentOptionInfo, InvestmentOptions } from "lib/types"
import { Currency } from "../common/Currency"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { SetBorrowerApproval } from "lib/gql_api_actions"
import ReviewWithdrawApproval from "./ReviewWithdrawApproval"
import { Loan_Request_State_Enum } from "../../gql/sdk"

const inactiveBorrowerPlaceholderRequest = {
  amount: 0,
  purpose: "Currently not requesting financing",
  confirmation_date: "",
  state: Loan_Request_State_Enum.Withdrawn,
  request_id: "",
}

const InvestmentOption = (props: {
  data: InvestmentOptionInfo
  lender: User
}) => {
  const [loading, setloading] = useState(true)
  const [approved, setApproved] = useState(false)

  // const ativeLoan = data.loan_requests.filter(x => x.status === LoanRequestStatus.active)
  // const hasActiveRequest = data.loan_requests.filter(x => x.status === LoanRequestStatus.initiated)
  // const activeLoan = hasActiveRequest ? data.loan_requests.filter(x => x.status === LoanRequestStatus.active)[0] : undefined
  useEffect(() => {
    const isApproved = props.lender.approvedBorrowers
      .map((b) => b.borrower_id)
      .includes(props.data.id)
    setApproved(isApproved)
    setloading(false)
  }, [props.lender])

  const activeRequest =
    props.data.loan_requests.filter(
      (x) =>
        x.state === Loan_Request_State_Enum.Fulfilled ||
        x.state === Loan_Request_State_Enum.Active
    )[0] || inactiveBorrowerPlaceholderRequest

  const handleApprove = () => {
    setloading(true)
    SetBorrowerApproval.fetch({
      borrowerId: props.data.id,
      approved: !approved,
    })
      .then((res) => {
        setloading(false)
        // the data on the side only updates when it is refreshed, which is confusing here, so I am manually setting this button
        setApproved(!approved)
      })
      .catch((err) => console.error(err))
    setloading(false)
  }

  const statusToBadgeColor = (state: Loan_Request_State_Enum) => {
    switch (state) {
      case Loan_Request_State_Enum.Fulfilled:
      case Loan_Request_State_Enum.Active:
        return "green"
      // TODO
      // case Loan_Request_State_Enum.Rejected:
      case Loan_Request_State_Enum.Expired:
      case Loan_Request_State_Enum.Withdrawn:
        return "grey"
      default:
        return "teal"
    }
  }

  return (
    <Box background="gray.100">
      <HStack>
        {/* borrower details */}
        <Box>
          <VStack>
            <Text fontWeight="semibold">
              {props.data.first_name + " " + props.data.last_name}
            </Text>
            <Currency type="USD" amount={activeRequest.amount} />
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={statusToBadgeColor(activeRequest.state)}
            >
              {activeRequest.state === Loan_Request_State_Enum.Active
                ? "requested"
                : activeRequest.state}
            </Badge>
          </VStack>
        </Box>
        {/* loan term details */}
        <Box>
          <VStack>
            <Text>90 days</Text>
            <Text>interest 8%</Text>
            <Text>(daily compounding)</Text>
          </VStack>
        </Box>

        {/* {activeRequest && (
          <Box>
            <Text>{activeRequest.confirmation_date}</Text>
          </Box>
        )} */}
        {/* lender actions to extend or withdraw credit Line */}
        <Box>
          {!approved && (
            <Button
              colorScheme="teal"
              isLoading={loading}
              onClick={handleApprove}
            >
              Approve Borrower
            </Button>
          )}
          {approved && <ReviewWithdrawApproval handleConfirm={handleApprove} />}
        </Box>
        {/* actucally a slider could make sense here as well? */}
        {/* <Switch 
        colorScheme="teal"
        isChecked={approved}
        onChange={handleApprove}
        size="lg" 
        /> */}
      </HStack>
    </Box>
  )
}

export default InvestmentOption
