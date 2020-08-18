import useSWR from 'swr';
import { initializeGQL } from '../gql/graphql_client';
import { getSdk } from '../gql/sdk';

export default function Hello(props: {data}) {
  const data = props.data;
  // Only use code like this when UI needs to refresh
  // const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  const users = data.user

  return <div>
    {users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
}

export async function getServerSideProps() {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users
  
  const sdk = getSdk(initializeGQL())
  const data = await sdk.AllUsers()

  return { props: {data}};
}