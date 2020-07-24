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
                <NavbarHeading>Blueprint Sandbox</NavbarHeading>
                <NavbarDivider />
                <AnchorButton
                    href="http://blueprintjs.com/docs"
                    text="Docs"
                    target="_blank"
                    minimal
                    rightIcon="user"
                />
                <AnchorButton
                    href="http://github.com/palantir/blueprint"
                    text="Github"
                    target="_blank"
                    minimal
                    rightIcon="code"
                />
            </NavbarGroup>
        </Navbar>
    );
}
)