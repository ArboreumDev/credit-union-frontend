import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Stack,
  Textarea,
} from "@chakra-ui/core"
import DbClient from "gql/db_client"
import { fetchJSON } from "lib/api"
import { COMPANY_NAME } from "lib/constant"
// import { scenarioToYAML } from "lib/scenario"
import { GetServerSideProps } from "next"
import { useState } from "react"
import { GetAllUsersQuery } from "../../gql/sdk"
import { Session } from "lib/types"
import { getSession } from "next-auth/client"

export function TEdit(props: { code: any; onSubmit: any }) {
  const [code, setState] = useState(props.code)
  const count = (code.match(/\n/g) || []).length
  if (typeof window === "undefined") return <></>
  return (
    <div>
      <Textarea
        height="auto"
        rows={count}
        value={code}
        onChange={(v) => setState(v.target.value)}
      />
      <Button onClick={() => props.onSubmit(code)}>Save</Button>
    </div>
  )
}

export default function Hello(props: {
  // allUsers: GetAllUsersQuery["user"]
  scenario: any
  authorized: boolean
}) {
  // Only use code like this when UI needs to refresh
  // const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // const users = props.allUsers
  // if (!props.authorized) return <div>Not authorized</div>

  return (
    <Container>
      <Stack>
        <Text> TODO: rebuild this</Text>
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
        {/* <Box>
        Scenario:
        <TEdit
        code={props.scenario}
        onSubmit={(yaml: string) =>
          fetchJSON({ url: "/api/admin/set_scenario", payload: { yaml } })
        }
        />
      </Box> */}
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
