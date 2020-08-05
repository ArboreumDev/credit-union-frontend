import React, { useState } from 'react';
import {
    Alignment,
    AnchorButton,
    Classes,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider
} from "@blueprintjs/core";

import Link from 'next/link';
import {User, UserType} from '../utils/types'

export interface NavigationProps { }

export const AppBarSignedOut = () => (
    <Navbar className={Classes.DARK}>

    <NavbarGroup align={Alignment.LEFT}>
            <Link href='/'><NavbarHeading>Arboreum</NavbarHeading></Link>
            <NavbarDivider />
            <AnchorButton
                href='/api/auth/signin'
                text="Login"
                minimal
            />
            </NavbarGroup>
</Navbar>
)

export const AppBarSignedIn = (props: { user: User }) => (
         <Navbar className={Classes.DARK}>
           <NavbarGroup align={Alignment.LEFT}>
             <Link href="/">
               <NavbarHeading>Arboreum</NavbarHeading>
             </Link>
             <NavbarDivider />
             <Link href="/">
               <AnchorButton text="Dashboard" minimal rightIcon="home" />
             </Link>

             {props.user.type == UserType.Lender && (
               <>
                 <AnchorButton href="/lender" text="Profile" minimal />
               </>
             )}
             {props.user.type == UserType.Borrower && (
               <>
                 <AnchorButton href="/borrower" text="Borrow" minimal />
               </>
             )}
             <AnchorButton href="/api/auth/signout" text="Logout" minimal />
           </NavbarGroup>
         </Navbar>
       );
