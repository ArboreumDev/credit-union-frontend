import React, { useState } from 'react';
import {
    Alignment,
    AnchorButton,
    Classes,
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Button
} from "@blueprintjs/core";

import Link from 'next/link';
import { getSession } from 'next-auth/client'

export interface NavigationProps { }

const AppBar = ({ session }) => (
<Navbar className={Classes.DARK}>

    <NavbarGroup align={Alignment.LEFT}>
            <Link href='/'><NavbarHeading>Arboreum</NavbarHeading></Link>
        <NavbarDivider />
        {!session && <>
            {/* <a href="/api/auth/signin">Sign in</a> */}
            <AnchorButton
                href='/api/auth/signin'
                text="Login"
                minimal
            />
        </>}
        {session && <>
            <Link href="/" >
                <AnchorButton
                    text="Dashboard"
                    minimal
                    rightIcon="home"
                />
            </Link>
            <Link href="/lender" >
                <AnchorButton
                    text="Lend"
                    minimal
                />
            </Link>
                <Link href="/borrower" >
                    <AnchorButton
                        text="New Loan"
                        minimal
                    />
                </Link>
            <AnchorButton
                href='/api/auth/signout'
                text="Logout"
                minimal
            />
        </>}

    </NavbarGroup>
</Navbar>)

export default AppBar
