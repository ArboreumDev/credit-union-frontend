import Link from "next/link"
import { Session } from "../utils/types"

import React from "react"
import { Box, Heading, Flex, Text, Button, Center } from "@chakra-ui/core"

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const AppBar = (props: { session?: Session }) => (
  <Flex
    bg="gray.300"
    color="black"
    paddingLeft="1.5rem"
    paddingRight="1.5rem"
    paddingBottom="0.5rem"
    paddingTop="0.5rem"
    as="nav"
    margin="-10px"
  >
    <Flex align="center" mr={5}>
      <Box h="40px">
        <img width="150px" src="/images/logo.svg" alt="logo" />
      </Box>
    </Flex>
    <Box flex="1" textAlign="right">
      <Button colorScheme="teal" variant="ghost">
        Profile
      </Button>
    </Box>
  </Flex>
)

export default AppBar
