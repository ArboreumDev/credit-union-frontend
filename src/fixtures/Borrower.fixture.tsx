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
  Onboarding: (
    <Onboarding user={Fixtures.Borrower} userType={UserType.Borrower} />
  ),
  "KYC needs approval": <BorrowerHome user={Fixtures.Borrower} />,
  "Loan request initiated": (
    <BorrowerHome user={Fixtures.BorrowerLoanInitiated} />
  ),
  "Loan request needs approval": (
    <BorrowerHome user={Fixtures.BorrowerLoanNeedsConfirmation} />
  ),
  "Loan is live": <BorrowerHome user={Fixtures.BorrowerLoanLive} />,
  Profile: <BorrowerHome user={Fixtures.BorrowerLoanLive} initPanelIdx={1} />,
  Repayments: (
    <BorrowerHome user={Fixtures.BorrowerLoanLive} initPanelIdx={2} />
  ),
}
