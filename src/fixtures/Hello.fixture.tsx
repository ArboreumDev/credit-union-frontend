import { ChakraProvider } from "@chakra-ui/core"
// import { getDashboardComponent } from "pages/dashboard/[[...route]]"
import LenderHome from "components/lender/LenderHome"
import { Fixtures } from "lib/demo/fixtures"
import React from "react"

const Component = (
  <ChakraProvider resetCSS>
    <LenderHome user={Fixtures.Lender} />
  </ChakraProvider>
)
export default Component
