import getSSRProps from "lib/ssr"
import LandingPage from "../components/common/landing"

const Page = () => {
  return <LandingPage />
}

Page.getInitialProps = getSSRProps

export default Page
