import {
  Divider,
  Heading,
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
import InvestmentOption from "./InvestmentOption"

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

export const InvestmentCards = (props: {
  borrowers: InvestmentOptions
  lender: User
}) => {
  return (
    <Box>
      {props.borrowers.map((b, idx) => (
        <InvestmentOption
          key={"borrowerCard" + idx}
          data={b}
          lender={props.lender}
        />
      ))}
    </Box>
  )
}

const InvestmentOverview = ({ user, options }: Props) => {
  return (
    <Box>
      <ExplainerBox />
      <Divider />
      <Heading size="md">Your Investment Options</Heading>
      <InvestmentCards borrowers={options} lender={user} />
    </Box>
  )
}

export default InvestmentOverview
