// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { ChakraProvider } from "@chakra-ui/core"
import { Meta, Story } from "@storybook/react/types-6-0"
import { AmountInputWithHelper } from "components/common/AmountInputWithHelper"
import { Currency } from "components/common/Currency"
import LenderHome from "components/lender/LenderHome"
import { NewPledgeRequest } from "components/lender/Notifications/NewPledgeRequest"
import { Fixtures } from "lib/demo/fixtures"
import React from "react"

export default {
  title: "LandingPageStory",
  argTypes: { onClick: { action: "clicked" } },
}

const TemplateWithText = (args) => (
  <ChakraProvider resetCSS>
    <LenderHome user={Fixtures.LenderWithInvestments} />
  </ChakraProvider>
)

export const LandingPageStory = () => TemplateWithText.bind({})
