import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Box,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
} from "@chakra-ui/core"
import { getUIStateComponentMap } from "../../index"
import { UIState } from "../../../utils/UIStateHelpers"
import { useState } from "react"

const FIXTURES = {
  USER: {
    id: "3576df66-ef1c-4e82-ad21-70943dcecaf6",
    name: "Deepika Padukone",
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
          loanTerm: 6,
          interestRate: 5.5,
          totalDue: 1200,
        },
        status: "initiated",
        created_at: "2020-08-29T04:12:41.393094+00:00",
        amount: 1000,
      },
    ],
  },
}

const Page = () => {
  const componentMap = getUIStateComponentMap(FIXTURES.USER)
  const journeySequence = {
    [UIState.Landing]: "Landing",
    [UIState.Onboarding]: "Onboarding",
    [UIState.KYCNotApprovedYet]: "Await KYC approval",
    [UIState.BReadyToMakeNewLoan]: "Make new loan",
    [UIState.BLoanRequestInitiated]: "Loan Initiated",
    [UIState.BLoanRequestAwaitsConfirmation]:
      "Loan needs borrower confirmation",
    [UIState.BOngoingLoan]: "Ongoing Loan",
    [UIState.Profile]: "Profile",
  }

  const [stateIdx, setStateIdx] = useState(0)
  const [state, title] = Object.entries(journeySequence)[stateIdx]
  const component = componentMap[state]

  return (
    <Box>
      <Center>
        {stateIdx > 0 && (
          <Button onClick={() => setStateIdx(stateIdx - 1)}>&lt; </Button>
        )}
        <Box w="200px" marginBottom="20px">
          <Slider
            onChange={(v) => setStateIdx(v)}
            max={Object.keys(journeySequence).length - 1}
            step={1}
            value={stateIdx}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        {stateIdx < Object.keys(journeySequence).length - 1 && (
          <Button onClick={() => setStateIdx(stateIdx + 1)}>&gt; </Button>
        )}
      </Center>
      <Center>
        <Heading as="h1" size="md">
          Borrower Journey | {stateIdx + 1}
        </Heading>
      </Center>
      <Center marginBottom="20px">{title}</Center>
      <Divider marginBottom="20px"></Divider>
      {component}
    </Box>
  )
}

export default Page
