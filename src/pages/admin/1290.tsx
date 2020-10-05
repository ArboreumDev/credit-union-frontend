import * as React from "react"
import { initializeGQL } from "../../gql/graphql_client"
import { getSdk, User, GetAllUsersQuery } from "../../gql/sdk"
import { GetServerSideProps } from "next"
import { Box, Heading, Input, Stack } from "@chakra-ui/core"
import { COMPANY_NAME } from "lib/constant"

export default function Hello(props: { user: GetAllUsersQuery["user"] }) {
  // Only use code like this when UI needs to refresh
  // const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  const users = props.user
  return (
    <Box>
      <Stack>
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
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users

  const sdk = getSdk(initializeGQL())
  const { user } = await sdk.GetAllUsers()

  return { props: { user } }
}
