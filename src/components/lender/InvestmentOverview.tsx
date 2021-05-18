import {
  Divider,
  Box,
  Button,
  Center,
  Stack,
  Text,
  Link,
} from "@chakra-ui/core"
import { User, Investor, InvestmentOptions } from "lib/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

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

export const InvestmentCards = (props: { borrowers: InvestmentOptions }) => {
  console.log(props.borrowers)
  return (
    <Box>
      {/* {props.borrowers.map((b) => (
            <Box>
                {b.name}
            </Box>
        ))} */}
      someName
    </Box>
  )
}

const InvestmentOverview = ({ user, options }: Props) => {
  return (
    <Box>
      <ExplainerBox />
      <InvestmentCards borrowers={options} />
    </Box>
  )
}

export default InvestmentOverview
