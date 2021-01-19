import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { useEffect, useState } from "react"
import { Currency } from "../../common/Currency"
import { Row, Table, TextColumn } from "../../common/Table"
import ModifyPledgeAmount from "./ModifyPledgeAmount"

interface Params {
  pledgeRequest: PledgeRequest
  availableFunds: number
}

export const NewPledgeRequest = ({ pledgeRequest, availableFunds }: Params) => {
  const router = useRouter()

  const [showDetails, setShowDetails] = useState(false)
  const [pledgeAmount, setPledgeAmount] = useState(pledgeRequest.pledge_amount)
  const [pledgeDisabled, setPledgeDisabled] = useState(
    availableFunds < pledgeAmount
  )

  useEffect(() => {
    console.log("here", availableFunds, pledgeAmount)
    setPledgeDisabled(availableFunds < pledgeAmount)
  }, [pledgeAmount])

  const loanRequest = pledgeRequest.loan_request
  const submitPledge = (status: SupporterStatus) => {
    AcceptRejectPledge.fetch({
      request_id: pledgeRequest.request_id,
      supporter_id: pledgeRequest.loan_request.user.email,
      status: status,
      pledge_amount: pledgeAmount,
    })
      .then(async (res) => {
        router.push("/")
      })
      .catch((err) => {
        console.error(err)
        router.push("/")
      })
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
      <AlertDescription>
        Your support will be <Currency amount={pledgeAmount} />
      </AlertDescription>
      <Button
        mt={4}
        variant="link"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide" : "Show"} Details
      </Button>
      <Collapse mt={4} isOpen={showDetails}>
        <Stack>
          <AlertDescription>
            <Table>
              <Row>
                <TextColumn>Your support</TextColumn>
                <TextColumn>
                  <Currency amount={pledgeAmount} />
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
                  {loanRequest.risk_calc_result
                    ? loanRequest.risk_calc_result.latestOffer.terms.tenor
                    : "6"}{" "}
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
          <ModifyPledgeAmount
            onChangePledgeAmount={setPledgeAmount}
            pledgeRequest={pledgeRequest}
          />
          <Button
            onClick={() => submitPledge(SupporterStatus.rejected)}
            colorScheme="red"
            w="280px"
          >
            I cannot pledge for this person
          </Button>
        </Wrap>

        {pledgeDisabled && (
          <Alert mt={4} status="info">
            <AlertIcon />
            <AlertTitle mr={2}>
              {" "}
              Please&nbsp;
              <Link href="/dashboard/invest">
                <a className="link">add more</a>
              </Link>
              &nbsp;funds to make this pledge.
            </AlertTitle>
          </Alert>
        )}
      </AlertDescription>
      <style jsx>
        {`
          .link {
            text-decoration: underline;
          }
        `}
      </style>
    </Alert>
  )
}
