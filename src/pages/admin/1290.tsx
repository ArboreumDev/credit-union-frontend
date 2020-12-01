import { initializeGQL } from "../../gql/graphql_client"
import { getSdk, User, GetAllUsersQuery } from "../../gql/sdk"
import { GetServerSideProps } from "next"
import {
  Box,
  Button,
  Code,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/core"
import { COMPANY_NAME } from "lib/constant"
import DbClient from "gql/db_client"
import { useState } from "react"
import JSONInput from "react-json-ide"
import locale from "react-json-ide/locale/en"
import { fetchJSON } from "lib/api"

export function TEdit(props: { code: any; onSubmit: any }) {
  const [code, setState] = useState(JSON.stringify(props.code))

  return (
    <div>
      <Textarea
        height={70}
        value={code}
        onChange={(v) => setState(v.target.value)}
      />
      <Button onClick={() => props.onSubmit(code)}>Save</Button>
    </div>
  )
}

export default function Hello(props: {
  allUsers: GetAllUsersQuery["user"]
  scenario: any
}) {
  // Only use code like this when UI needs to refresh
  // const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  const users = props.allUsers

  return (
    <Box>
      <Stack>
        <a href="/admin/reset_db">Reset DB</a>
        <Box>
          <Heading>Users</Heading>
          {users.map((user) => (
            <p key={user.id}>
              {user.name} | KYC={"" + user.kyc_approved} |{" "}
              <a href={"/admin/toggle_kyc/" + user.email}>toggle kyc </a>
            </p>
          ))}
        </Box>
        <hr />
        <Box>
          Set company name:{" "}
          <Input
            onChange={(ev) =>
              localStorage.setItem(COMPANY_NAME, ev.target.value)
            }
          ></Input>
        </Box>
      </Stack>
      <Box>
        Scenario:
        <TEdit
          code={props.scenario}
          onSubmit={(json: string) =>
            fetchJSON({ url: "/api/admin/set_scenario", payload: { json } })
          }
        />
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users

  const dbClient = new DbClient()
  const allUsers = await dbClient.allUsers
  const scenario = await dbClient.generateScenarioObject()
  return { props: { allUsers, scenario } }
}
