import { Session } from "../utils/types"
import { getSessionAsProps } from "../utils/ssr"
import AppBar from "../components/AppBar"
import { CgLogOut } from "react-icons/cg"
import { Button } from "@chakra-ui/core"

const Page = (props: { session: Session }) => {
  return (
    <div>
      <AppBar />
      <Button rightIcon={<CgLogOut />} colorScheme="blue" variant="outline">
        Logout
      </Button>
    </div>
  )
}
Page.getInitialProps = (context) => getSessionAsProps(context)

export default Page
