import useSWR from 'swr';
import { fetcher } from '../utils/api';

const GET_USERS = `
  query MyQuery {
    users {
      id
      email
      name
      edges {
        toUser {
          email
        }
      }
    }
  }
`;

export default function Hello(props: {data}) {
  const initialData = props.data;
  const { data, error } = useSWR(GET_USERS, fetcher, {initialData});
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data)
  const users = data.users

  return <div>
    {users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
}

export async function getServerSideProps() {
  const data = await fetcher(GET_USERS);
  return { props: {data}};
}