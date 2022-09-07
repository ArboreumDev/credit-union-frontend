import {
  // Box,
  Button,
  Container,
  Stack,
} from "@chakra-ui/core"
import { fetchJSON } from "lib/api"
// import { COMPANY_NAME } from "lib/constant"
import { GetServerSideProps } from "next"
// import { GetAllUsersQuery } from "../../gql/sdk"
import { Session } from "lib/types"
import { getSession } from "next-auth/client"

export default function Admin(props: {
  // allUsers: GetAllUsersQuery["user"]
  authorized: boolean
}) {
  if (!props.authorized) return <div>Not authorized</div>

  return (
    <Container>
      <Stack>
        <Button
          onClick={() =>
            fetchJSON({ url: "/api/admin/reconcile_all", payload: {} })
          }
        >
          Reconcile
        </Button>
        {/* this helps when debugging */}
        {/* <a href="/admin/reset_db">Reset DB</a> */}
        {/* <Box>
          <Heading>Users</Heading>
          {users.map((user) => (
            <p key={user.id}>
              {user.first_name} | KYC={"" + user.kyc_approved} |{" "}
              <a href={"/admin/toggle_kyc/" + user.email}>toggle kyc </a>
            </p>
          ))}
        </Box>
        <hr /> */}
        {/* // this helps when doing a demo */}
        {/* <Box>
          Set company name:{" "}
          <Input
            onChange={(ev) =>
              localStorage.setItem(COMPANY_NAME, ev.target.value)
            }
          ></Input>
        </Box>*/}
      </Stack>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users
  const session = (await getSession(context)) as Session

  // TODO: Add admin authorization check
  if (session.user.email !== process.env.ADMIN_EMAIL) {
    return { props: { authorized: false } }
  }

  // const dbClient = new DbClient()
  // const allUsers = await dbClient.allUsers
  // const scenario = await scenarioToYAML(dbClient)
  // const scenario = {}
  // return { props: { authorized: true, allUsers, scenario } }
  return { props: { authorized: true, scenario: {} } }
}
