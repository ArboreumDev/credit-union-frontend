import { ChakraProvider } from "@chakra-ui/core"
// import { getDashboardComponent } from "pages/dashboard/[[...route]]"
import LenderHome from "components/lender/LenderHome"
import { Fixtures } from "lib/demo/fixtures"
import React from "react"

export default {
  LenderWithInvestment: <LenderHome user={Fixtures.LenderWithInvestments} />,
  LenderWithNoInvestment: <LenderHome user={Fixtures.Lender} />,
}
