import { ChakraProvider } from "@chakra-ui/core"
// import { getDashboardComponent } from "pages/dashboard/[[...route]]"
import LenderHome from "components/lender/LenderHome"
import { Fixtures } from "lib/demo/fixtures"
import React from "react"

export default {
  "With Investment": <LenderHome user={Fixtures.LenderWithInvestments} />,
  "With No Investment": <LenderHome user={Fixtures.Lender} />,
}
