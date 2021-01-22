// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { ChakraProvider, Button } from "@chakra-ui/core"
import { Meta, Story } from "@storybook/react/types-6-0"
import BorrowerHome from "components/borrower/BorrowerHome"
import { AmountInputWithHelper } from "components/common/AmountInputWithHelper"
import { Currency } from "components/common/Currency"
import LenderHome from "components/lender/LenderHome"
import { NewPledgeRequest } from "components/lender/Notifications/NewPledgeRequest"
import { Fixtures } from "lib/demo/fixtures"
import React from "react"

export default {
  title: "LandingPageStory",
  component: LenderHome,
} as Meta

export const LandingPageStory = () => (
  <ChakraProvider resetCSS>
    <div>
      <Currency amount={20000} />
      {/* <BorrowerHome user={Fixtures.BorrowerLoanLive} /> */}
      <LenderHome user={Fixtures.LenderWithInvestments} />
    </div>
  </ChakraProvider>
)
