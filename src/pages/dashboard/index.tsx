import { Box, Center, Heading } from "@chakra-ui/core"
import { GetServerSideProps } from "next"
import { getSession, useSession } from "next-auth/client"
import dynamic from "next/dynamic"
import Head from "next/head"
import BOngoingLoan from "../../components/borrower/BOngoingLoan"
import CreateLoanForm from "../../components/borrower/CreateLoan/CreateLoanForm"
import BLoanNeedsConfirmation from "../../components/borrower/LoanRequests/BLoanNeedsConfirmation"
import BLoanRequestInitiated from "../../components/borrower/LoanRequests/BLoanRequestInitiated"
import ApplicationSubmitted from "../../components/borrower/Notifications/ApplicationSubmitted"
import AppBar from "../../components/common/AppBar"
import Contactus from "../../components/common/ContactUs"
import {
  LoanRequest,
  LoanRequestStatus,
  Session,
  User,
  UserType,
} from "../../utils/types"

const getRequestLoanComponent = (user: User) => {
  return (
    <Box>
      <Center>
        <Heading as="h1" size="lg">
          Request Loan
        </Heading>
      </Center>
      <Box h="30px" />
      <CreateLoanForm user={user} />
    </Box>
  )
}

const getLoanRequest = (loanRequest: LoanRequest) => {
  return {
    [LoanRequestStatus.initiated]: (
      <BLoanRequestInitiated loanRequest={loanRequest} />
    ),
    [LoanRequestStatus.awaiting_borrower_confirmation]: (
      <BLoanNeedsConfirmation loanRequest={loanRequest} />
    ),
    [LoanRequestStatus.live]: <BOngoingLoan loanRequest={loanRequest} />,
  }[loanRequest.status]
}

const getLenderDashboard = (user: User) => {
  const LenderDashboard = dynamic(() =>
    import("components/lender/LenderDashboard")
  )
  return <LenderDashboard user={user} />
}

export const getDashboardComponent = (user: User) => {
  if (user.user_type === UserType.Lender)
    return <div>{getLenderDashboard(user)}</div>
  else {
    const loanRequests = user.loan_requests
    return (
      <div>
        {!user.kyc_approved && <ApplicationSubmitted />}
        {loanRequests.length === 0 && getRequestLoanComponent(user)}
        {loanRequests.length > 0 && getLoanRequest(loanRequests[0])}
      </div>
    )
  }
}

const Dashboard = (props: { user: User }) => (
  <div>
    <Head>
      <title>Dashboard</title>
    </Head>
    <AppBar />
    {getDashboardComponent(props.user)}
    <Center margin="80px">
      <Contactus />
    </Center>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = (await getSession({ req })) as Session
  const user = session.user
  if (res) {
    if (!session) {
      res.writeHead(301, {
        Location: "/",
      })
      res.end()
    }
  }
  return { props: { user } }
}

export default Dashboard
