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
        <NavbarHeading>Arboreum</NavbarHeading>
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
                    text=""
                    minimal
                    rightIcon="home"
                />
            </Link>
            <Link href="/lender" >
                <AnchorButton
                    text=""
                    minimal
                    rightIcon="user"
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
