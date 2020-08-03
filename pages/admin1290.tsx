import useSWR from 'swr';
import { getGQLDataSS } from '../utils/ssr';

const GET_USERS = `
  query MyQuery {
    users {
      email
      edges {
        toUser {
          email
        }
      }
    }
  }
`;

export default function Hello() {
  const initialData = props.data;
  const { data } = useSWR("/api/data", fetcher, { initialData });
  console.log(data)
  
  return <div>
    {data.users.map((user)=>(<p key={user.id}>{user.name}</p>))}
  </div>
  return <div></div>
}

// export async function getServerSideProps() {
//   return getGQLDataSS(GET_USERS)
// }