import React, { useState } from "react"
import { useSession } from "next-auth/client"
import {
  Alignment,
  AnchorButton,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from "@blueprintjs/core"

import Link from "next/link"
import { User, UserType, Session } from "../utils/types"

export interface NavigationProps {}

export default (props: { session?: Session }) => (
  <Navbar className={Classes.DARK}>
    <NavbarGroup align={Alignment.LEFT}>
      <Link href="/">
        <NavbarHeading>Arboreum</NavbarHeading>
      </Link>
      <NavbarDivider />
      {!props.session && (
        <AnchorButton href="/api/auth/signin" text="Login" minimal />
      )}
      {props.session && (
        <div>
          <AnchorButton href="/" text="Dashboard" minimal rightIcon="home" />
          <AnchorButton href="/profile" text="Profile" minimal />
        </div>
      )}
    </NavbarGroup>
  </Navbar>
)
