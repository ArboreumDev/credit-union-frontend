import Link from 'next/link';
import useSWR from 'swr'
import { fetcher } from '../utils/api';
import { Classes } from '@blueprintjs/core';

import { getSession } from 'next-auth/client'
import AppBar from '../components/AppBar';
import Dashboard from '../components/dashboard/dashboard';
import dynamic from "next/dynamic";
import Video from '../components/video';


const Page = ({ session }) => (
<div className='container'>
  <AppBar session={session}/>
  <div className='container'>
    {!session && <>
      <Video />
    </>}
    {session && <>
      <Dashboard />
    </>
    }
  </div>
  
</div>)

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context)
  }
}

export default Page

// export default function Home() {
//   const [session, loading] = useSession()


//   // const { data, error } = useSWR('{ users { name } }', fetcher)

//   // if (error) return <div>Failed to load</div>
//   // if (!data) return <div>Loading...</div>

//   // const { users } = data
  
//   return (
    // <div>
    //   {!session && <>
    //     <Video/>
    //   </>}
    //   {session && <>
    //     <Dashboard />
    //   </>
    //   }
    // </div>
    
// )
// }
