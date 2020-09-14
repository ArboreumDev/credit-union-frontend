import getSSRProps from "utils/ssr"
import LandingPage from "../components/common/landing"

const Page = () => {
  return <LandingPage />
}

Page.getInitialProps = getSSRProps

export default Page
