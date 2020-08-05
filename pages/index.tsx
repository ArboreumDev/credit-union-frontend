import Link from 'next/link';
import useSWR from 'swr'
import { fetcher } from '../utils/api';
import { Classes } from '@blueprintjs/core';

import { getSession, useSession } from 'next-auth/client'
import {AppBarSignedIn, AppBarSignedOut} from '../components/AppBar';
import Dashboard from '../components/dashboard/dashboard';
import dynamic from "next/dynamic";
import Video from '../components/video';
import { User, UserType, Session } from '../utils/types';
import { useRouter } from 'next/dist/client/router';
import Onboarding from './onboarding';
import { initializeGQL } from '../utils/graphql_client';
import { useEffect } from 'react';


const Page = (props: {session: Session}) => {
  const router = useRouter();
  
  useEffect(() => {
    console.log(props)
    if (!props.session.user.user_type) {
      router.push("/onboarding")
    } else {
      // if user is lender, show lender dashboard
      if (props.session.user.user_type == UserType.Lender) router.push("/lender")
      // if user is borrower, show borrower dashboard
      if (props.session.user.user_type == UserType.Borrower) router.push("/borrower")
    }
  })

  return <div><AppBarSignedOut/><Video /></div>
}

Page.getInitialProps = async (context) => ({session: await getSession(context) as Session})

export default Page
