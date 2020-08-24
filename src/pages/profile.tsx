import { Session } from "../utils/types"
import { getSessionAsProps } from "../utils/ssr"
import AppBar from "../components/AppBar"

const Page = (props: { session: Session }) => {
  return (
    <div>
      <AppBar {...props} />
    </div>
  )
}
Page.getInitialProps = (context) => getSessionAsProps(context)

export default Page
