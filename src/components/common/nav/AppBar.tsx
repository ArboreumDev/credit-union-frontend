import Link from "next/link"

import React from "react"
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Center,
  HStack,
} from "@chakra-ui/core"
import { CgProfile } from "react-icons/cg"
import Router from "next/router"
import FeedbackPopover from "./FeedbackPopover"
import SupportPopover from "./SupportPopover"

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const AppBar = () => (
  <Flex
    // bg="gray.300"
    color="black"
    paddingLeft="1.5rem"
    paddingRight="1.5rem"
    paddingBottom="0.8rem"
    paddingTop="1rem"
    as="nav"
    marginBottom="20px"
    minH="40px"
    minW="s"
  >
    <Flex align="center">
      <Link href="/dashboard">
        <img width="150px" src="/images/logo.svg" alt="logo" />
      </Link>
    </Flex>
    <Box flex="1"></Box>
    <HStack>
      <FeedbackPopover />
      <SupportPopover />
    </HStack>

    <style jsx>
      {`
        button {
          background-color: Transparent;
          background-repeat: no-repeat;
          border: none;
          cursor: pointer;
          overflow: hidden;
          outline: none;
        }
      `}
    </style>
  </Flex>
)

export default AppBar
