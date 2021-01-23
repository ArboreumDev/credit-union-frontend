import { ChakraProvider } from "@chakra-ui/core"
// import { getDashboardComponent } from "pages/dashboard/[[...route]]"
import LenderHome from "components/lender/LenderHome"
import { Fixtures } from "lib/demo/fixtures"
import React from "react"
import { useEventListener } from "@chakra-ui/core"
import LandingPage from "components/common/landing"
import Onboarding from "components/common/onboarding/onboarding"
import { UserType } from "lib/types"
import { useRouter } from "next/router"
import { getDashboardComponent } from "pages/dashboard/[[...route]]"
import LoginPage from "pages/login"
import BorrowerHome from "components/borrower/BorrowerHome"

export default {
  Landing: <LandingPage />,
  SignIn: <LoginPage />,
  Onboarding: <Onboarding user={Fixtures.Lender} userType={UserType.Lender} />,
  "Add funds": <LenderHome user={Fixtures.Lender} initPanelIdx={1} />,
  "With Investment": <LenderHome user={Fixtures.LenderWithInvestments} />,
  "With No Investment": <LenderHome user={Fixtures.Lender} />,
  "Supporter with notification": (
    <LenderHome user={Fixtures.LenderWithPledgeRequest} />
  ),
  Profile: <LenderHome user={Fixtures.Lender} initPanelIdx={2} />,
}
