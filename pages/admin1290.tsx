import useSWR from 'swr';
import { getGQLDataSS } from '../utils/ssr';

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

// TODO: Make the fetcher call /api/
// so frontend can also receive

const fetcher = getGQLDataSS 

export default function Hello(data) {
  console.log(data)

  return <div>
    {data.users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
}

export async function getServerSideProps() {
  const data = await fetcher(GET_USERS);
  return { props: data };
}