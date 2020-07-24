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
import { useSession } from 'next-auth/client'
import { useStore } from '../stores/root';
import { observer } from 'mobx-react-lite';

export interface NavigationProps { }


export default observer (()=>{
    const [session, loading] = useSession()
    const store = useStore()

    if (session){
        store.setSession(session)
    }

    return (
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
        </Navbar>
    );
}
)