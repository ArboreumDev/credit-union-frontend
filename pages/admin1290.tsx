import useSWR from 'swr';
import { fetcher } from '../utils/api';
import { initializeGQL } from '../utils/db/graphql_client';

const GET_USERS = `
  query MyQuery {
    user {
      id
      email
      name
     
    }
  }
`;

export default function Hello(props: {data}) {
  const data = props.data;
  // Only use code like this when UI needs to refresh
  // const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  console.log(data)
  const users = data.user

  return <div>
    {users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
}

export async function getServerSideProps() {
  // TODO after JWT is implemented
  // check for session and if the user is one of the admin users
  
  const gqlClient = initializeGQL()
  const data = await gqlClient.request(GET_USERS)
  return { props: {data}};
}