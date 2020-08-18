import { AnchorButton } from "@blueprintjs/core"
import { Session } from "../../../utils/types"
import { getSessionAsProps } from "../../../utils/ssr"
import AppBar  from "../../components/AppBar"

const Page = (props: { session: Session }) => {
  return (
    <div>
      <AppBar {...props} />
      <AnchorButton href="/api/auth/signout" text="Logout" minimal />
    </div>
  )
}
Page.getInitialProps = (context) => getSessionAsProps(context)

export default Page
