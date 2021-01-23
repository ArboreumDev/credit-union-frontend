import LandingPage from "components/common/landing"
import Onboarding from "components/common/onboarding/onboarding"
// import { getDashboardComponent } from "pages/dashboard/[[...route]]"
import LenderHome from "components/lender/LenderHome"
import { Fixtures } from "lib/demo/fixtures"
import { UserType } from "lib/types"
import LoginPage from "pages/login"
import React from "react"

export default {
  Landing: <LandingPage />,
  SignIn: <LoginPage />,
  Onboarding: <Onboarding user={Fixtures.Lender} userType={UserType.Lender} />,
  "Add funds": <LenderHome user={Fixtures.Lender} initPanelIdx={1} />,
  "With Investment": <LenderHome user={Fixtures.SupporterWithPledge} />,
  "With No Investment": <LenderHome user={Fixtures.Lender} />,
  "Supporter with notification": (
    <LenderHome user={Fixtures.SupporterWithPledgeRequest} />
  ),
  Profile: <LenderHome user={Fixtures.Lender} initPanelIdx={2} />,
}
