import Link from 'next/link';
import useSWR from 'swr'
import { fetcher } from '../utils/api';
import { Classes } from '@blueprintjs/core';

import { getSession } from 'next-auth/client'
import {AppBarSignedIn, AppBarSignedOut} from '../components/AppBar';
import Dashboard from '../components/dashboard/dashboard';
import dynamic from "next/dynamic";
import Video from '../components/video';
import { User, UserType } from '../utils/interfaces';
import { useRouter } from 'next/dist/client/router';
import { Onboarding } from './onboarding';

const Page = (props: {session, user?: User}) => {
  const router = useRouter();
  if (!props.session) return <div><AppBarSignedOut/><Video /></div>
  else {
    
      if (!props.user) {
        // if Onboarding
        return <Onboarding/>
      } else {
        // if user is lender, show lender dashboard
        if (props.user.type == UserType.Lender) router.push("/lender");
        // if user is borrower, show borrower dashboard
        if (props.user.type == UserType.Borrower) router.push("/borrower");
        
      }
      return <div></div>
    }
}

Page.getInitialProps = async (context) => {
  return {
    session: await getSession(context),

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
