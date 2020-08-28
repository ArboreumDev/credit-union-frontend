import * as React from "react"
import { initializeGQL } from "../../gql/graphql_client"
import { getSdk, User, GetAllUsersQuery } from "../../gql/sdk"

export default function Hello(props: { user: GetAllUsersQuery["user"] }) {
  // Only use code like this when UI needs to refresh
  // const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  const users = props.user
  return (
    <div>
      {users.map((user: User) => (
        <p key={user.id}>
          {user.name} | KYC={user.kyc_approved} |{" "}
          <a href={"/admin/approve/" + user.email}>toggle kyc </a>
        </p>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users

  const sdk = getSdk(initializeGQL())
  const { user } = await sdk.GetAllUsers()

  return { props: { user } }
}
