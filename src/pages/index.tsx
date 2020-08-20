import { getSession } from 'next-auth/client'
import {Navbar, IntroSection, MainSection, AppBar} from '../Components';
import Video from '../Components/video';
import {UserType, Session } from '../utils/types';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { getSessionAsProps } from '../utils/ssr';
import Onboarding from './onboarding';
import LenderDashboard from '../Components/dashboard/lender';
import BorrowerDashboard from "../Components/dashboard/borrower";
import * as React from "react";


const Page = (props: { session: Session }) => {
  const router = useRouter();
  if (!props.session)
    return (
        <div>
            <Navbar />
            <IntroSection/>
            <MainSection/>
        </div>
    );
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
};

Page.getInitialProps = (context) => getSessionAsProps(context);

export default Page
