import {
  Divider,
  Box,
  Button,
  Badge,
  Center,
  Stack,
  Text,
  Link,
  HStack,
  VStack,
} from "@chakra-ui/core"
import {
  User,
  InvestmentOptionInfo,
  InvestmentOptions,
  LoanRequestStatus,
} from "lib/types"
import { Currency } from "../common/Currency"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
// import { SetBorrowerApproval } from "lib/gql_api_actions"

type FormData = {
  amount: number
}

interface Props {
  user: User
  options: InvestmentOptions
}

const ExplainerBox = () => {
  return (
    <Box>
      <Text>
        Choose any of the projects below that you want to extend credit to. Once
        you do so, your funds will be automatically allocated either immediately
        or in the future, depending on whether the project actually has
        requested funds. See our{" "}
        <Link href="mailto:TODO" color="teal.500">
          Terms of Service
        </Link>{" "}
        for more details.
      </Text>
      <Divider />
      <Text>
        <i>
          Note that at the moment we only support financing entire requests, so
          if your available balance is lower than the amount requested by a
          project your funds will not be used (or only to support future
          requests of a lower amount.)
        </i>
      </Text>
    </Box>
  )
}

const inactiveBorrowerPlaceholderRequest = {
  amount: 0,
  purpose: "Currently not requesting financing",
  confirmation_date: "",
  status: "inactive",
  request_id: "",
}

const BorrowerCard = (props: { data: InvestmentOptionInfo; lender: User }) => {
  const [loading, setloading] = useState(false)

  // const ativeLoan = data.loan_requests.filter(x => x.status === LoanRequestStatus.active)
  // const hasActiveRequest = data.loan_requests.filter(x => x.status === LoanRequestStatus.initiated)
  // const activeLoan = hasActiveRequest ? data.loan_requests.filter(x => x.status === LoanRequestStatus.active)[0] : undefined
  const activeRequest =
    props.data.loan_requests.filter(
      (x) =>
        x.status === LoanRequestStatus.initiated ||
        x.status === LoanRequestStatus.active
    )[0] || inactiveBorrowerPlaceholderRequest
  const isApproved = props.lender.approvedBorrowers
    .map((b) => b.borrower_id)
    .includes(props.data.id)

  const handleApprove = () => {
    setloading(true)
    //   SetBorrowerApproval.fetch({
    //     borrower_id: props.data.id,
    //     target: !isApproved
    //     },
    //   })
    //     .then((res) => {
    //       setloading(false)
    //     })
    //     .catch((err) => console.error(err))
    // }
  }

  const statusToBadgeColor = (status: string) => {
    switch (status) {
      case "live":
        return "green"
      case "inactive":
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
            <Text fontWeight="semibold">{props.data.name}</Text>
            <Currency type="USD" amount={activeRequest.amount} />
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={statusToBadgeColor(activeRequest.status)}
            >
              {activeRequest.status === "initiated"
                ? "requested"
                : activeRequest.status}
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

        {activeRequest && (
          <Box>
            <Text>{activeRequest.confirmation_date}</Text>
          </Box>
        )}
        {/* lender actions to extend or withdraw credit Line */}
        <Button
          colorScheme={isApproved ? "orange" : "teal"}
          loading={loading}
          onClick={handleApprove}
        >
          {isApproved ? "WithdrawApproval" : "Approve Borrower"}
        </Button>
      </HStack>
    </Box>
  )
}

export const InvestmentCards = (props: {
  borrowers: InvestmentOptions
  lender: User
}) => {
  console.log(props.borrowers)
  return (
    <Box>
      {props.borrowers.map((b, idx) => (
        <BorrowerCard
          key={"borrowerCard" + idx}
          data={b}
          lender={props.lender}
        />
      ))}
    </Box>
  )
}

const InvestmentOverview = ({ user, options }: Props) => {
  console.log("u", user.approvedBorrowers)
  return (
    <Box>
      <ExplainerBox />
      <InvestmentCards borrowers={options} lender={user} />
    </Box>
  )
}

export default InvestmentOverview
