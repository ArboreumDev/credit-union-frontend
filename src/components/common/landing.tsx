import { Center, Stack } from "@chakra-ui/core"
import InvestBorrowButtons from "./onboarding/investBorrowButtons"

const LandingPage = () => {
  return (
    <div className="Container">
      <Stack spacing={4} align="stretch">
        <Center margin="40px" h="40px">
          <img width="150px" src="/images/logo.svg" alt="logo" />
        </Center>
        <Center h="40px">
          <InvestBorrowButtons needSignin />
        </Center>
      </Stack>
    </div>
  )
}

export default LandingPage
