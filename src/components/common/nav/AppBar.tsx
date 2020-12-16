import { Box, Button, Center, Flex, HStack, Text } from "@chakra-ui/core"
import Link from "next/link"
import React from "react"
import CompanyX from "./Companyx"
import DrawerButton from "./Drawer"
import { FeedbackPopover, SupportPopover } from "./FeedbackPopover"

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
    minH="40px"
    minW="s"
  >
    <Flex align="center">
      <HStack spacing={[5, 10, 20]}>
        <Link href="/dashboard">
          <img width="150px" src="/images/logo.svg" alt="logo" />
        </Link>
      </HStack>
    </Flex>
    <Box flex="1"></Box>
    <HStack display={["none", "none", "block"]} className="navButtons">
      <CompanyX />
      <FeedbackPopover />
      <SupportPopover />
    </HStack>
    <Box display={["block", "block", "none"]}>
      <DrawerButton />
    </Box>
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
