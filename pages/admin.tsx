import { gql, useQuery } from '@apollo/client';

const GET_GREETING = gql`
      query MyQuery {
      users {
        name
        email
        edges {
          user {
            name
          }
        }
      }
    }

    `;

export default function Hello() {
  // const { loading, error, data } = useQuery(GET_GREETING);
  // console.log(data.users)
  // if (loading) return <p>Loading ...</p>;
  // if (error) {
  //   console.log(error)
  //   return <p> Error :(</p>;}
  // return <div>
  //   {data.users.map((user)=>(<p>{user.name}</p>))}
  // </div>
  return <div></div>
}