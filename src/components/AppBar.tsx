import React, { useState } from "react"

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
import { Session } from "../utils/types"

const AppBar = (props: { session?: Session }) => (
  <Navbar>
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

export default AppBar
