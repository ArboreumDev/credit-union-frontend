import { getSession } from 'next-auth/client'
import AppBar from '../components/AppBar';
import Video from '../components/video';
import {UserType, Session } from '../utils/types';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { getSessionAsProps } from '../utils/ssr';
import Onboarding from './onboarding';
import LenderDashboard from '../components/dashboard/lender'
import BorrowerDashboard from "../components/dashboard/borrower"


const Page = (props: { session: Session }) => {
  const router = useRouter()
  if (!props.session)
    return (
      <div>
        <AppBar />
        <Video />
      </div>
    )
  else {
    if (!props.session.user.user_type) {
      // if Onboarding
      return <Onboarding />
    } else {
      return (
        <div>
          <AppBar {...props} />
          {(props.session.user.user_type == UserType.Lender) && <LenderDashboard/>}
          {(props.session.user.user_type == UserType.Borrower) && <BorrowerDashboard/>}
        </div>
      )
  }
}
}

Page.getInitialProps = (context) => getSessionAsProps(context)

export default Page
