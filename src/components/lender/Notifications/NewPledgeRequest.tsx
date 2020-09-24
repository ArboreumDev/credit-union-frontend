import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Collapse,
  Divider,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/core"
import { CalculatedRisk, PledgeRequest } from "lib/types"
import { useState } from "react"
import { Currency } from "../../common/Currency"
import { Row, Table, TextColumn } from "../../common/Table"

interface Params {
  pledgeRequest: PledgeRequest
}

export const NewPledgeRequest = ({ pledgeRequest }: Params) => {
  const [show, setShow] = useState(false)
  const loanRequest = pledgeRequest.loan_request
  const riskCalcResult = loanRequest.risk_calc_result as CalculatedRisk

  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      marginBottom="20px"
    >
      {/* <AlertIcon boxSize="40px" mr={0} /> */}
      <AlertTitle mt={4} mb={1} fontSize="lg">
        New Pledge Request
      </AlertTitle>
      <AlertDescription>
        {loanRequest.user.name} ({loanRequest.user.email}) has requested you to
        pledge <Currency amount={pledgeRequest.pledge_amount} /> for their loan
        request of amount <Currency amount={loanRequest.amount} />
        <Divider margin="10px" />
      </AlertDescription>
      <Button variant="link" onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Details
      </Button>
      <Collapse mt={4} isOpen={show}>
        <Stack>
          <AlertDescription>
            <Table>
              <Row>
                <TextColumn>Your support</TextColumn>
                <TextColumn>
                  <Currency amount={pledgeRequest.pledge_amount} />
                </TextColumn>
              </Row>
              <Row>
                <TextColumn>Total Loan Amount</TextColumn>
                <TextColumn>
                  <Currency amount={loanRequest.amount} />
                </TextColumn>
              </Row>
              <Row>
                <TextColumn>Loan Purpose</TextColumn>
                <TextColumn>{loanRequest.purpose}</TextColumn>
              </Row>
              <Row>
                <TextColumn>Loan Term</TextColumn>
                <TextColumn>{riskCalcResult.loanTerm} months</TextColumn>
              </Row>
            </Table>
          </AlertDescription>
          <AlertDescription>
            <Text>
              Repayments are expected to be made at the end of every month
            </Text>
          </AlertDescription>
        </Stack>
      </Collapse>

      <AlertDescription marginTop="20px">
        <Wrap justify="center">
          <Button colorScheme="blue" w="280px">
            I approve of the pledge amount
          </Button>
          <Button colorScheme="blue" w="280px">
            I wish to change pledge amount
          </Button>
          <Button colorScheme="red" w="280px">
            I cannot pledge for this person
          </Button>
        </Wrap>
      </AlertDescription>
    </Alert>
  )
}
