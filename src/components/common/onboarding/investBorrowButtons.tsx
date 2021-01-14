import { Button, HStack } from "@chakra-ui/core"
import Link from "next/link"
import { useRouter } from "next/router"
import { USER_TYPE_KEY } from "lib/constant"
import { UserType } from "lib/types"

const InvestBorrowButtons = (props: { needSignin?: boolean }) => {
  const router = useRouter()
  const targetURL = props.needSignin ? "/api/auth/signin" : "/onboarding"
  const onclick = (userType: UserType) => {
    console.log(userType)
    sessionStorage.setItem(USER_TYPE_KEY, userType)
    location.replace(targetURL)
  }
  return (
    <HStack>
      <Button
        onClick={() => {
          onclick(UserType.Lender)
        }}
      >
        Invest
      </Button>
      <Button
        onClick={() => {
          onclick(UserType.Borrower)
        }}
      >
        Borrow
      </Button>
    </HStack>
  )
}

export default InvestBorrowButtons
