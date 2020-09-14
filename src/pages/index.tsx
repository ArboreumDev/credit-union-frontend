import useUser from "lib/useUser"
import LandingPage from "../components/common/landing"

const Page = () => {
  // redirect if neededcd
  useUser()

  return <LandingPage />
}

export default Page
