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

export default function Hello(props: {users}) {
  const initialData = props.users;
  const { data, error } = useSWR(GET_USERS, fetcher, { initialData });
  
  const users = data

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  return <div>
    {users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
}

export async function getServerSideProps() {
  const data = await fetcher(GET_USERS);
  return { props: {users: data.users} };
}