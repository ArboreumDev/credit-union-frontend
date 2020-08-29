import { Session, LoanRequestStatus, UserType, User } from "../utils/types"
import { useRouter } from "next/dist/client/router"
import Onboarding from "./onboarding"
import FrontPage from "./frontpage"
import ApplicationSubmitted from "../components/borrower/Notifications/ApplicationSubmitted"
import BReadyToMakeNewLoan from "../components/borrower/BReadyToMakeNewLoan"
import {
  BLoanRequestInitiated,
  BLoanRequestAwaitsConfirmation,
} from "../components/borrower/BLoanRequests"
import BLoanDashboard from "../components/borrower/BLoanDashboard"
import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/core"
import { getUIStateComponentMap } from "."

const FIXTURES = {
  USER: {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    name: "arbo",
    email: "dev-admin@arboreum.dev",
    phone: "+91 123-232-1231",
    user_type: "borrower",
    balance: 0,
    corpus_share: 0,
    created_at: "2020-08-29T04:12:17.878911+00:00",
    kyc_approved: true,
    loan_requests: [
      {
        confirmation_date: null,
        payback_status: null,
        purpose: "Home loan",
        risk_calc_result: {
          interestRate: 5.5,
          totalDue: 1200,
          monthlyDues: 1200 / 6,
        },
        status: "initiated",
        created_at: "2020-08-29T04:12:41.393094+00:00",
        amount: 1000,
      },
    ],
  },
}
console.log(FIXTURES.USER.loan_requests[0])

const Page = () => {
  const componentMap = getUIStateComponentMap(FIXTURES.USER)

  return (
    <Tabs>
      <TabList>
        {Object.keys(componentMap).map((state) => (
          <Tab key={state}>{state}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {Object.entries(componentMap).map(([state, component]) => (
          <TabPanel key={"c-" + state}>{component}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default Page
