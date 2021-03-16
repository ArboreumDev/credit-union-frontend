import { Center, Stack, Box, Heading, Text, Link } from "@chakra-ui/core"
import { Logo } from "components/common/landing"
import InvestBorrowButtons from "components/common/onboarding/investBorrowButtons"
import { USER_TYPE_KEY } from "lib/constant"
import useUser from "lib/useUser"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Onboarding from "../components/common/onboarding/onboarding"

const PendingReview = () => {
  const { user } = useUser()
  const router = useRouter()

  if (!user) return <Logo />

  return (
    <Stack spacing={4} align="stretch">
      <Logo />
      <Center h="40px">
        <Box>
          <Center>
            <Heading>Your application is under review.</Heading>
          </Center>
          <Text>
            You can expect to hear from us shortly. If you have not head from us
            within 4 days, feel free to reach out to our{" "}
            <Link color="teal.500" href="href=mailto:julius@arboreum.dev">
              support team.
            </Link>
          </Text>
        </Box>
      </Center>
    </Stack>
  )
}

export default PendingReview
