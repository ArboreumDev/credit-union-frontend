import { Session } from "../utils/types"
import { getSessionAsProps } from "../utils/ssr"
import AppBar from "../components/AppBar"
import { CgLogOut } from "react-icons/cg"
import { Button } from "@chakra-ui/core"
import Router from "next/router"
import { getSession } from "next-auth/client"

const Page = (props: { session: Session }) => {
  return (
    <div>
      <AppBar />
      <Button
        onClick={() => Router.push("/api/auth/signout")}
        rightIcon={<CgLogOut />}
        colorScheme="blue"
        variant="outline"
      >
        Logout
      </Button>
    </div>
  )
}
Page.getInitialProps = async (context) => {
  const session = (await getSession(context)) as Session
  return { session: session }
}

export default Page
