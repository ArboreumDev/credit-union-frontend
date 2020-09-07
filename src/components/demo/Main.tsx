import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core"
import { DemoView } from "../../components/demo/DemoView"
import { DemoTabView } from "../../components/demo/DemoViewTabs"
import { Fixtures } from "../../utils/demo/fixtures"
import { UIState } from "../../utils/UIStateHelpers"
import { getUIStateComponentMap } from "../../pages/index"
import LenderDashboard from "../../components/lender/LenderDashboard"

const bJourneySequence = {
  [UIState.Landing]: "Landing",
  [UIState.Login]: "SignIn",
  [UIState.Onboarding]: "Onboarding",
  [UIState.KYCNotApprovedYet]: "Await KYC approval",
  [UIState.BReadyToMakeNewLoan]: "Make new loan",
  [UIState.BLoanRequestInitiated]: "Loan Initiated",
  [UIState.BLoanRequestAwaitsConfirmation]: "Loan needs borrower confirmation",
  [UIState.BOngoingLoan]: "Ongoing Loan",
  [UIState.Profile]: "Profile",
}

const lJourneySequence = {
  [UIState.Landing]: "Landing",
  [UIState.Login]: "SignIn",
  [UIState.Onboarding]: "Onboarding",
  [UIState.KYCNotApprovedYet]: "Await KYC approval",
  [UIState.LDashboard]: "Lender Dashboard",
  LDashboardWithNotification: "Lender Dashboard With Notification",
  [UIState.Profile]: "Profile",
}
const lComponentMap = {
  ...getUIStateComponentMap(Fixtures.Lender),
  LDashboardWithNotification: (
    <LenderDashboard user={Fixtures.UserWithLenderLoanRequest} />
  ),
}
const MainDemo = ({ tabView = false }: { tabView: boolean }) => {
  const dview = tabView ? DemoTabView : DemoView
  return (
    <Tabs>
      <TabList>
        <Tab>Borrower</Tab>
        <Tab>Lender</Tab>
      </TabList>

      <TabPanels>
        <TabPanel padding="0">
          {dview({
            demoTitle: "Borrower Journey",
            user: Fixtures.Borrower,
            journeySequence: bJourneySequence,
          })}
        </TabPanel>
        <TabPanel padding="0">
          {dview({
            demoTitle: "Lender Journey",
            user: Fixtures.Lender,
            journeySequence: lJourneySequence,
            componentMap: lComponentMap,
          })}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
export default MainDemo
