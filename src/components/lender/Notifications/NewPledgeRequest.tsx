import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/core"
import { AcceptRejectPledge } from "lib/gql_api_actions"
import { PledgeRequest, SupporterStatus } from "lib/types"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Currency } from "../../common/Currency"
import { Row, Table, TextColumn } from "../../common/Table"
import ModifyPledgeAmount from "./ModifyPledgeAmount"

interface Params {
  pledgeRequest: PledgeRequest
  pledgeDisabled?: boolean
}

export const NewPledgeRequest = ({ pledgeRequest, pledgeDisabled }: Params) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const loanRequest = pledgeRequest.loan_request
  const submitPledge = (status: SupporterStatus) => {
    AcceptRejectPledge.fetch({
      request_id: pledgeRequest.request_id,
      supporter_id: pledgeRequest.loan_request.user.email,
      status: status,
      pledge_amount: pledgeRequest.pledge_amount,
    })
      .then(async (res) => {
        router.push("/")
      })
      .catch((err) => console.error(err))
  }

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
                <TextColumn>
                  {loanRequest.risk_calc_result?.latestOffer.loan_info.tenor}{" "}
                  months
                </TextColumn>
              </Row>
            </Table>
          </AlertDescription>
          <AlertDescription>
            <Text>Monthly repayments</Text>
          </AlertDescription>
        </Stack>
      </Collapse>

      <AlertDescription marginTop="20px">
        <Wrap justify="center">
          <Button
            onClick={() => submitPledge(SupporterStatus.confirmed)}
            colorScheme="blue"
            w="280px"
            disabled={pledgeDisabled}
          >
            I approve of the pledge amount
          </Button>
          <ModifyPledgeAmount pledgeRequest={pledgeRequest} />
          <Button
            onClick={() => submitPledge(SupporterStatus.rejected)}
            colorScheme="red"
            w="280px"
            disabled={pledgeDisabled}
          >
            I cannot pledge for this person
          </Button>
        </Wrap>
        {pledgeDisabled && (
          <Box>
            Please&nbsp;
            <Link href="/dashboard/invest">
              <a className="link">add more</a>
            </Link>
            &nbsp;funds to make this pledge.
          </Box>
        )}
      </AlertDescription>
      <style jsx>
        {`
          .link {
            // color: blue
            text-decoration: underline;
          }
        `}
      </style>
    </Alert>
  )
}
